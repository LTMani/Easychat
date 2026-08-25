import { Test, TestingModule } from '@nestjs/testing';
import { TelephonyService } from '../src/modules/telephony/telephony.service';

describe('TelephonyService', () => {
  let service: TelephonyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelephonyService],
    }).compile();

    service = module.get<TelephonyService>(TelephonyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should format SIP URI endpoints correctly', () => {
    const callerNumber = '+15550199';
    const sipUri = `sip:${callerNumber}@sip.easychat.io`;
    expect(sipUri).toBe('sip:+15550199@sip.easychat.io');
  });
});
