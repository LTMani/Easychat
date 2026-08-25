import { Test, TestingModule } from '@nestjs/testing';
import { SipTrunkManagerService } from '../src/modules/telephony/sip-trunk-manager.service';

describe('SipTrunkManagerService', () => {
  let service: SipTrunkManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SipTrunkManagerService],
    }).compile();
    service = module.get<SipTrunkManagerService>(SipTrunkManagerService);
  });

  it('should list configured SIP carrier trunks', () => {
    const trunks = service.listTrunks();
    expect(trunks.length).toBeGreaterThanOrEqual(2);
    expect(trunks[0].status).toBe('ONLINE');
    expect(trunks[0].supportedCodecs).toContain('OPUS');
  });

  it('should register a new SIP trunk gateway', () => {
    const created = service.registerTrunk({
      trunkName: 'Asia Pacific Singapore Trunk',
      sipDomain: 'sip.ap-south.easychat.io',
      primaryProxy: 'sip.sg.carrier.com:5060',
      failoverProxy: 'sip2.sg.carrier.com:5060',
      supportedCodecs: ['G711_ALAW'],
      maxConcurrentChannels: 100,
    });

    expect(created.trunkId).toContain('trunk_');
    expect(service.getTrunk(created.trunkId)).toBeDefined();
  });
});
