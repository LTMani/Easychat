import { Test, TestingModule } from '@nestjs/testing';
import { AuditMerkleController } from '../src/modules/controllers/audit-merkle.controller';
import { AuditMerkleTreeService } from '../src/modules/audit/audit-merkle-tree.service';

describe('AuditMerkleController', () => {
  let controller: AuditMerkleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditMerkleController],
      providers: [AuditMerkleTreeService],
    }).compile();
    controller = module.get<AuditMerkleController>(AuditMerkleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should build Merkle root hash for signatures', async () => {
    const res = await controller.buildTree({ logSignatures: ['sig_1', 'sig_2'] });
    expect(res.status).toBe('success');
    expect(res.data.rootHash).toBeDefined();
  });
});
