import { Test, TestingModule } from '@nestjs/testing';
import { AccountHierarchyService } from '../src/modules/crm/account-hierarchy.service';

describe('AccountHierarchyService', () => {
  let service: AccountHierarchyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountHierarchyService],
    }).compile();
    service = module.get<AccountHierarchyService>(AccountHierarchyService);
  });

  it('should build parent-child tree from flat accounts list', () => {
    const flat = [
      { id: 'p1', name: 'Parent Global', country: 'US', annualRevenue: 1000000, openDealsValue: 200000, contactsCount: 10 },
      { id: 'c1', name: 'Child EU', parentId: 'p1', country: 'DE', annualRevenue: 500000, openDealsValue: 100000, contactsCount: 5 },
      { id: 'c2', name: 'Child APAC', parentId: 'p1', country: 'SG', annualRevenue: 300000, openDealsValue: 50000, contactsCount: 3 },
    ];

    const tree = service.buildHierarchyTree(flat);
    expect(tree).toHaveLength(1);
    expect(tree[0].id).toBe('p1');
    expect(tree[0].children).toHaveLength(2);
  });

  it('should calculate consolidated financial rollups', () => {
    const root = {
      id: 'p1',
      name: 'Parent Global',
      country: 'US',
      annualRevenue: 1000000,
      openDealsValue: 200000,
      contactsCount: 10,
      children: [
        { id: 'c1', name: 'Child EU', country: 'DE', annualRevenue: 500000, openDealsValue: 100000, contactsCount: 5 },
      ],
    };

    const rollup = service.computeRollup(root);
    expect(rollup.consolidatedRevenue).toBe(1500000);
    expect(rollup.consolidatedPipeline).toBe(300000);
    expect(rollup.totalContacts).toBe(15);
    expect(rollup.totalSubsidiaries).toBe(1);
  });
});
