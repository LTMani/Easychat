import { Test, TestingModule } from '@nestjs/testing';
import { GdprPortabilityController } from '../src/modules/controllers/gdpr-portability.controller';
import { GdprDataPortabilityService } from '../src/modules/gdpr/gdpr-data-portability.service';

describe('GdprPortabilityController', () => {
  let controller: GdprPortabilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GdprPortabilityController],
      providers: [GdprDataPortabilityService],
    }).compile();
    controller = module.get<GdprPortabilityController>(GdprPortabilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should export customer personal data in machine-readable JSON', async () => {
    const res = await controller.exportCustomerData({
      contactId: 'c_01',
      email: 'alex@acme.com',
      firstName: 'Alex',
    });

    expect(res.status).toBe('success');
    expect(res.data.contactEmail).toBe('alex@acme.com');
  });
});
