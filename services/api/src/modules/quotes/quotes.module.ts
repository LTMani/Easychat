import { Module } from '@nestjs/common';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { CpqEngineService } from './cpq-engine.service';
import { QuoteSigningService } from './quote-signing.service';

@Module({
  controllers: [QuotesController],
  providers: [QuotesService, CpqEngineService, QuoteSigningService],
  exports: [QuotesService, CpqEngineService, QuoteSigningService],
})
export class QuotesModule {}
