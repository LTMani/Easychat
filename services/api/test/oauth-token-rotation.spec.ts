import { Test, TestingModule } from '@nestjs/testing';
import { OAuthTokenRotationService } from '../src/modules/security/oauth-token-rotation.service';

describe('OAuthTokenRotationService', () => {
  let service: OAuthTokenRotationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OAuthTokenRotationService],
    }).compile();
    service = module.get<OAuthTokenRotationService>(OAuthTokenRotationService);
  });

  it('should generate valid OAuth token pair with expiration', () => {
    const pair = service.generateTokenPair('user_1', 3600);
    expect(pair.accessToken).toBeDefined();
    expect(pair.refreshToken).toBeDefined();
    expect(pair.tokenType).toBe('Bearer');
    expect(pair.expiresInSeconds).toBe(3600);
  });

  it('should rotate valid refresh token into a new pair', () => {
    const initialPair = service.generateTokenPair('user_2', 3600);
    const rotatedPair = service.rotateRefreshToken('user_2', initialPair.refreshToken);

    expect(rotatedPair).not.toBeNull();
    expect(rotatedPair?.accessToken).not.toBe(initialPair.accessToken);
    expect(rotatedPair?.refreshToken).not.toBe(initialPair.refreshToken);
  });

  it('should reject reused or stolen refresh token', () => {
    const initialPair = service.generateTokenPair('user_3', 3600);
    service.rotateRefreshToken('user_3', initialPair.refreshToken); // First rotation consumes it

    // Attempt replay of old token
    const replayAttempt = service.rotateRefreshToken('user_3', initialPair.refreshToken);
    expect(replayAttempt).toBeNull();
  });
});
