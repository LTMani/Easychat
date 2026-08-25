import { Test, TestingModule } from '@nestjs/testing';
import { AutoResponderSmartMacroService } from '../src/modules/support/auto-responder-smart-macro.service';

describe('AutoResponderSmartMacroService', () => {
  let service: AutoResponderSmartMacroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutoResponderSmartMacroService],
    }).compile();
    service = module.get<AutoResponderSmartMacroService>(AutoResponderSmartMacroService);
  });

  it('should suggest pricing macro when customer asks about plans or cost', () => {
    const suggestion = service.suggestMacro('Can you tell me how much your plans cost?');
    expect(suggestion).toBeDefined();
    expect(suggestion?.macroId).toBe('macro_pricing_info');
    expect(suggestion?.suggestedResponseText).toContain('$49/mo');
  });

  it('should suggest SLA macro when customer inquires about uptime guarantees', () => {
    const suggestion = service.suggestMacro('What is your SLA response time guarantee?');
    expect(suggestion).toBeDefined();
    expect(suggestion?.macroId).toBe('macro_sla_guarantee');
    expect(suggestion?.suggestedResponseText).toContain('15-minute');
  });
});
