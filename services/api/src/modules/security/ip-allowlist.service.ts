import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface IpAllowlistEntry {
  id: string;
  ipRange: string;
  description: string;
  isActive: boolean;
  organizationId: string;
  createdAt: Date;
}

export interface AccessVerificationResult {
  allowed: boolean;
  matchedRule?: string;
  reason: string;
}

@Injectable()
export class IpAllowlistService {
  private readonly logger = new Logger(IpAllowlistService.name);

  private ipToInt(ip: string): number {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
  }

  private isIpInCidr(ip: string, cidr: string): boolean {
    if (!cidr.includes('/')) return ip === cidr;
    const [network, bitsStr] = cidr.split('/');
    const bits = parseInt(bitsStr, 10);
    const mask = ~((1 << (32 - bits)) - 1) >>> 0;
    const ipInt = this.ipToInt(ip);
    const networkInt = this.ipToInt(network);
    return (ipInt & mask) === (networkInt & mask);
  }

  async verifyIpAccess(organizationId: string, ipAddress: string): Promise<AccessVerificationResult> {
    this.logger.log(`Verifying IP access for ${ipAddress} in org ${organizationId}`);

    const allowlist = await prisma.ipAllowlist.findMany({
      where: { organizationId, isEnabled: true },
    });

    if (allowlist.length === 0) {
      return { allowed: true, reason: 'No IP allowlist configured — all IPs permitted.' };
    }

    for (const entry of allowlist) {
      if (this.isIpInCidr(ipAddress, entry.cidr)) {
        return { allowed: true, matchedRule: entry.cidr, reason: `IP ${ipAddress} matched allowlist rule: ${entry.cidr}` };
      }
    }

    this.logger.warn(`IP ${ipAddress} blocked for org ${organizationId} — not in allowlist.`);
    return { allowed: false, reason: `IP ${ipAddress} is not in the organization's IP allowlist.` };
  }

  async addIpAllowlistEntry(organizationId: string, cidr: string, label: string): Promise<void> {
    this.logger.log(`Adding IP allowlist entry ${cidr} for org ${organizationId}`);
    await prisma.ipAllowlist.create({
      data: { organizationId, cidr, label, isEnabled: true },
    });
  }

  async removeIpAllowlistEntry(organizationId: string, entryId: string): Promise<void> {
    this.logger.log(`Removing IP allowlist entry ${entryId} from org ${organizationId}`);
    const entry = await prisma.ipAllowlist.findFirst({ where: { id: entryId, organizationId } });
    if (!entry) throw new NotFoundException(`IP Allowlist entry ${entryId} not found.`);
    await prisma.ipAllowlist.delete({ where: { id: entryId } });
  }

  async listAllowlistEntries(organizationId: string): Promise<Array<{ id: string; cidr: string; label: string; isEnabled: boolean }>> {
    const entries = await prisma.ipAllowlist.findMany({ where: { organizationId }, orderBy: { createdAt: 'desc' } });
    return entries.map((e) => ({ id: e.id, cidr: e.cidr, label: e.label, isEnabled: e.isEnabled }));
  }
}
