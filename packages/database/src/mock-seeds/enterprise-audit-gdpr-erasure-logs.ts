export interface MockGdprErasureLog {
  erasureLogId: string;
  dataSubjectEmailHash: string;
  erasureScope: 'ALL_ASSOCIATED_RECORDS' | 'MARKETING_PROFILES_ONLY';
  databaseTablesModified: string[];
  recordsAnonymizedCount: number;
  cryptographicVerificationReceipt: string;
  requestedDate: string;
  completedDate: string;
}

export const ENTERPRISE_AUDIT_GDPR_ERASURE_LOGS: MockGdprErasureLog[] = [
  {
    erasureLogId: 'ers_gdpr_9901',
    dataSubjectEmailHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    erasureScope: 'ALL_ASSOCIATED_RECORDS',
    databaseTablesModified: ['Contact', 'CustomerActivity', 'SupportTicketComment', 'ChatTranscript'],
    recordsAnonymizedCount: 142,
    cryptographicVerificationReceipt: 'rec_sig_dpo_gdpr_2026_01',
    requestedDate: '2026-08-20T10:00:00Z',
    completedDate: '2026-08-20T10:02:15Z',
  },
  {
    erasureLogId: 'ers_gdpr_9902',
    dataSubjectEmailHash: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
    erasureScope: 'ALL_ASSOCIATED_RECORDS',
    databaseTablesModified: ['Contact', 'CustomerActivity', 'ChatTranscript'],
    recordsAnonymizedCount: 89,
    cryptographicVerificationReceipt: 'rec_sig_dpo_gdpr_2026_02',
    requestedDate: '2026-08-22T14:30:00Z',
    completedDate: '2026-08-22T14:31:40Z',
  },
  {
    erasureLogId: 'ers_gdpr_9903',
    dataSubjectEmailHash: 'c0535e4be2b79ffd93291305436bf889314e4a3faec05ecffcbb7ef31ad96191',
    erasureScope: 'ALL_ASSOCIATED_RECORDS',
    databaseTablesModified: ['Contact', 'CustomerActivity'],
    recordsAnonymizedCount: 45,
    cryptographicVerificationReceipt: 'rec_sig_dpo_gdpr_2026_03',
    requestedDate: '2026-08-24T09:15:00Z',
    completedDate: '2026-08-24T09:16:10Z',
  },
];
