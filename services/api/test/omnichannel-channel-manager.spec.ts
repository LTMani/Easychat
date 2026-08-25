import { Test, TestingModule } from '@nestjs/testing';
import { OmnichannelChannelManagerService } from '../src/modules/omnichannel/omnichannel-channel-manager.service';

describe('OmnichannelChannelManagerService', () => {
  let service: OmnichannelChannelManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OmnichannelChannelManagerService],
    }).compile();
    service = module.get<OmnichannelChannelManagerService>(OmnichannelChannelManagerService);
  });

  it('should validate outbound payload within size limits', () => {
    const res = service.validateOutboundPayload('WHATSAPP', 'IMAGE', 2 * 1024 * 1024); // 2 MB
    expect(res.isAllowed).toBe(true);
  });

  it('should reject payload exceeding channel byte size limit', () => {
    const res = service.validateOutboundPayload('SMS', 'TEXT', 5000); // Exceeds 1600 bytes
    expect(res.isAllowed).toBe(false);
    expect(res.error).toContain('exceeds maximum limit');
  });

  it('should reject unsupported media format for channel', () => {
    const res = service.validateOutboundPayload('SMS', 'PDF', 500);
    expect(res.isAllowed).toBe(false);
    expect(res.error).toContain('does not support media type');
  });
});
