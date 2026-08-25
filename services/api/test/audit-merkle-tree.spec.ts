import { Test, TestingModule } from '@nestjs/testing';
import { AuditMerkleTreeService } from '../src/modules/audit/audit-merkle-tree.service';

describe('AuditMerkleTreeService', () => {
  let service: AuditMerkleTreeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuditMerkleTreeService],
    }).compile();
    service = module.get<AuditMerkleTreeService>(AuditMerkleTreeService);
  });

  it('should build deterministic Merkle tree root hash', () => {
    const logs = ['log_01_user_login', 'log_02_key_rotated', 'log_03_contract_signed'];
    const tree1 = service.buildMerkleTree(logs);
    const tree2 = service.buildMerkleTree(logs);

    expect(tree1.rootHash).toBe(tree2.rootHash);
    expect(tree1.leafCount).toBe(3);
  });

  it('should produce different root hash if any audit log is altered', () => {
    const originalLogs = ['log_01_user_login', 'log_02_key_rotated'];
    const tamperedLogs = ['log_01_user_login', 'log_02_key_rotated_TAMPERED'];

    const orig = service.buildMerkleTree(originalLogs);
    const tamp = service.buildMerkleTree(tamperedLogs);

    expect(orig.rootHash).not.toBe(tamp.rootHash);
  });
});
