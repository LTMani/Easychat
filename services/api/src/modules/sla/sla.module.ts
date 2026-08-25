import { Module } from '@nestjs/common';
import { SlaController } from './sla.controller';
import { SlaPolicyService } from './sla-policy.service';
import { SlaEvaluatorService } from './sla-evaluator.service';

@Module({
  controllers: [SlaController],
  providers: [SlaPolicyService, SlaEvaluatorService],
  exports: [SlaPolicyService, SlaEvaluatorService],
})
export class SlaModule {}
