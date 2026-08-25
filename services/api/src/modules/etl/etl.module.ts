import { Module } from '@nestjs/common';
import { EtlController } from './etl.controller';
import { EtlImporterService } from './etl-importer.service';

@Module({
  controllers: [EtlController],
  providers: [EtlImporterService],
  exports: [EtlImporterService],
})
export class EtlModule {}
