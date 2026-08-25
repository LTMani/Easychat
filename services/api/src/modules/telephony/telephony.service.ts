import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { prisma } from '@easychat/database';

@Injectable()
export class TelephonyService {
  private readonly logger = new Logger(TelephonyService.name);

  async listTrunks(organizationId: string) {
    return prisma.telephonyTrunk.findMany({
      where: {
        channelConfig: { organizationId },
      },
      include: { channelConfig: true },
    });
  }

  async createTrunk(
    organizationId: string,
    channelConfigId: string,
    sipDomain: string,
    username: string,
    inboundNumber: string
  ) {
    return prisma.telephonyTrunk.create({
      data: {
        channelConfigId,
        sipDomain,
        username,
        authPassword: `sip_pass_${Math.random().toString(36).substring(2, 10)}`,
        inboundNumber,
      },
    });
  }

  async recordCallSession(
    trunkId: string,
    callerNumber: string,
    calleeNumber: string,
    direction: 'INBOUND' | 'OUTBOUND',
    durationSeconds: number,
    recordingUrl?: string
  ) {
    this.logger.log(`Recording call session for Trunk ${trunkId} from ${callerNumber} to ${calleeNumber}`);
    return prisma.voiceCallSession.create({
      data: {
        trunkId,
        callerNumber,
        calleeNumber,
        direction,
        durationSeconds,
        recordingUrl: recordingUrl || null,
        status: 'COMPLETED',
        endedAt: new Date(),
      },
    });
  }

  async listCallLogs(organizationId: string) {
    return prisma.voiceCallSession.findMany({
      where: {
        trunk: {
          channelConfig: { organizationId },
        },
      },
      include: {
        trunk: {
          include: { channelConfig: true },
        },
      },
      orderBy: { startedAt: 'desc' },
      take: 50,
    });
  }
}
