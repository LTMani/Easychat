import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuditMerkleTreeService } from '../audit/audit-merkle-tree.service';

@Controller('v1/audit/merkle')
export class AuditMerkleController {
  constructor(private readonly merkleService: AuditMerkleTreeService) {}

  @Post('tree')
  async buildTree(@Body() body: { logSignatures: string[] }) {
    if (!body.logSignatures) {
      throw new BadRequestException('logSignatures array is required');
    }

    const tree = this.merkleService.buildMerkleTree(body.logSignatures);
    return {
      status: 'success',
      data: tree,
    };
  }

  @Post('verify')
  async verifyProof(
    @Body()
    body: {
      targetLeaf: string;
      rootHash: string;
      proofHashes: Array<{ hash: string; isLeft: boolean }>;
    },
  ) {
    if (!body.targetLeaf || !body.rootHash || !body.proofHashes) {
      throw new BadRequestException('targetLeaf, rootHash, and proofHashes are required');
    }

    const isValid = this.merkleService.verifyLeafInclusion(
      body.targetLeaf,
      body.rootHash,
      body.proofHashes,
    );

    return {
      status: 'success',
      isValid,
    };
  }
}
