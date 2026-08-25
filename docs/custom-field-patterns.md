# EasyChat CRM — Custom Fields Schema & Extensibility Patterns

## 1. Architectural Patterns for Dynamic Custom Fields

Enterprise CRM systems require supporting arbitrary custom data points per customer without running destructive database schema migrations on every field creation.

EasyChat implements a hybrid relational-JSONB schema pattern:

### 1.1 Field Definition Registry
Metadata describing custom fields (name, type, options, validation regex, default values) is stored in the `CustomFieldDefinition` table.

```typescript
export type CustomFieldType =
  | 'TEXT'
  | 'NUMBER'
  | 'BOOLEAN'
  | 'DATE'
  | 'SELECT'
  | 'MULTI_SELECT'
  | 'URL'
  | 'EMAIL'
  | 'JSON';
```

### 1.2 Entity Payload Storage
Entity records (`Contact`, `Deal`, `Ticket`, `Lead`) store custom field values in a high-performance PostgreSQL `JSONB` column named `customFields`:

```json
{
  "vat_number": "DE994820194",
  "contract_discount_percent": 15.5,
  "renewal_date": "2027-09-01T00:00:00Z",
  "is_security_audit_required": true
}
```

---

## 2. Validation & Normalization Pipeline

When an API client or user submits custom field values:
1. **Schema Lookup**: Fetch active field definitions for the target entity and organization.
2. **Type Coercion**: Convert string booleans (`"true"`, `"1"`) to native booleans, ISO date strings to UTC dates, and numeric strings to floats.
3. **Constraint Enforcement**:
   - `SELECT` and `MULTI_SELECT`: Verifies value exists in allowed options enum.
   - `Regex Validation`: Tests text against custom pattern (e.g. `^DE[0-9]{9}$` for German VAT numbers).
   - `Required Fields`: Ensures non-null values for mandatory attributes.
4. **Sanitized Persistence**: Persists the normalized key-value dictionary to the JSONB column.
