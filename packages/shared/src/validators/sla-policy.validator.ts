import { z } from 'zod';

export const PriorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']);

export const CreateSlaPolicySchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  priority: PriorityEnum.default('MEDIUM'),
  firstResponseMinutes: z.number().int().min(1).max(10080), // up to 7 days
  nextResponseMinutes: z.number().int().min(1).max(10080).default(120),
  resolutionMinutes: z.number().int().min(1).max(43200), // up to 30 days
  isDefault: z.boolean().default(false),
  businessHoursOnly: z.boolean().default(false),
  holidaysCalendar: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
});

export type CreateSlaPolicyInput = z.infer<typeof CreateSlaPolicySchema>;

export const UpdateSlaPolicySchema = CreateSlaPolicySchema.partial();
export type UpdateSlaPolicyInput = z.infer<typeof UpdateSlaPolicySchema>;
