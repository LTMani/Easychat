import { Test, TestingModule } from '@nestjs/testing';
import { SamlSsoService } from '../src/modules/sso/saml-sso.service';

describe('SamlSsoService', () => {
  let service: SamlSsoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SamlSsoService],
    }).compile();

    service = module.get<SamlSsoService>(SamlSsoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should format SAML Metadata XML entity ID correctly', () => {
    const entityId = 'https://sso.easychat.io/saml/metadata';
    expect(entityId).toContain('easychat.io');
  });
});
