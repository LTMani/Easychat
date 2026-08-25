import { Injectable, Logger } from '@nestjs/common';

export interface E164ValidationResult {
  rawInput: string;
  isValid: boolean;
  e164Formatted: string;
  countryIso2: string;
  carrierType: 'MOBILE' | 'LANDLINE' | 'TOLL_FREE' | 'VOIP';
  sanitizedNationalNumber: string;
}

@Injectable()
export class PstnE164ValidatorService {
  private readonly logger = new Logger(PstnE164ValidatorService.name);

  validateAndNormalizeE164(phoneNumber: string): E164ValidationResult {
    this.logger.debug(`Validating phone number: ${phoneNumber}`);

    const digitsOnly = phoneNumber.replace(/\D/g, '');
    let isPlusPrefixed = phoneNumber.trim().startsWith('+');
    let e164 = isPlusPrefixed ? `+${digitsOnly}` : `+1${digitsOnly}`;

    let countryIso = 'US';
    let carrierType: 'MOBILE' | 'LANDLINE' | 'TOLL_FREE' | 'VOIP' = 'VOIP';

    if (e164.startsWith('+44')) {
      countryIso = 'GB';
      carrierType = 'MOBILE';
    } else if (e164.startsWith('+49')) {
      countryIso = 'DE';
      carrierType = 'LANDLINE';
    } else if (e164.startsWith('+91')) {
      countryIso = 'IN';
      carrierType = 'MOBILE';
    } else if (e164.startsWith('+1800') || e164.startsWith('+1888')) {
      carrierType = 'TOLL_FREE';
    }

    const isValid = digitsOnly.length >= 10 && digitsOnly.length <= 15;

    return {
      rawInput: phoneNumber,
      isValid,
      e164Formatted: isValid ? e164 : '',
      countryIso2: countryIso,
      carrierType,
      sanitizedNationalNumber: digitsOnly.slice(-10),
    };
  }
}
