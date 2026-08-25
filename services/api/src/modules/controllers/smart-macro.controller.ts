import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { AutoResponderSmartMacroService } from '../support/auto-responder-smart-macro.service';

@Controller('v1/support/macros')
export class SmartMacroController {
  constructor(private readonly macroService: AutoResponderSmartMacroService) {}

  @Get()
  async listMacros() {
    const list = this.macroService.listMacros();
    return {
      status: 'success',
      data: list,
    };
  }

  @Post('suggest')
  async suggestMacro(@Body('messageText') messageText: string) {
    if (!messageText) throw new BadRequestException('messageText is required');
    const suggestion = this.macroService.suggestMacro(messageText);
    return {
      status: 'success',
      data: suggestion,
    };
  }
}
