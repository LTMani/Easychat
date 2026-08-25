import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface MerkleNode {
  hash: string;
  left?: MerkleNode;
  right?: MerkleNode;
}

@Injectable()
export class AuditMerkleTreeService {
  private readonly logger = new Logger(AuditMerkleTreeService.name);

  hashLeaf(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  hashInternal(leftHash: string, rightHash: string): string {
    return crypto.createHash('sha256').update(leftHash + rightHash).digest('hex');
  }

  buildMerkleTree(leafRecords: string[]): { rootHash: string; leafCount: number } {
    this.logger.debug(`Building cryptographic Merkle tree for ${leafRecords.length} audit logs`);

    if (leafRecords.length === 0) {
      return { rootHash: this.hashLeaf('EMPTY_TREE'), leafCount: 0 };
    }

    let currentLevel = leafRecords.map((r) => this.hashLeaf(r));

    while (currentLevel.length > 1) {
      const nextLevel: string[] = [];

      for (let i = 0; i < currentLevel.length; i += 2) {
        const left = currentLevel[i];
        const right = i + 1 < currentLevel.length ? currentLevel[i + 1] : left; // Duplicate last odd element
        nextLevel.push(this.hashInternal(left, right));
      }

      currentLevel = nextLevel;
    }

    return {
      rootHash: currentLevel[0],
      leafCount: leafRecords.length,
    };
  }

  verifyLeafInclusion(targetLeaf: string, rootHash: string, proofHashes: Array<{ hash: string; isLeft: boolean }>): boolean {
    let currentHash = this.hashLeaf(targetLeaf);

    for (const proof of proofHashes) {
      currentHash = proof.isLeft
        ? this.hashInternal(proof.hash, currentHash)
        : this.hashInternal(currentHash, proof.hash);
    }

    return currentHash === rootHash;
  }
}
