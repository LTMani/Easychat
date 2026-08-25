import { Test, TestingModule } from '@nestjs/testing';
import { DeveloperApiKeysController } from '../src/modules/controllers/developer-api-keys.controller';

describe('DeveloperApiKeysController', () => {
  let controller: DeveloperApiKeysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeveloperApiKeysController],
    }).compile();
    controller = module.get<DeveloperApiKeysController>(DeveloperApiKeysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should generate new high-entropy API key with live prefix', async () => {
    const res = await controller.createApiKey({
      name: 'Test Production Key',
      permissions: ['contacts:read', 'deals:write'],
    });

    expect(res.status).toBe('success');
    expect(res.data.prefix).toContain('ech_live_');
    expect(res.data.apiKey).toBeDefined();
  });
});
