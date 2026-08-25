import { Test, TestingModule } from '@nestjs/testing';
import { IvrScriptService } from '../src/modules/telephony/ivr-script.service';

describe('IvrScriptService', () => {
  let service: IvrScriptService;

  const mockScript = {
    id: 'script_001',
    name: 'Sales IVR',
    language: 'en' as const,
    entryNodeId: 'node_greet',
    nodes: [
      {
        id: 'node_greet',
        type: 'GREETING' as const,
        prompt: 'Welcome to EasyChat. How can we help you today?',
        options: [
          { key: '1', label: 'Sales', nextNodeId: 'node_sales' },
          { key: '2', label: 'Support', nextNodeId: 'node_support' },
        ],
      },
      { id: 'node_sales', type: 'TRANSFER' as const, prompt: '', transferTo: '+15551234567' },
      { id: 'node_support', type: 'VOICEMAIL' as const, prompt: 'Please leave your message after the beep.' },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IvrScriptService],
    }).compile();
    service = module.get<IvrScriptService>(IvrScriptService);
  });

  it('should be defined', () => expect(service).toBeDefined());

  it('should generate valid TwiML XML for a GREETING node', () => {
    const twiml = service.buildIvrTwiML(mockScript, 'node_greet');
    expect(twiml).toContain('<Response>');
    expect(twiml).toContain('<Say');
    expect(twiml).toContain('Welcome to EasyChat');
    expect(twiml).toContain('<Gather');
  });

  it('should generate Dial TwiML for TRANSFER node', () => {
    const twiml = service.buildIvrTwiML(mockScript, 'node_sales');
    expect(twiml).toContain('<Dial>');
    expect(twiml).toContain('+15551234567');
  });

  it('should generate Record TwiML for VOICEMAIL node', () => {
    const twiml = service.buildIvrTwiML(mockScript, 'node_support');
    expect(twiml).toContain('<Record');
    expect(twiml).toContain('transcribe="true"');
  });

  it('should return Hangup for unknown node id', () => {
    const twiml = service.buildIvrTwiML(mockScript, 'nonexistent_node');
    expect(twiml).toContain('<Hangup/>');
  });

  it('should correctly route digit input to next node', () => {
    const nextNodeId = service.routeInput(mockScript, 'node_greet', '2');
    expect(nextNodeId).toBe('node_support');
  });

  it('should return null for unrecognized digit input', () => {
    const nextNodeId = service.routeInput(mockScript, 'node_greet', '9');
    expect(nextNodeId).toBeNull();
  });
});
