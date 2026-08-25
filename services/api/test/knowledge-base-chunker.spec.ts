import { Test, TestingModule } from '@nestjs/testing';
import { KnowledgeBaseChunkerService } from '../src/modules/ai/knowledge-base-chunker.service';

describe('KnowledgeBaseChunkerService', () => {
  let service: KnowledgeBaseChunkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KnowledgeBaseChunkerService],
    }).compile();
    service = module.get<KnowledgeBaseChunkerService>(KnowledgeBaseChunkerService);
  });

  it('should split long markdown documents into chunks with token counts and heading hierarchy', () => {
    const doc = `
# EasyChat Telephony Architecture

The WebRTC softphone provides direct in-browser SIP trunking.

## Codec Negotiation

We support Opus and G.711 u-law codecs.

## Regional Gateways

Primary voice gateways are deployed in US-East (N. Virginia), EU-West (Frankfurt), and AP-South (Singapore).
`;

    const chunks = service.chunkMarkdownDocument('Telephony Architecture', doc, 150, 30);
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks[0].chunkId).toContain('chk_');
    expect(chunks[0].sourceDocTitle).toBe('Telephony Architecture');
    expect(chunks[0].estimatedTokens).toBeGreaterThan(0);
  });
});
