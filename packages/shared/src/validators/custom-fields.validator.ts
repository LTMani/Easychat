import { z } from 'zod';

export const CustomFieldTypeEnum = z.enum([
  'TEXT',
  'NUMBER',
  'BOOLEAN',
  'DATE',
  'SELECT',
  'MULTI_SELECT',
  'URL',
  'EMAIL',
  'JSON',
]);

export const CustomFieldTargetEnum = z.enum([
  'CONTACT',
  'DEAL',
  'TICKET',
  'LEAD',
  'PRODUCT',
  'COMPANY',
]);

export const CreateCustomFieldSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  key: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-z0-9_]+$/, 'Key must contain only lowercase letters, numbers, and underscores'),
  type: CustomFieldTypeEnum,
  target: CustomFieldTargetEnum,
  isRequired: z.boolean().default(false),
  defaultValue: z.any().optional(),
  options: z.array(z.string().min(1)).optional(),
  description: z.string().max(500).optional(),
  validationRegex: z.string().optional(),
});

export type CreateCustomFieldInput = z.infer<typeof CreateCustomFieldSchema>;

export const UpdateCustomFieldSchema = CreateCustomFieldSchema.partial();
export type UpdateCustomFieldInput = z.infer<typeof UpdateCustomFieldSchema>;
