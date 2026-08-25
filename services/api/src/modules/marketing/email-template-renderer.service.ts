import { Injectable } from '@nestjs/common';

export interface TemplateContext {
  firstName?: string;
  lastName?: string;
  email?: string;
  companyName?: string;
  unsubscribeUrl?: string;
  [key: string]: any;
}

@Injectable()
export class EmailTemplateRendererService {
  renderTemplate(templateHtml: string, context: TemplateContext): string {
    let rendered = templateHtml;

    const replacements: Record<string, string> = {
      '{{firstName}}': context.firstName || 'Valued Customer',
      '{{lastName}}': context.lastName || '',
      '{{email}}': context.email || '',
      '{{companyName}}': context.companyName || 'EasyChat CRM',
      '{{unsubscribeUrl}}': context.unsubscribeUrl || '#',
    };

    for (const [tag, val] of Object.entries(replacements)) {
      rendered = rendered.replace(new RegExp(tag, 'g'), val);
    }

    return rendered;
  }

  injectTrackingPixel(renderedHtml: string, trackingId: string): string {
    const pixelTag = `<img src="https://api.easychat.io/v1/marketing/track/open/${trackingId}" width="1" height="1" style="display:none;" alt="" />`;
    if (renderedHtml.includes('</body>')) {
      return renderedHtml.replace('</body>', `${pixelTag}</body>`);
    }
    return `${renderedHtml}${pixelTag}`;
  }
}
