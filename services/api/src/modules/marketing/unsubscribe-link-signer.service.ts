import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class UnsubscribeLinkSignerService {
  private readonly logger = new Logger(UnsubscribeLinkSignerService.name);
  private readonly SECRET = 'ech_unsub_secret_key_prod_99482';

  generateSignedLink(email: string, campaignId: string, baseUrl: string = 'https://app.easychat.io'): string {
    const payload = `${email}:${campaignId}`;
    const signature = crypto.createHmac('sha256', this.SECRET).update(payload).digest('hex');

    const encodedEmail = encodeURIComponent(email);
    const encodedCamp = encodeURIComponent(campaignId);

    return `${baseUrl}/unsubscribe?email=${encodedEmail}&campaign=${encodedCamp}&sig=${signature}`;
  }

  verifySignature(email: string, campaignId: string, providedSignature: string): boolean {
    const payload = `${email}:${campaignId}`;
    const expected = crypto.createHmac('sha256', this.SECRET).update(payload).digest('hex');
    return expected === providedSignature;
  }
}
