import { Module } from '@nestjs/common';
import { Customer360Controller } from './customer360.controller';
import { Customer360Service } from './customer360.service';
import { CustomerTimelineService } from './customer-timeline.service';

@Module({
  controllers: [Customer360Controller],
  providers: [Customer360Service, CustomerTimelineService],
  exports: [Customer360Service, CustomerTimelineService],
})
export class Customer360Module {}
