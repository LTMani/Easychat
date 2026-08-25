import { Module } from '@nestjs/common';
import { SearchIndexerService } from './search-indexer.service';
import { SearchController } from './search.controller';

@Module({
  controllers: [SearchController],
  providers: [SearchIndexerService],
  exports: [SearchIndexerService],
})
export class SearchModule {}
