import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { prisma } from '@easychat/database';

export type CustomFieldType = 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'DATE' | 'SELECT' | 'MULTI_SELECT' | 'URL' | 'EMAIL' | 'JSON';
export type CustomFieldTarget = 'CONTACT' | 'DEAL' | 'TICKET' | 'LEAD' | 'PRODUCT';

export interface CustomFieldDefinition {
  id: string;
  organizationId: string;
  name: string;
  key: string;
  type: CustomFieldType;
  target: CustomFieldTarget;
  isRequired: boolean;
  defaultValue?: unknown;
  options?: string[];
  description?: string;
  validationRegex?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomFieldValueValidationResult {
  isValid: boolean;
  normalizedValue?: unknown;
  errors: string[];
}

@Injectable()
export class CustomFieldDefinitionService {
  private readonly logger = new Logger(CustomFieldDefinitionService.name);

  validateFieldValue(definition: CustomFieldDefinition, value: unknown): CustomFieldValueValidationResult {
    const errors: string[] = [];

    if (value === undefined || value === null || value === '') {
      if (definition.isRequired) {
        return { isValid: false, errors: [`Field '${definition.name}' (${definition.key}) is required.`] };
      }
      return { isValid: true, normalizedValue: definition.defaultValue ?? null, errors: [] };
    }

    let normalizedValue = value;

    switch (definition.type) {
      case 'TEXT':
        if (typeof value !== 'string') normalizedValue = String(value);
        if (definition.validationRegex) {
          const regex = new RegExp(definition.validationRegex);
          if (!regex.test(String(normalizedValue))) {
            errors.push(`Value '${normalizedValue}' does not match pattern ${definition.validationRegex}`);
          }
        }
        break;

      case 'NUMBER': {
        const num = Number(value);
        if (isNaN(num)) {
          errors.push(`Field '${definition.name}' must be a valid number.`);
        } else {
          normalizedValue = num;
        }
        break;
      }

      case 'BOOLEAN':
        if (typeof value === 'boolean') {
          normalizedValue = value;
        } else if (value === 'true' || value === '1' || value === 1) {
          normalizedValue = true;
        } else if (value === 'false' || value === '0' || value === 0) {
          normalizedValue = false;
        } else {
          errors.push(`Field '${definition.name}' must be a boolean.`);
        }
        break;

      case 'DATE': {
        const d = new Date(value as string);
        if (isNaN(d.getTime())) {
          errors.push(`Field '${definition.name}' must be a valid ISO date.`);
        } else {
          normalizedValue = d.toISOString();
        }
        break;
      }

      case 'SELECT':
        if (definition.options && definition.options.length > 0) {
          if (!definition.options.includes(String(value))) {
            errors.push(`Value '${value}' is not one of the allowed options: ${definition.options.join(', ')}`);
          }
        }
        normalizedValue = String(value);
        break;

      case 'MULTI_SELECT':
        if (!Array.isArray(value)) {
          errors.push(`Field '${definition.name}' must be an array of values.`);
        } else if (definition.options && definition.options.length > 0) {
          const invalid = value.filter((v) => !definition.options?.includes(String(v)));
          if (invalid.length > 0) {
            errors.push(`Values [${invalid.join(', ')}] are not in allowed options: ${definition.options.join(', ')}`);
          }
        }
        break;

      case 'EMAIL':
        if (typeof value !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.push(`Field '${definition.name}' must be a valid email.`);
        }
        break;

      case 'URL':
        if (typeof value !== 'string' || !/^https?:\/\/.+/.test(value)) {
          errors.push(`Field '${definition.name}' must be a valid HTTP(S) URL.`);
        }
        break;

      case 'JSON':
        if (typeof value === 'string') {
          try {
            normalizedValue = JSON.parse(value);
          } catch {
            errors.push(`Field '${definition.name}' must be a valid JSON payload.`);
          }
        }
        break;
    }

    return {
      isValid: errors.length === 0,
      normalizedValue: errors.length === 0 ? normalizedValue : undefined,
      errors,
    };
  }

  validateCustomFieldValuesMap(
    definitions: CustomFieldDefinition[],
    valuesMap: Record<string, unknown>,
  ): { isValid: boolean; normalizedPayload: Record<string, unknown>; errors: Record<string, string[]> } {
    const errors: Record<string, string[]> = {};
    const normalizedPayload: Record<string, unknown> = {};

    for (const def of definitions) {
      const val = valuesMap[def.key];
      const result = this.validateFieldValue(def, val);

      if (!result.isValid) {
        errors[def.key] = result.errors;
      } else {
        normalizedPayload[def.key] = result.normalizedValue;
      }
    }

    // Check for any unmapped custom field keys provided
    const defKeys = new Set(definitions.map((d) => d.key));
    for (const key of Object.keys(valuesMap)) {
      if (!defKeys.has(key)) {
        normalizedPayload[key] = valuesMap[key];
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      normalizedPayload,
      errors,
    };
  }

  formatFieldForDisplay(definition: CustomFieldDefinition, value: unknown): string {
    if (value === null || value === undefined) return '—';
    switch (definition.type) {
      case 'BOOLEAN':
        return value ? 'Yes' : 'No';
      case 'DATE':
        return new Date(value as string).toLocaleDateString();
      case 'MULTI_SELECT':
        return Array.isArray(value) ? value.join(', ') : String(value);
      case 'JSON':
        return JSON.stringify(value);
      default:
        return String(value);
    }
  }
}
