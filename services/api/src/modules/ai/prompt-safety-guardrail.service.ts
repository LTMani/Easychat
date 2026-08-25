import { Injectable, Logger } from '@nestjs/common';

export interface GuardrailCheckResult {
  isSafe: boolean;
  sanitizedInput: string;
  violations: string[];
  piiRedactionsCount: number;
}

@Injectable()
export class PromptSafetyGuardrailService {
  private readonly logger = new Logger(PromptSafetyGuardrailService.name);

  private readonly injectionPatterns = [
    /ignore all previous instructions/i,
    /system override/i,
    /you are now DAN/i,
    /reveal the system prompt/i,
    /jailbreak/i,
  ];

  sanitizeAndScan(input: string): GuardrailCheckResult {
    this.logger.debug('Scanning user prompt for injection vulnerabilities and sensitive PII');

    const violations: string[] = [];
    let sanitized = input;

    for (const pattern of this.injectionPatterns) {
      if (pattern.test(input)) {
        violations.push(`INJECTION_DETECTED: Matched pattern ${pattern.toString()}`);
      }
    }

    // PII Redaction: SSN (###-##-####) and Credit Cards (16 digits)
    let piiCount = 0;
    const ssnRegex = /\b\d{3}-\d{2}-\d{4}\b/g;
    if (ssnRegex.test(sanitized)) {
      sanitized = sanitized.replace(ssnRegex, '[REDACTED_SSN]');
      piiCount++;
    }

    const ccRegex = /\b(?:\d{4}[ -]?){3}\d{4}\b/g;
    if (ccRegex.test(sanitized)) {
      sanitized = sanitized.replace(ccRegex, '[REDACTED_PAYMENT_CARD]');
      piiCount++;
    }

    return {
      isSafe: violations.length === 0,
      sanitizedInput: sanitized,
      violations,
      piiRedactionsCount: piiCount,
    };
  }
}
