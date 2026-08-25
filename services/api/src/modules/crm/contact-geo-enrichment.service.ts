import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface GeoLocation {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

@Injectable()
export class ContactGeoEnrichmentService {
  private readonly logger = new Logger(ContactGeoEnrichmentService.name);

  private readonly COUNTRY_DATA: Record<string, { region: string; city: string; latitude: number; longitude: number; timezone: string }> = {
    US: { region: 'North America', city: 'New York', latitude: 40.7128, longitude: -74.006, timezone: 'America/New_York' },
    GB: { region: 'Europe', city: 'London', latitude: 51.5074, longitude: -0.1278, timezone: 'Europe/London' },
    IN: { region: 'Asia', city: 'Mumbai', latitude: 19.076, longitude: 72.8777, timezone: 'Asia/Kolkata' },
    DE: { region: 'Europe', city: 'Berlin', latitude: 52.52, longitude: 13.405, timezone: 'Europe/Berlin' },
    FR: { region: 'Europe', city: 'Paris', latitude: 48.8566, longitude: 2.3522, timezone: 'Europe/Paris' },
    CA: { region: 'North America', city: 'Toronto', latitude: 43.6532, longitude: -79.3832, timezone: 'America/Toronto' },
    AU: { region: 'Oceania', city: 'Sydney', latitude: -33.8688, longitude: 151.2093, timezone: 'Australia/Sydney' },
    SG: { region: 'Asia', city: 'Singapore', latitude: 1.3521, longitude: 103.8198, timezone: 'Asia/Singapore' },
    JP: { region: 'Asia', city: 'Tokyo', latitude: 35.6762, longitude: 139.6503, timezone: 'Asia/Tokyo' },
    BR: { region: 'South America', city: 'São Paulo', latitude: -23.5558, longitude: -46.6396, timezone: 'America/Sao_Paulo' },
  };

  resolveCountryToGeo(countryCode: string): GeoLocation | null {
    const data = this.COUNTRY_DATA[countryCode.toUpperCase()];
    if (!data) return null;

    return { country: this.getCountryName(countryCode), countryCode: countryCode.toUpperCase(), ...data };
  }

  async enrichContactWithGeo(contactId: string): Promise<GeoLocation | null> {
    this.logger.log(`Enriching contact ${contactId} with geolocation data`);

    const contact = await prisma.contact.findUnique({
      where: { id: contactId },
      select: { id: true, country: true, email: true },
    });

    if (!contact?.country) {
      this.logger.warn(`Contact ${contactId} has no country set — cannot enrich`);
      return null;
    }

    const geo = this.resolveCountryToGeo(contact.country);

    if (geo) {
      this.logger.log(`Resolved geo for contact ${contactId}: ${geo.city}, ${geo.country}`);
    }

    return geo;
  }

  async bulkEnrichContacts(organizationId: string): Promise<{ enriched: number; skipped: number }> {
    this.logger.log(`Bulk geo enrichment for org ${organizationId}`);

    const contacts = await prisma.contact.findMany({
      where: { organizationId, country: { not: null } },
      select: { id: true, country: true },
      take: 500,
    });

    let enriched = 0;
    let skipped = 0;

    for (const contact of contacts) {
      if (!contact.country) { skipped++; continue; }
      const geo = this.resolveCountryToGeo(contact.country);
      if (geo) { enriched++; } else { skipped++; }
    }

    return { enriched, skipped };
  }

  private getCountryName(code: string): string {
    const names: Record<string, string> = { US: 'United States', GB: 'United Kingdom', IN: 'India', DE: 'Germany', FR: 'France', CA: 'Canada', AU: 'Australia', SG: 'Singapore', JP: 'Japan', BR: 'Brazil' };
    return names[code.toUpperCase()] ?? code;
  }

  getRegionalBreakdown(contacts: Array<{ country: string | null }>): Record<string, number> {
    const breakdown: Record<string, number> = {};

    for (const contact of contacts) {
      if (!contact.country) { breakdown['Unknown'] = (breakdown['Unknown'] ?? 0) + 1; continue; }
      const geo = this.resolveCountryToGeo(contact.country);
      const region = geo?.region ?? 'Unknown';
      breakdown[region] = (breakdown[region] ?? 0) + 1;
    }

    return breakdown;
  }
}
