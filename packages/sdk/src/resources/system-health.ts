import { EasyChatHttpClient } from '../client';

export class SystemHealthResource {
  constructor(private readonly client: EasyChatHttpClient) {}

  async getRegionalHealth() {
    return this.client.request('/v1/system/health/regions');
  }

  async getDatabasePool() {
    return this.client.request('/v1/system/database/pool');
  }
}
