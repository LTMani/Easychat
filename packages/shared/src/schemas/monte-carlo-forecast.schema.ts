import { z } from 'zod';

export const MonteCarloForecastResultSchema = z.object({
  fiscalQuarter: z.string(),
  totalPipelineValueUsd: z.number().min(0),
  weightedPipelineValueUsd: z.number().min(0),
  p10ConservativeProjectionUsd: z.number().min(0),
  p50ExpectedProjectionUsd: z.number().min(0),
  p90OptimisticProjectionUsd: z.number().min(0),
  dealsCount: z.number().int().min(0),
});

export type MonteCarloForecastResultDto = z.infer<typeof MonteCarloForecastResultSchema>;
