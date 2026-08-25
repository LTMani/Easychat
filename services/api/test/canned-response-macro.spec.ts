import { Test, TestingModule } from '@nestjs/testing';
import { CannedResponseMacroService } from '../src/modules/support/canned-response-macro.service';

describe('CannedResponseMacroService', () => {
  let service: CannedResponseMacroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CannedResponseMacroService],
    }).compile();
    service = module.get<CannedResponseMacroService>(CannedResponseMacroService);
  });

  it('should interpolate dynamic customer and ticket variables into macro text', () => {
    const template = 'Hi {{customerName}}, your ticket #{{ticketNumber}} has been resolved.';
    const res = service.interpolateTemplate(template, {
      customerName: 'Jonathan Vance',
      ticketNumber: 'TKT-2026-1001',
    });

    expect(res).toBe('Hi Jonathan Vance, your ticket #TKT-2026-1001 has been resolved.');
  });
});
