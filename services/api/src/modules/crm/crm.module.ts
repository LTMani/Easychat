import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';
import { PipelineVelocityService } from './pipeline-velocity.service';

@Module({
  controllers: [ContactsController, LeadsController, DealsController],
  providers: [ContactsService, LeadsService, DealsService, PipelineVelocityService],
  exports: [ContactsService, LeadsService, DealsService, PipelineVelocityService],
})
export class CrmModule {}
