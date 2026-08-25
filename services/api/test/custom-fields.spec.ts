import { Test, TestingModule } from '@nestjs/testing';
import { CustomFieldDefinitionService, CustomFieldDefinition } from '../src/modules/custom-fields/custom-field-definition.service';

describe('CustomFieldDefinitionService', () => {
  let service: CustomFieldDefinitionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomFieldDefinitionService],
    }).compile();
    service = module.get<CustomFieldDefinitionService>(CustomFieldDefinitionService);
  });

  it('should validate NUMBER field correctly', () => {
    const def: CustomFieldDefinition = {
      id: 'f1',
      organizationId: 'org1',
      name: 'Deal Discount',
      key: 'discount_percent',
      type: 'NUMBER',
      target: 'DEAL',
      isRequired: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const validRes = service.validateFieldValue(def, 15.5);
    expect(validRes.isValid).toBe(true);
    expect(validRes.normalizedValue).toBe(15.5);

    const invalidRes = service.validateFieldValue(def, 'not-a-number');
    expect(invalidRes.isValid).toBe(false);
  });

  it('should validate SELECT options constraint', () => {
    const def: CustomFieldDefinition = {
      id: 'f2',
      organizationId: 'org1',
      name: 'Industry',
      key: 'industry',
      type: 'SELECT',
      target: 'CONTACT',
      isRequired: false,
      options: ['FINTECH', 'HEALTHCARE', 'ECOMMERCE'],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(service.validateFieldValue(def, 'FINTECH').isValid).toBe(true);
    expect(service.validateFieldValue(def, 'GAMING').isValid).toBe(false);
  });

  it('should validate whole map of custom fields', () => {
    const defs: CustomFieldDefinition[] = [
      {
        id: 'f1',
        organizationId: 'org1',
        name: 'Is VIP',
        key: 'is_vip',
        type: 'BOOLEAN',
        target: 'CONTACT',
        isRequired: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f2',
        organizationId: 'org1',
        name: 'Website',
        key: 'website',
        type: 'URL',
        target: 'CONTACT',
        isRequired: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const result = service.validateCustomFieldValuesMap(defs, {
      is_vip: 'true',
      website: 'https://example.com',
    });

    expect(result.isValid).toBe(true);
    expect(result.normalizedPayload.is_vip).toBe(true);
  });
});
