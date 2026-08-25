import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { GenerateAiSummaryDto, UserSessionPayload } from '@easychat/shared';

@ApiTags('AI Layer')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('summaries')
  @ApiOperation({ summary: 'Generate AI conversation summary & next action' })
  async generateSummary(@CurrentUser() user: UserSessionPayload, @Body() dto: GenerateAiSummaryDto) {
    return this.aiService.generateSummary(user.organizationId, dto);
  }

  @Get('suggestions')
  @ApiOperation({ summary: 'Get AI recommendations & sentiment insights' })
  async getSuggestions(@CurrentUser() user: UserSessionPayload) {
    return this.aiService.getSuggestions(user.organizationId);
  }
}
