export interface NormalizedPhone {
  isValid: boolean;
  e164Format?: string;
  nationalFormat?: string;
  countryCode?: string;
  raw: string;
}

export function normalizePhoneNumber(raw: string, defaultCountry: string = 'US'): NormalizedPhone {
  if (!raw) return { isValid: false, raw: '' };

  const digitsOnly = raw.replace(/\D/g, '');

  if (digitsOnly.length === 10 && defaultCountry === 'US') {
    return {
      isValid: true,
      e164Format: `+1${digitsOnly}`,
      nationalFormat: `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`,
      countryCode: 'US',
      raw,
    };
  }

  if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
    const area = digitsOnly.slice(1, 4);
    const mid = digitsOnly.slice(4, 7);
    const last = digitsOnly.slice(7);
    return {
      isValid: true,
      e164Format: `+${digitsOnly}`,
      nationalFormat: `(${area}) ${mid}-${last}`,
      countryCode: 'US',
      raw,
    };
  }

  if (digitsOnly.length >= 8 && digitsOnly.length <= 15) {
    return {
      isValid: true,
      e164Format: `+${digitsOnly}`,
      nationalFormat: `+${digitsOnly}`,
      countryCode: defaultCountry,
      raw,
    };
  }

  return { isValid: false, raw };
}
