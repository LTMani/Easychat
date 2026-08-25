import { Test, TestingModule } from '@nestjs/testing';
import { SessionManagementService } from '../src/modules/security/session-management.service';

describe('SessionManagementService', () => {
  let service: SessionManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionManagementService],
    }).compile();
    service = module.get<SessionManagementService>(SessionManagementService);
  });

  it('should create and validate user sessions with token hashing', () => {
    const token = 'jwt_secret_token_12345';
    const session = service.createSession({
      userId: 'u1',
      organizationId: 'org1',
      token,
      deviceInfo: { browser: 'Chrome', os: 'Windows', ipAddress: '127.0.0.1' },
      sessionTtlHours: 12,
    });

    expect(session.sessionId).toBeDefined();
    expect(session.isActive).toBe(true);

    const validation = service.validateSession(session.sessionId, token);
    expect(validation.isValid).toBe(true);
    expect(validation.session?.userId).toBe('u1');

    const wrongTokenVal = service.validateSession(session.sessionId, 'wrong_token');
    expect(wrongTokenVal.isValid).toBe(false);
    expect(wrongTokenVal.reason).toBe('TOKEN_MISMATCH');
  });

  it('should revoke individual session', () => {
    const session = service.createSession({
      userId: 'u2',
      organizationId: 'org1',
      token: 'tok_abc',
      deviceInfo: {},
    });

    service.revokeSession(session.sessionId);
    const validation = service.validateSession(session.sessionId, 'tok_abc');
    expect(validation.isValid).toBe(false);
    expect(validation.reason).toBe('SESSION_REVOKED');
  });

  it('should revoke all user sessions except current', () => {
    const s1 = service.createSession({ userId: 'u3', organizationId: 'org1', token: 't1', deviceInfo: {} });
    const s2 = service.createSession({ userId: 'u3', organizationId: 'org1', token: 't2', deviceInfo: {} });
    const s3 = service.createSession({ userId: 'u3', organizationId: 'org1', token: 't3', deviceInfo: {} });

    const revokedCount = service.revokeAllUserSessions('u3', s2.sessionId);
    expect(revokedCount).toBe(2);

    expect(service.validateSession(s1.sessionId, 't1').isValid).toBe(false);
    expect(service.validateSession(s2.sessionId, 't2').isValid).toBe(true);
    expect(service.validateSession(s3.sessionId, 't3').isValid).toBe(false);
  });
});
