export interface MockSentimentTurnLog {
  id: string;
  conversationId: string;
  agentId: string;
  customerName: string;
  channel: 'LIVE_CHAT' | 'WHATSAPP' | 'VOICE_TRANSCRIPT';
  initialPolarity: number;
  finalPolarity: number;
  resolutionTimeSeconds: number;
  csatScore: number;
  timestamp: string;
}

export const ENTERPRISE_SENTIMENT_TIMELINES: MockSentimentTurnLog[] = [
  {
    id: 'snt_9901',
    conversationId: 'conv_live_19284',
    agentId: 'u_sarah',
    customerName: 'Rahul Varma (Acme Corp)',
    channel: 'LIVE_CHAT',
    initialPolarity: -0.85,
    finalPolarity: 0.92,
    resolutionTimeSeconds: 145,
    csatScore: 5,
    timestamp: '2026-08-25T14:40:00Z',
  },
  {
    id: 'snt_9902',
    conversationId: 'conv_voice_88124',
    agentId: 'u_david',
    customerName: 'Jonathan Vance (TechFlow)',
    channel: 'VOICE_TRANSCRIPT',
    initialPolarity: -0.45,
    finalPolarity: 0.78,
    resolutionTimeSeconds: 320,
    csatScore: 5,
    timestamp: '2026-08-25T13:20:00Z',
  },
  {
    id: 'snt_9903',
    conversationId: 'conv_wa_77412',
    agentId: 'u_emily',
    customerName: 'Priya Sharma (Mumbai Tech)',
    channel: 'WHATSAPP',
    initialPolarity: 0.15,
    finalPolarity: 0.88,
    resolutionTimeSeconds: 90,
    csatScore: 5,
    timestamp: '2026-08-25T12:05:00Z',
  },
];
