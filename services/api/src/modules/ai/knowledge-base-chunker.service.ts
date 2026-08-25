import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface DocumentChunk {
  chunkId: string;
  sourceDocTitle: string;
  chunkIndex: number;
  content: string;
  estimatedTokens: number;
  headingHierarchy: string[];
}

@Injectable()
export class KnowledgeBaseChunkerService {
  private readonly logger = new Logger(KnowledgeBaseChunkerService.name);

  chunkMarkdownDocument(
    title: string,
    markdownContent: string,
    targetChunkSizeChars: number = 400,
    overlapChars: number = 80,
  ): DocumentChunk[] {
    this.logger.debug(`Chunking document '${title}' with target size ${targetChunkSizeChars} and overlap ${overlapChars}`);

    const paragraphs = markdownContent.split(/\n\n+/).filter(Boolean);
    const chunks: DocumentChunk[] = [];
    let currentText = '';
    let currentHeadings: string[] = ['Root'];

    for (let i = 0; i < paragraphs.length; i++) {
      const p = paragraphs[i].trim();
      if (p.startsWith('#')) {
        currentHeadings = [p.replace(/^#+\s*/, '')];
      }

      if ((currentText + '\n\n' + p).length > targetChunkSizeChars && currentText.length > 0) {
        chunks.push({
          chunkId: `chk_${crypto.randomBytes(6).toString('hex')}`,
          sourceDocTitle: title,
          chunkIndex: chunks.length,
          content: currentText.trim(),
          estimatedTokens: Math.round(currentText.length / 4),
          headingHierarchy: [...currentHeadings],
        });

        // Retain overlap tail
        currentText = currentText.slice(-overlapChars) + '\n\n' + p;
      } else {
        currentText = currentText ? currentText + '\n\n' + p : p;
      }
    }

    if (currentText.trim().length > 0) {
      chunks.push({
        chunkId: `chk_${crypto.randomBytes(6).toString('hex')}`,
        sourceDocTitle: title,
        chunkIndex: chunks.length,
        content: currentText.trim(),
        estimatedTokens: Math.round(currentText.length / 4),
        headingHierarchy: [...currentHeadings],
      });
    }

    return chunks;
  }
}
