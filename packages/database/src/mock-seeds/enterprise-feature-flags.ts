export interface MockFeatureFlag {
  flagKey: string;
  name: string;
  description: string;
  isEnabled: boolean;
  rolloutPercentage: number;
  targetedWorkspaces: string[];
}

export const ENTERPRISE_FEATURE_FLAGS: MockFeatureFlag[] = [
  {
    flagKey: 'feat_ai_copilot_v2',
    name: 'Grounded AI Copilot & Semantic Vector Search V2',
    description: 'Enables real-time retrieval-augmented generation in live agent chat composer.',
    isEnabled: true,
    rolloutPercentage: 100,
    targetedWorkspaces: ['org_enterprise_01', 'org_strategic_02'],
  },
  {
    flagKey: 'feat_webrtc_opus_hd',
    name: 'WebRTC Opus Fullband Audio Codec',
    description: 'Forces dynamic 48kHz Opus audio negotiation over SIP trunks.',
    isEnabled: true,
    rolloutPercentage: 100,
    targetedWorkspaces: ['*'],
  },
  {
    flagKey: 'feat_hipaa_phi_masking',
    name: 'Real-time PHI Redaction & Vault Logging',
    description: 'Automatically redacts social security numbers, medical record IDs, and DEA licenses.',
    isEnabled: true,
    rolloutPercentage: 100,
    targetedWorkspaces: ['org_healthcare_01'],
  },
  {
    flagKey: 'feat_cpq_tiered_pricing',
    name: 'Advanced CPQ Tiered Volume Pricing Engine',
    description: 'Calculates dynamic seat discount curves and auto-generates quote PDF invoices.',
    isEnabled: true,
    rolloutPercentage: 100,
    targetedWorkspaces: ['*'],
  },
];
