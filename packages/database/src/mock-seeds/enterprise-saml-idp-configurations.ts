export interface MockSamlIdpConfig {
  idpConfigId: string;
  workspaceId: string;
  idpProviderName: 'OKTA' | 'AZURE_AD' | 'GOOGLE_WORKSPACE' | 'PING_IDENTITY' | 'ONELOGIN';
  entityId: string;
  ssoSignOnUrl: string;
  x509CertificatePem: string;
  forceAuthn: boolean;
  signAuthnRequest: boolean;
  allowUnencryptedAssertions: boolean;
  jitProvisioningEnabled: boolean;
  defaultRole: 'MEMBER' | 'ADMIN' | 'SUPPORT_AGENT' | 'READ_ONLY';
}

export const ENTERPRISE_SAML_IDP_CONFIGURATIONS: MockSamlIdpConfig[] = [
  {
    idpConfigId: 'saml_okta_apex',
    workspaceId: 'org_enterprise_01',
    idpProviderName: 'OKTA',
    entityId: 'http://www.okta.com/exk9948201',
    ssoSignOnUrl: 'https://apexglobal.okta.com/app/easychat/sso/saml',
    x509CertificatePem: '-----BEGIN CERTIFICATE-----\nMIIDqjCCApKgAwIBAgIGAX...\n-----END CERTIFICATE-----',
    forceAuthn: false,
    signAuthnRequest: true,
    allowUnencryptedAssertions: false,
    jitProvisioningEnabled: true,
    defaultRole: 'MEMBER',
  },
  {
    idpConfigId: 'saml_azure_biohealth',
    workspaceId: 'org_enterprise_02',
    idpProviderName: 'AZURE_AD',
    entityId: 'https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/',
    ssoSignOnUrl: 'https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47/saml2',
    x509CertificatePem: '-----BEGIN CERTIFICATE-----\nMIIDnzCCAoegAwIBAgIQN2...\n-----END CERTIFICATE-----',
    forceAuthn: true,
    signAuthnRequest: true,
    allowUnencryptedAssertions: false,
    jitProvisioningEnabled: true,
    defaultRole: 'SUPPORT_AGENT',
  },
  {
    idpConfigId: 'saml_google_nexus',
    workspaceId: 'org_strategic_03',
    idpProviderName: 'GOOGLE_WORKSPACE',
    entityId: 'https://accounts.google.com/o/saml2?idpid=C01234567',
    ssoSignOnUrl: 'https://accounts.google.com/o/saml2/idp?idpid=C01234567',
    x509CertificatePem: '-----BEGIN CERTIFICATE-----\nMIIDdDCCAlygAwIBAgIGAV...\n-----END CERTIFICATE-----',
    forceAuthn: false,
    signAuthnRequest: true,
    allowUnencryptedAssertions: false,
    jitProvisioningEnabled: true,
    defaultRole: 'MEMBER',
  },
];
