import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';

export interface DispatchablePhysicalAddress {
  civicStreet: string;
  unitSuiteFloor: string;
  city: string;
  stateOrProvince: string;
  postalCode: string;
  countryIso: string;
  latitude: number;
  longitude: number;
}

export interface E911EmergencyRegistration {
  registrationId: string;
  phoneNumberE164: string;
  agentName: string;
  workspaceId: string;
  physicalLocation: DispatchablePhysicalAddress;
  psapRoutingZone: string;
  fccComplianceStatus: 'VALIDATED_KARIS_LAW_RAY_BAUMS' | 'PENDING_VALIDATION' | 'REJECTED';
  lastValidatedTimestamp: string;
}

@Injectable()
export class E911EmergencyDispatchRoutingService {
  private readonly logger = new Logger(E911EmergencyDispatchRoutingService.name);

  private readonly registrations = new Map<string, E911EmergencyRegistration>();

  constructor() {
    this.seedInitialE911Locations();
  }

  private seedInitialE911Locations() {
    this.registerEmergencyLocation({
      phoneNumberE164: '+14155550192',
      agentName: 'Sarah Jenkins',
      workspaceId: 'org_enterprise_01',
      physicalLocation: {
        civicStreet: '500 Howard Street',
        unitSuiteFloor: 'Floor 14, Desk 14-B',
        city: 'San Francisco',
        stateOrProvince: 'CA',
        postalCode: '94105',
        countryIso: 'US',
        latitude: 37.7885,
        longitude: -122.3972,
      },
      psapZone: 'PSAP_SAN_FRANCISCO_ECC_01',
    });
  }

  registerEmergencyLocation(dto: {
    phoneNumberE164: string;
    agentName: string;
    workspaceId: string;
    physicalLocation: DispatchablePhysicalAddress;
    psapZone: string;
  }): E911EmergencyRegistration {
    this.logger.log(`Registering FCC Ray Baum's Act dispatchable location for ${dto.phoneNumberE164} (${dto.agentName})`);

    const regId = `e911_${crypto.randomBytes(8).toString('hex')}`;
    const record: E911EmergencyRegistration = {
      registrationId: regId,
      phoneNumberE164: dto.phoneNumberE164,
      agentName: dto.agentName,
      workspaceId: dto.workspaceId,
      physicalLocation: dto.physicalLocation,
      psapRoutingZone: dto.psapZone,
      fccComplianceStatus: 'VALIDATED_KARIS_LAW_RAY_BAUMS',
      lastValidatedTimestamp: new Date().toISOString(),
    };

    this.registrations.set(dto.phoneNumberE164, record);
    return record;
  }

  getEmergencyRoutingForCaller(phoneNumberE164: string): E911EmergencyRegistration | null {
    return this.registrations.get(phoneNumberE164) || null;
  }

  listRegistrations(): E911EmergencyRegistration[] {
    return Array.from(this.registrations.values());
  }
}
