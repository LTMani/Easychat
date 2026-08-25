import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface HipaaAuditEvent {
  eventId: string;
  actorUserId: string;
  actorRole: string;
  patientContactId: string;
  action: 'PHI_VIEWED' | 'PHI_EXPORTED' | 'PHI_MODIFIED' | 'PHI_DELETED' | 'CONSENT_GRANTED' | 'CONSENT_REVOKED';
  fieldsAccessed: string[];
  ipAddress: string;
  userAgent: string;
  tamperProofSignature: string;
  timestamp: string;
}

@Injectable()
export class HipaaAuditLoggerService {
  private readonly logger = new Logger(HipaaAuditLoggerService.name);

  private readonly auditLog: HipaaAuditEvent[] = [];
  private readonly hmacSecret = 'hipaa_compliance_audit_secret_key_2026';

  logPhiAccess(
    actorUserId: string,
    actorRole: string,
    patientContactId: string,
    action: HipaaAuditEvent['action'],
    fieldsAccessed: string[],
    ipAddress: string,
    userAgent: string,
  ): HipaaAuditEvent {
    this.logger.log(`HIPAA Audit: Actor ${actorUserId} performed ${action} on patient record ${patientContactId}`);

    const eventId = `phi_ev_${crypto.randomBytes(12).toString('hex')}`;
    const timestamp = new Date().toISOString();

    const rawPayload = `${eventId}|${actorUserId}|${patientContactId}|${action}|${fieldsAccessed.sort().join(',')}|${timestamp}`;
    const tamperProofSignature = crypto.createHmac('sha256', this.hmacSecret).update(rawPayload).digest('hex');

    const event: HipaaAuditEvent = {
      eventId,
      actorUserId,
      actorRole,
      patientContactId,
      action,
      fieldsAccessed,
      ipAddress,
      userAgent,
      tamperProofSignature,
      timestamp,
    };

    this.auditLog.push(event);
    return event;
  }

  verifyEventIntegrity(event: HipaaAuditEvent): boolean {
    const rawPayload = `${event.eventId}|${event.actorUserId}|${event.patientContactId}|${event.action}|${event.fieldsAccessed.sort().join(',')}|${event.timestamp}`;
    const expectedSig = crypto.createHmac('sha256', this.hmacSecret).update(rawPayload).digest('hex');
    return expectedSig === event.tamperProofSignature;
  }

  getAuditHistory(patientContactId?: string): HipaaAuditEvent[] {
    if (patientContactId) {
      return this.auditLog.filter((e) => e.patientContactId === patientContactId);
    }
    return [...this.auditLog];
  }
}
