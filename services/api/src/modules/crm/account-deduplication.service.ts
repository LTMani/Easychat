import { Injectable, Logger } from '@nestjs/common';

export interface DuplicateCandidate {
  primaryId: string;
  duplicateId: string;
  matchedField: 'EMAIL' | 'PHONE' | 'DOMAIN';
  confidenceScore: number;
}

@Injectable()
export class AccountDeduplicationService {
  private readonly logger = new Logger(AccountDeduplicationService.name);

  findDuplicates(contacts: Array<{ id: string; email: string; phone?: string }>): DuplicateCandidate[] {
    const duplicates: DuplicateCandidate[] = [];
    const emailMap = new Map<string, string>();

    for (const c of contacts) {
      const normalizedEmail = c.email.trim().toLowerCase();
      if (emailMap.has(normalizedEmail)) {
        duplicates.push({
          primaryId: emailMap.get(normalizedEmail)!,
          duplicateId: c.id,
          matchedField: 'EMAIL',
          confidenceScore: 1.0,
        });
      } else {
        emailMap.set(normalizedEmail, c.id);
      }
    }

    return duplicates;
  }
}
