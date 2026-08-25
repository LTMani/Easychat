import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { User } from '../../common/decorators/user.decorator';
import { Permission, SubmitCsatDto } from '@easychat/shared';
import { CsatService } from './csat.service';

@Controller('v1/csat')
export class CsatController {
  constructor(private readonly csatService: CsatService) {}

  @Get('surveys')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @RequirePermissions(Permission.TICKET_READ)
  async getSurveys(@User('organizationId') orgId: string) {
    return this.csatService.getSurveys(orgId);
  }

  @Post('surveys')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @RequirePermissions(Permission.TICKET_UPDATE)
  async createSurvey(
    @User('organizationId') orgId: string,
    @Body() body: { title: string; question: string }
  ) {
    return this.csatService.createSurvey(orgId, body.title, body.question);
  }

  @Post('submit')
  async submitResponse(@Body() dto: SubmitCsatDto) {
    return this.csatService.submitResponse(dto);
  }

  @Get('metrics')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @RequirePermissions(Permission.TICKET_READ)
  async getSurveyMetrics(@User('organizationId') orgId: string) {
    return this.csatService.getSurveyMetrics(orgId);
  }
}
