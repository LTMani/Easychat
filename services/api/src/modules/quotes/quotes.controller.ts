import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { User } from '../../common/decorators/user.decorator';
import { Permission, CreateQuoteDto } from '@easychat/shared';
import { QuotesService } from './quotes.service';
import { QuoteSigningService, SignQuoteDto } from './quote-signing.service';

@Controller('v1/quotes')
export class QuotesController {
  constructor(
    private readonly quotesService: QuotesService,
    private readonly signingService: QuoteSigningService
  ) {}

  @Get('deal/:dealId')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @RequirePermissions(Permission.DEAL_READ)
  async listQuotesForDeal(@Param('dealId') dealId: string) {
    return this.quotesService.listQuotesForDeal(dealId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RbacGuard)
  @RequirePermissions(Permission.DEAL_CREATE)
  async createQuote(
    @User('id') userId: string,
    @Body() dto: CreateQuoteDto
  ) {
    return this.quotesService.createQuote(userId, dto);
  }

  @Get('public/:id')
  async getPublicQuote(@Param('id') id: string) {
    return this.signingService.getPublicQuote(id);
  }

  @Post('public/:id/sign')
  async signPublicQuote(
    @Param('id') id: string,
    @Body() dto: SignQuoteDto
  ) {
    return this.signingService.signQuote(id, dto);
  }
}
