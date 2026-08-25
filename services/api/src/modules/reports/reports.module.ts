import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ReportBuilderService } from './report-builder.service';
import { ReportExporterService } from './report-exporter.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, ReportBuilderService, ReportExporterService],
  exports: [ReportsService, ReportBuilderService, ReportExporterService],
})
export class ReportsModule {}
