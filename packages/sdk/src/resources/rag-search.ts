import { EasyChatHttpClient } from '../client';

export class RagSearchResource {
  constructor(private readonly client: EasyChatHttpClient) {}

  async searchHybrid(query: string, alpha?: number) {
    return this.client.request('/v1/ai/rag/search', {
      method: 'POST',
      body: JSON.stringify({ query, alpha }),
    });
  }

  async chunkDocument(title: string, content: string, chunkSize?: number, overlap?: number) {
    return this.client.request('/v1/ai/rag/chunk', {
      method: 'POST',
      body: JSON.stringify({ title, content, chunkSize, overlap }),
    });
  }
}
