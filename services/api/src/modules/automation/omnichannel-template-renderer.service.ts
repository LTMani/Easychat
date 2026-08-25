import { Injectable, Logger } from '@nestjs/common';

export interface TemplateRenderResult {
  renderedText: string;
  interpolatedVariables: string[];
  missingVariables: string[];
  characterCount: number;
}

@Injectable()
export class OmnichannelTemplateRendererService {
  private readonly logger = new Logger(OmnichannelTemplateRendererService.name);

  renderTemplate(
    rawTemplate: string,
    variables: Record<string, any>,
    fallbackDefaults: Record<string, string> = { first_name: 'Customer', company_name: 'Your Company' },
  ): TemplateRenderResult {
    this.logger.debug(`Rendering template with ${Object.keys(variables).length} parameters`);

    const interpolated: string[] = [];
    const missing: string[] = [];

    const rendered = rawTemplate.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_, key) => {
      if (variables[key] !== undefined && variables[key] !== null) {
        interpolated.push(key);
        return String(variables[key]);
      }
      if (fallbackDefaults[key] !== undefined) {
        interpolated.push(`${key} (fallback)`);
        return fallbackDefaults[key];
      }
      missing.push(key);
      return `[MISSING: ${key}]`;
    });

    return {
      renderedText: rendered,
      interpolatedVariables: interpolated,
      missingVariables: missing,
      characterCount: rendered.length,
    };
  }
}
