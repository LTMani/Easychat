export interface MockE911AddressSeed {
  addressId: string;
  businessEntity: string;
  fullStreetAddress: string;
  floorSuiteDesk: string;
  city: string;
  stateCode: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  psapZoneIdentifier: string;
  fccCarrierVerificationToken: string;
}

export const ENTERPRISE_TELEPHONY_E911_ADDRESSES: MockE911AddressSeed[] = [
  { addressId: 'e911_addr_sf_hq', businessEntity: 'EasyChat Inc. - San Francisco HQ', fullStreetAddress: '500 Howard Street', floorSuiteDesk: 'Suite 1400', city: 'San Francisco', stateCode: 'CA', postalCode: '94105', latitude: 37.7885, longitude: -122.3972, psapZoneIdentifier: 'PSAP_SF_01_ECC', fccCarrierVerificationToken: 'fcc_karis_law_v1_001928' },
  { addressId: 'e911_addr_nyc_office', businessEntity: 'EasyChat Inc. - New York Office', fullStreetAddress: '111 8th Avenue', floorSuiteDesk: '16th Floor, West Wing', city: 'New York', stateCode: 'NY', postalCode: '10011', latitude: 40.7411, longitude: -74.0024, psapZoneIdentifier: 'PSAP_NYC_MANHATTAN_911', fccCarrierVerificationToken: 'fcc_karis_law_v1_008819' },
  { addressId: 'e911_addr_austin_hub', businessEntity: 'EasyChat Inc. - Austin Support Hub', fullStreetAddress: '500 W 2nd Street', floorSuiteDesk: 'Suite 1900', city: 'Austin', stateCode: 'TX', postalCode: '78701', latitude: 30.2662, longitude: -97.7471, psapZoneIdentifier: 'PSAP_AUSTIN_TRAVIS_COUNTY', fccCarrierVerificationToken: 'fcc_karis_law_v1_004812' },
  { addressId: 'e911_addr_seattle_eng', businessEntity: 'EasyChat Inc. - Seattle Engineering', fullStreetAddress: '1201 3rd Avenue', floorSuiteDesk: 'Suite 2200', city: 'Seattle', stateCode: 'WA', postalCode: '98101', latitude: 47.6062, longitude: -122.3352, psapZoneIdentifier: 'PSAP_SEATTLE_KING_COUNTY', fccCarrierVerificationToken: 'fcc_karis_law_v1_003921' },
];
