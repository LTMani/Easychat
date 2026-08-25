import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CannedResponseMacroService {
  private readonly logger = new Logger(CannedResponseMacroService.name);

  interpolateTemplate(
    template: string,
    variables: Record<string, string | number>,
  ): string {
    let result = template;
    for (const [key, val] of Object.entries(variables)) {
      const pattern = new RegExp(`{{\\s*${key}\\s*}}`, 'gi');
      result = result.replace(pattern, String(val));
    }
    return result;
  }
}
