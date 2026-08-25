import { Test, TestingModule } from '@nestjs/testing';
import { GdprDataPortabilityService } from '../src/modules/gdpr/gdpr-data-portability.service';

describe('GdprDataPortabilityService', () => {
  let service: GdprDataPortabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GdprDataPortabilityService],
    }).compile();
    service = module.get<GdprDataPortabilityService>(GdprDataPortabilityService);
  });

  it('should generate machine readable GDPR Article 20 archive bundle', () => {
    const bundle = service.buildPortabilityBundle({
      id: 'c_9948',
      email: 'customer@acme.com',
      firstName: 'Sarah',
      lastName: 'Jenkins',
    });

    expect(bundle.gdprArticle).toContain('Article 20');
    expect(bundle.contactEmail).toBe('customer@acme.com');
    expect(bundle.personalProfile.firstName).toBe('Sarah');
  });
});
