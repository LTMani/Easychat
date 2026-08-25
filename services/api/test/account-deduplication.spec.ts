import { Test, TestingModule } from '@nestjs/testing';
import { AccountDeduplicationService } from '../src/modules/crm/account-deduplication.service';

describe('AccountDeduplicationService', () => {
  let service: AccountDeduplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountDeduplicationService],
    }).compile();
    service = module.get<AccountDeduplicationService>(AccountDeduplicationService);
  });

  it('should detect duplicate contacts by email', () => {
    const contacts = [
      { id: 'c1', email: 'sarah@acme.com' },
      { id: 'c2', email: 'alex@acme.com' },
      { id: 'c3', email: 'SARAH@acme.com' }, // duplicate of c1
    ];

    const dups = service.findDuplicates(contacts);
    expect(dups.length).toBe(1);
    expect(dups[0].primaryId).toBe('c1');
    expect(dups[0].duplicateId).toBe('c3');
  });
});
