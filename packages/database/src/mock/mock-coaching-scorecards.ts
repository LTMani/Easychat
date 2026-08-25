export interface MockScorecardRecord {
  id: string;
  agentName: string;
  agentEmail: string;
  ticketNumber: string;
  totalScore: number;
  performanceBand: 'TOP_PERFORMER' | 'PROFICIENT' | 'NEEDS_COACHING';
  evaluator: string;
  date: string;
}

export const MOCK_COACHING_SCORECARDS: MockScorecardRecord[] = [
  { id: 'sc_001', agentName: 'Sarah Jenkins', agentEmail: 'sarah@acme.com', ticketNumber: 'TKT-2026-1001', totalScore: 96, performanceBand: 'TOP_PERFORMER', evaluator: 'QA Lead Marcus', date: '2026-08-25' },
  { id: 'sc_002', agentName: 'Alex Mercer', agentEmail: 'alex@acme.com', ticketNumber: 'TKT-2026-1002', totalScore: 92, performanceBand: 'TOP_PERFORMER', evaluator: 'QA Lead Marcus', date: '2026-08-24' },
  { id: 'sc_003', agentName: 'Priya Sharma', agentEmail: 'priya@acme.com', ticketNumber: 'TKT-2026-1003', totalScore: 88, performanceBand: 'PROFICIENT', evaluator: 'Supervisor David', date: '2026-08-24' },
  { id: 'sc_004', agentName: 'Sam Chen', agentEmail: 'sam@acme.com', ticketNumber: 'TKT-2026-1006', totalScore: 84, performanceBand: 'PROFICIENT', evaluator: 'Supervisor David', date: '2026-08-23' },
  { id: 'sc_005', agentName: 'Junior Agent Leo', agentEmail: 'leo@acme.com', ticketNumber: 'TKT-2026-1008', totalScore: 68, performanceBand: 'NEEDS_COACHING', evaluator: 'QA Lead Marcus', date: '2026-08-22' },
];
