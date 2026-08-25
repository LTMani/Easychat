import { Injectable, Logger } from '@nestjs/common';

export interface SearchResultDoc {
  docId: string;
  title: string;
  content: string;
  category: string;
  bm25Score: number;
  vectorSimilarityScore: number;
  hybridScore: number;
}

@Injectable()
export class RagHybridSearchRerankerService {
  private readonly logger = new Logger(RagHybridSearchRerankerService.name);

  private readonly documentCorpus = [
    { docId: 'kb_01', title: 'Enterprise SLA & Support Tiers', content: 'Our Enterprise tier guarantees 15-minute response times for P1 outages with 99.99% uptime.', category: 'SLA' },
    { docId: 'kb_02', title: 'HIPAA PHI Data Compliance', content: 'EasyChat complies with HIPAA standards by signing Business Associate Agreements (BAAs) and encrypting PHI.', category: 'COMPLIANCE' },
    { docId: 'kb_03', title: 'CPQ Custom Quote Generation', content: 'Sales representatives can generate custom CPQ quotes with tiered volume discounts and send e-signatures.', category: 'SALES' },
    { docId: 'kb_04', title: 'WebRTC Softphone & SIP Trunks', content: 'Connect multi-carrier SIP trunks directly in your browser using WebRTC with Opus and G.711 codecs.', category: 'TELEPHONY' },
    { docId: 'kb_05', title: 'Stripe Webhook Payment Handling', content: 'Automated invoice reconciliation and subscription lifecycle management for invoice.payment_succeeded events.', category: 'BILLING' },
  ];

  hybridSearchAndRerank(query: string, alpha: number = 0.5): SearchResultDoc[] {
    this.logger.debug(`Executing hybrid search for query '${query}' with alpha weight ${alpha}`);

    const lowerQuery = query.toLowerCase();
    const queryTokens = lowerQuery.split(' ').filter(Boolean);

    const scored: SearchResultDoc[] = this.documentCorpus.map((doc) => {
      // 1. BM25-style keyword matching
      let matchCount = 0;
      for (const t of queryTokens) {
        if (doc.title.toLowerCase().includes(t) || doc.content.toLowerCase().includes(t)) {
          matchCount++;
        }
      }
      const bm25Score = queryTokens.length > 0 ? matchCount / queryTokens.length : 0;

      // 2. Vector semantic similarity simulation
      let vectorScore = 0.5;
      if (doc.category.toLowerCase().includes(lowerQuery) || lowerQuery.includes(doc.category.toLowerCase())) {
        vectorScore = 0.95;
      } else if (bm25Score > 0) {
        vectorScore = 0.82;
      }

      // 3. Reciprocal Rank Fusion / Alpha weighted score
      const hybridScore = parseFloat((alpha * bm25Score + (1 - alpha) * vectorScore).toFixed(4));

      return {
        docId: doc.docId,
        title: doc.title,
        content: doc.content,
        category: doc.category,
        bm25Score: parseFloat(bm25Score.toFixed(4)),
        vectorSimilarityScore: parseFloat(vectorScore.toFixed(4)),
        hybridScore,
      };
    });

    return scored.sort((a, b) => b.hybridScore - a.hybridScore);
  }
}
