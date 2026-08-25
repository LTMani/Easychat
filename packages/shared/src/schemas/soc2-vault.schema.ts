import { z } from 'zod';

export const Soc2ControlVerificationResultSchema = z.object({
  controlId: z.string(),
  tscDomain: z.enum(['CC6_LOGICAL_ACCESS', 'CC7_SYSTEM_OPERATIONS', 'CC8_CHANGE_MANAGEMENT', 'A1_AVAILABILITY', 'C1_CONFIDENTIALITY']),
  controlName: z.string(),
  automatedCheckProcedure: z.string(),
  isPassing: z.boolean(),
  evidenceTelemetrySnapshot: z.record(z.any()),
  evaluatedAtIso: z.string(),
  signatureSha256: z.string(),
});

export type Soc2ControlVerificationResultDto = z.infer<typeof Soc2ControlVerificationResultSchema>;
