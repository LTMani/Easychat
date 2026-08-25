export interface BaseDomainEvent<T = any> {
  eventId: string;
  eventType: string;
  organizationId: string;
  timestamp: string;
  version: string;
  payload: T;
}

export interface TicketCreatedEventPayload {
  ticketId: string;
  ticketNumber: string;
  subject: string;
  priority: string;
  category: string;
  contactId?: string;
  firstResponseDueAt?: string;
  resolutionDueAt?: string;
}

export interface SlaBreachedEventPayload {
  ticketId: string;
  slaPolicyId: string;
  breachType: 'FIRST_RESPONSE' | 'RESOLUTION';
  targetMinutes: number;
  actualMinutes: number;
  assignedToId?: string;
}

export interface DealStageChangedEventPayload {
  dealId: string;
  pipelineId: string;
  previousStageId: string;
  newStageId: string;
  amount: number;
  assignedToId?: string;
}

export interface CallCompletedEventPayload {
  sessionId: string;
  callerNumber: string;
  calleeNumber: string;
  durationSeconds: number;
  recordingUrl?: string;
  contactId?: string;
}

export interface CsatSubmittedEventPayload {
  surveyId: string;
  ticketId: string;
  contactId: string;
  rating: number;
  feedback?: string;
}
