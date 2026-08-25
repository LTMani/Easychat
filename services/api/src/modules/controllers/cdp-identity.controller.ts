import { Controller, Post, Get, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { IdentityResolutionService, DeviceFingerprint, KnownIdentifier } from '../cdp/identity-resolution.service';
import { CustomerJourneyEventStreamService, CustomerJourneyEvent } from '../cdp/customer-journey-event-stream.service';
import { PredictiveRfmScoringService } from '../cdp/predictive-rfm-scoring.service';

@Controller('v1/cdp')
export class CdpIdentityController {
  constructor(
    private readonly identityService: IdentityResolutionService,
    private readonly journeyService: CustomerJourneyEventStreamService,
    private readonly rfmService: PredictiveRfmScoringService,
  ) {}

  @Post('identity/stitch')
  async stitchIdentity(
    @Body()
    body: {
      fingerprint: DeviceFingerprint;
      known?: KnownIdentifier;
    },
  ) {
    if (!body.fingerprint || !body.fingerprint.anonymousId) {
      throw new BadRequestException('fingerprint.anonymousId is required');
    }

    const resolved = this.identityService.stitchVisitorIdentity(body.fingerprint, body.known);
    return {
      status: 'success',
      data: resolved,
    };
  }

  @Post('events/track')
  async trackJourneyEvent(@Body() body: CustomerJourneyEvent) {
    if (!body.profileId || !body.eventType) {
      throw new BadRequestException('profileId and eventType are required');
    }

    const result = this.journeyService.ingestEvent(body);
    return {
      status: 'success',
      data: result,
    };
  }

  @Get('funnel')
  async getFunnelMetrics() {
    const metrics = this.journeyService.calculateFunnelMetrics();
    return {
      status: 'success',
      data: metrics,
    };
  }

  @Post('rfm/score')
  async scoreContactRfm(
    @Body()
    body: {
      contactId: string;
      daysSinceLastOrder: number;
      orderCount: number;
      totalSpend: number;
    },
  ) {
    const score = this.rfmService.calculateRfmScore(
      body.contactId || 'c_default',
      body.daysSinceLastOrder || 10,
      body.orderCount || 5,
      body.totalSpend || 4500,
    );

    return {
      status: 'success',
      data: score,
    };
  }
}
