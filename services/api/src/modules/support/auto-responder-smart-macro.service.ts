import { Injectable, Logger } from '@nestjs/common';

export interface SmartMacroRule {
  macroId: string;
  name: string;
  triggerKeywords: string[];
  suggestedResponseText: string;
  confidenceScore: number;
  autoApply: boolean;
}

@Injectable()
export class AutoResponderSmartMacroService {
  private readonly logger = new Logger(AutoResponderSmartMacroService.name);

  private readonly macros: SmartMacroRule[] = [
    {
      macroId: 'macro_pricing_info',
      name: 'Standard Pricing Tier Breakdown',
      triggerKeywords: ['pricing', 'cost', 'plans', 'how much'],
      suggestedResponseText: 'Our standard plans start at $49/mo (Starter), $99/mo (Pro), and $249/mo (Enterprise). Would you like a customized CPQ quote for your team?',
      confidenceScore: 0.94,
      autoApply: true,
    },
    {
      macroId: 'macro_sla_guarantee',
      name: 'Enterprise 15-Minute SLA Policy',
      triggerKeywords: ['sla', 'uptime', 'response time', 'guarantee'],
      suggestedResponseText: 'Our Enterprise tier includes a guaranteed 15-minute initial response SLA for P1 critical issues backed by our SOC 2 certified engineering operations.',
      confidenceScore: 0.96,
      autoApply: true,
    },
    {
      macroId: 'macro_export_data',
      name: 'GDPR Article 20 Data Export Instructions',
      triggerKeywords: ['export data', 'gdpr', 'download records', 'backup'],
      suggestedResponseText: 'You can export all contact histories and deals in JSON/CSV format directly from Settings > Data Portability.',
      confidenceScore: 0.91,
      autoApply: false,
    },
  ];

  suggestMacro(messageText: string): SmartMacroRule | null {
    const lower = messageText.toLowerCase();
    for (const m of this.macros) {
      if (m.triggerKeywords.some((kw) => lower.includes(kw))) {
        this.logger.debug(`Matched smart macro '${m.name}' for incoming message`);
        return m;
      }
    }
    return null;
  }

  listMacros(): SmartMacroRule[] {
    return [...this.macros];
  }
}
