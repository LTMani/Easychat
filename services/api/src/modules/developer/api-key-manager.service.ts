import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';
import * as crypto from 'crypto';

export interface ApiKeyCredential {
  id: string;
  prefix: string;
  name: string;
  permissions: string;
  createdAt: Date;
}

@Injectable()
export class ApiKeyManagerService {
  private readonly logger = new Logger(ApiKeyManagerService.name);

  generateApiKey(pfx: string = 'ech'): { rawKey: string; hashedKey: string; prefix: string } {
    const rawToken = crypto.randomBytes(32).toString('hex');
    const rawKey = `${pfx}_${rawToken}`;
    const hashedKey = crypto.createHash('sha256').update(rawKey).digest('hex');
    const prefix = rawKey.slice(0, 12);
    return { rawKey, hashedKey, prefix };
  }

  async createApiKey(organizationId: string, createdById: string, name: string, permissions: string = '[]'): Promise<{ credential: ApiKeyCredential; rawKey: string }> {
    this.logger.log(`Creating API Key '${name}' for org ${organizationId}`);
    const { rawKey, hashedKey, prefix } = this.generateApiKey();

    const apiKey = await prisma.apiKey.create({
      data: { organizationId, createdById, name, keyHash: hashedKey, prefix, permissions },
    });

    return {
      credential: { id: apiKey.id, prefix: apiKey.prefix, name: apiKey.name, permissions: apiKey.permissions, createdAt: apiKey.createdAt },
      rawKey,
    };
  }

  async validateApiKey(rawKey: string): Promise<{ valid: boolean; organizationId?: string }> {
    const hashedKey = crypto.createHash('sha256').update(rawKey).digest('hex');
    const apiKey = await prisma.apiKey.findFirst({ where: { keyHash: hashedKey } });
    if (!apiKey) return { valid: false };
    await prisma.apiKey.update({ where: { id: apiKey.id }, data: { lastUsedAt: new Date() } });
    return { valid: true, organizationId: apiKey.organizationId };
  }

  async revokeApiKey(organizationId: string, keyId: string): Promise<void> {
    this.logger.log(`Revoking API Key ${keyId} for org ${organizationId}`);
    await prisma.apiKey.delete({ where: { id: keyId } });
  }

  async listApiKeys(organizationId: string): Promise<ApiKeyCredential[]> {
    const keys = await prisma.apiKey.findMany({ where: { organizationId }, orderBy: { createdAt: 'desc' } });
    return keys.map((k) => ({ id: k.id, prefix: k.prefix, name: k.name, permissions: k.permissions, createdAt: k.createdAt }));
  }
}
