import { Controller, Post, Get, Body, BadRequestException } from '@nestjs/common';
import { PromptSafetyGuardrailService } from '../ai/prompt-safety-guardrail.service';
import { SemanticCacheVectorService } from '../ai/semantic-cache-vector.service';

@Controller('v1/ai/guardrails')
export class AiGuardrailController {
  constructor(
    private readonly guardrailService: PromptSafetyGuardrailService,
    private readonly cacheService: SemanticCacheVectorService,
  ) {}

  @Post('scan')
  async scanPrompt(@Body('prompt') prompt: string) {
    if (!prompt) throw new BadRequestException('prompt is required');
    const result = this.guardrailService.sanitizeAndScan(prompt);
    return {
      status: 'success',
      data: result,
    };
  }

  @Get('cache-stats')
  async getCacheStats() {
    const stats = this.cacheService.getCacheStats();
    return {
      status: 'success',
      data: stats,
    };
  }
}
