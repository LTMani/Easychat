import { Injectable, Logger } from '@nestjs/common';

export interface ChannelDescriptor {
  type: 'EMAIL' | 'WHATSAPP' | 'LIVE_CHAT' | 'SMS' | 'INSTAGRAM' | 'VOICE';
  name: string;
  isRealtime: boolean;
  supportedMedia: Array<'TEXT' | 'IMAGE' | 'AUDIO' | 'PDF' | 'LOCATION'>;
  maxPayloadBytes: number;
}

@Injectable()
export class OmnichannelChannelManagerService {
  private readonly logger = new Logger(OmnichannelChannelManagerService.name);

  readonly CHANNELS: Record<string, ChannelDescriptor> = {
    EMAIL: {
      type: 'EMAIL',
      name: 'Email (SMTP/IMAP)',
      isRealtime: false,
      supportedMedia: ['TEXT', 'IMAGE', 'PDF'],
      maxPayloadBytes: 25 * 1024 * 1024, // 25 MB
    },
    WHATSAPP: {
      type: 'WHATSAPP',
      name: 'WhatsApp Cloud API',
      isRealtime: true,
      supportedMedia: ['TEXT', 'IMAGE', 'AUDIO', 'PDF', 'LOCATION'],
      maxPayloadBytes: 16 * 1024 * 1024, // 16 MB
    },
    LIVE_CHAT: {
      type: 'LIVE_CHAT',
      name: 'Real-time Web Widget',
      isRealtime: true,
      supportedMedia: ['TEXT', 'IMAGE', 'PDF'],
      maxPayloadBytes: 10 * 1024 * 1024, // 10 MB
    },
    SMS: {
      type: 'SMS',
      name: 'Twilio SMS Gateway',
      isRealtime: false,
      supportedMedia: ['TEXT'],
      maxPayloadBytes: 1600, // 1600 chars (10 segments)
    },
    VOICE: {
      type: 'VOICE',
      name: 'Twilio Programmable Voice & IVR',
      isRealtime: true,
      supportedMedia: ['AUDIO'],
      maxPayloadBytes: 50 * 1024 * 1024,
    },
  };

  validateOutboundPayload(channel: string, mediaType: string, byteSize: number): { isAllowed: boolean; error?: string } {
    const config = this.CHANNELS[channel.toUpperCase()];
    if (!config) {
      return { isAllowed: false, error: `Unsupported communication channel: ${channel}` };
    }

    if (!config.supportedMedia.includes(mediaType.toUpperCase() as any)) {
      return { isAllowed: false, error: `Channel ${config.name} does not support media type ${mediaType}` };
    }

    if (byteSize > config.maxPayloadBytes) {
      return { isAllowed: false, error: `Payload size (${(byteSize / 1024).toFixed(0)}KB) exceeds maximum limit of ${(config.maxPayloadBytes / 1024).toFixed(0)}KB for ${config.name}` };
    }

    return { isAllowed: true };
  }

  getChannelCapabilities(channel: string): ChannelDescriptor | null {
    return this.CHANNELS[channel.toUpperCase()] || null;
  }
}
