import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SearchIndexerService } from './search-indexer.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { UserSessionPayload } from '@easychat/shared';

@ApiTags('Full-Text Search Engine')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchIndexerService) {}

  @Get()
  @ApiOperation({ summary: 'Global multi-entity full-text search across contacts, deals, tickets, and articles' })
  async search(@CurrentUser() user: UserSessionPayload, @Query('q') query: string) {
    return this.searchService.searchAll(user.organizationId, query);
  }
}
