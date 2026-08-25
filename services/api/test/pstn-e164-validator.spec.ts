import { Test, TestingModule } from '@nestjs/testing';
import { PstnE164ValidatorService } from '../src/modules/telephony/pstn-e164-validator.service';

describe('PstnE164ValidatorService', () => {
  let service: PstnE164ValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PstnE164ValidatorService],
    }).compile();
    service = module.get<PstnE164ValidatorService>(PstnE164ValidatorService);
  });

  it('should normalize standard US numbers to E.164 format', () => {
    const res = service.validateAndNormalizeE164('(415) 555-0192');
    expect(res.isValid).toBe(true);
    expect(res.e164Formatted).toBe('+14155550192');
    expect(res.countryIso2).toBe('US');
  });

  it('should identify toll-free carrier numbers', () => {
    const res = service.validateAndNormalizeE164('+1-800-555-0199');
    expect(res.isValid).toBe(true);
    expect(res.carrierType).toBe('TOLL_FREE');
  });
});
