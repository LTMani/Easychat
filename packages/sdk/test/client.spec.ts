import { EasyChatClient } from '../src/index';

describe('EasyChat Client SDK', () => {
  it('should instantiate all module endpoints correctly', () => {
    const client = new EasyChatClient({ baseUrl: 'http://localhost:4000/api/v1' });
    expect(client.conversations).toBeDefined();
    expect(client.crm).toBeDefined();
    expect(client.support).toBeDefined();
    expect(client.automation).toBeDefined();
    expect(client.analytics).toBeDefined();
    expect(client.ai).toBeDefined();
    expect(client.platform).toBeDefined();
  });

  it('should set access token dynamically', () => {
    const client = new EasyChatClient();
    client.setAccessToken('mock-jwt-token-xyz');
    // @ts-ignore
    expect(client.http['accessToken']).toBe('mock-jwt-token-xyz');
  });
});
