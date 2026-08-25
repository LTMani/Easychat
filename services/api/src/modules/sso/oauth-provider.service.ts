import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface OAuthApp {
  id: string;
  name: string;
  clientId: string;
  redirectUris: string[];
  scopes: string[];
  organizationId: string;
}

export interface OAuthToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  scopes: string[];
  userId: string;
  clientId: string;
}

@Injectable()
export class OAuthProviderService {
  private readonly logger = new Logger(OAuthProviderService.name);

  generateAuthorizationCode(): string {
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    return Buffer.from(bytes).toString('hex');
  }

  generateAccessToken(): string {
    const bytes = new Uint8Array(48);
    crypto.getRandomValues(bytes);
    return `ech_at_${Buffer.from(bytes).toString('base64url')}`;
  }

  generateRefreshToken(): string {
    const bytes = new Uint8Array(48);
    crypto.getRandomValues(bytes);
    return `ech_rt_${Buffer.from(bytes).toString('base64url')}`;
  }

  async registerOAuthApp(organizationId: string, name: string, redirectUris: string[], scopes: string[]): Promise<{ clientId: string; clientSecret: string }> {
    this.logger.log(`Registering OAuth app '${name}' for org ${organizationId}`);

    const clientId = `ech_client_${this.generateAuthorizationCode().slice(0, 16)}`;
    const clientSecret = `ech_secret_${this.generateAuthorizationCode()}`;

    const secretHash = await this.hashSecret(clientSecret);

    await prisma.oauthApp.create({
      data: {
        organizationId,
        name,
        clientId,
        clientSecretHash: secretHash,
        redirectUris: JSON.stringify(redirectUris),
        scopes: JSON.stringify(scopes),
      },
    });

    return { clientId, clientSecret };
  }

  async validateRedirectUri(clientId: string, redirectUri: string): Promise<boolean> {
    const app = await prisma.oauthApp.findFirst({ where: { clientId } });
    if (!app) return false;
    const allowed: string[] = JSON.parse(app.redirectUris as string);
    return allowed.includes(redirectUri);
  }

  async listOAuthApps(organizationId: string): Promise<Array<{ id: string; name: string; clientId: string; scopes: string[] }>> {
    const apps = await prisma.oauthApp.findMany({ where: { organizationId }, orderBy: { createdAt: 'desc' } });
    return apps.map((app) => ({
      id: app.id,
      name: app.name,
      clientId: app.clientId,
      scopes: JSON.parse(app.scopes as string),
    }));
  }

  private async hashSecret(secret: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(secret);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Buffer.from(hash).toString('hex');
  }
}
