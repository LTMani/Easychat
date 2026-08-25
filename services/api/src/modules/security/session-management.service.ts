import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface UserSession {
  sessionId: string;
  userId: string;
  organizationId: string;
  tokenHash: string;
  deviceInfo: {
    browser?: string;
    os?: string;
    ipAddress?: string;
    isMobile?: boolean;
  };
  isActive: boolean;
  lastActivityAt: Date;
  expiresAt: Date;
  createdAt: Date;
}

@Injectable()
export class SessionManagementService {
  private readonly logger = new Logger(SessionManagementService.name);
  private readonly sessions = new Map<string, UserSession>();

  createSession(params: {
    userId: string;
    organizationId: string;
    token: string;
    deviceInfo: UserSession['deviceInfo'];
    sessionTtlHours?: number;
  }): UserSession {
    const sessionId = `sess_${crypto.randomBytes(16).toString('hex')}`;
    const tokenHash = crypto.createHash('sha256').update(params.token).digest('hex');
    const now = new Date();
    const ttlHours = params.sessionTtlHours || 24;
    const expiresAt = new Date(now.getTime() + ttlHours * 60 * 60 * 1000);

    const session: UserSession = {
      sessionId,
      userId: params.userId,
      organizationId: params.organizationId,
      tokenHash,
      deviceInfo: params.deviceInfo,
      isActive: true,
      lastActivityAt: now,
      expiresAt,
      createdAt: now,
    };

    this.sessions.set(sessionId, session);
    this.logger.log(`Created session ${sessionId} for user ${params.userId}`);
    return session;
  }

  validateSession(sessionId: string, token: string): { isValid: boolean; session?: UserSession; reason?: string } {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return { isValid: false, reason: 'SESSION_NOT_FOUND' };
    }

    if (!session.isActive) {
      return { isValid: false, reason: 'SESSION_REVOKED' };
    }

    if (new Date() > session.expiresAt) {
      session.isActive = false;
      return { isValid: false, reason: 'SESSION_EXPIRED' };
    }

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    if (session.tokenHash !== tokenHash) {
      return { isValid: false, reason: 'TOKEN_MISMATCH' };
    }

    session.lastActivityAt = new Date();
    return { isValid: true, session };
  }

  revokeSession(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.isActive = false;
      this.logger.log(`Revoked session ${sessionId}`);
      return true;
    }
    return false;
  }

  revokeAllUserSessions(userId: string, exceptSessionId?: string): number {
    let count = 0;
    for (const [id, session] of this.sessions.entries()) {
      if (session.userId === userId && id !== exceptSessionId && session.isActive) {
        session.isActive = false;
        count++;
      }
    }
    this.logger.log(`Revoked ${count} sessions for user ${userId}`);
    return count;
  }

  getUserActiveSessions(userId: string): UserSession[] {
    const list: UserSession[] = [];
    const now = new Date();
    for (const session of this.sessions.values()) {
      if (session.userId === userId && session.isActive && session.expiresAt > now) {
        list.push(session);
      }
    }
    return list;
  }
}
