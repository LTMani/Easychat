# EasyChat CRM — API Versioning & Deprecation Policy

## 1. Versioning Principles

EasyChat adheres to **Semantic Versioning (SemVer 2.0.0)** across all public REST API endpoints and the `@easychat/sdk` TypeScript package:

$$\text{MAJOR}.\text{MINOR}.\text{PATCH}$$

- **MAJOR**: Incompatible breaking API changes, schema removals, or modified authentication flows.
- **MINOR**: Backward-compatible new endpoints, optional parameters, or added response fields.
- **PATCH**: Backward-compatible bug fixes, performance improvements, and security patches.

---

## 2. URL Path Versioning

All REST API endpoints include a major version prefix in the URL path:
```
https://api.easychat.io/v1/contacts
https://api.easychat.io/v1/deals
```

### What is Considered a Non-Breaking Change?
The following enhancements do **not** require a major version bump:
- Adding a new endpoint or resource
- Adding new optional query parameters or request body fields
- Adding new properties to an existing JSON response object
- Reordering JSON response keys
- Adding new webhook event types

### What is Considered a Breaking Change?
The following modifications **will** trigger a major version release (e.g., `/v2/`):
- Removing an existing endpoint or HTTP method
- Renaming or removing an existing request or response field
- Making an optional request parameter required
- Altering HTTP status codes returned for existing error scenarios
- Changing authentication token formats

---

## 3. Deprecation Timeline & Sunset Policy

1. **Deprecation Notice**: When a major version is superseded, an official deprecation notice is published 12 months in advance.
2. **Warning Headers**: Deprecated endpoints return the standard RFC 8594 headers:
   ```http
   Sunset: Wed, 25 Aug 2027 00:00:00 GMT
   Deprecation: @1756080000
   Link: <https://docs.easychat.io/migrations/v2>; rel="successor-version"
   ```
3. **Sunset Execution**: After the 12-month grace period, deprecated endpoints return `HTTP 410 Gone`.
