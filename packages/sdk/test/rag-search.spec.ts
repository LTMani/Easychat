import { RagSearchResource } from '../src/resources/rag-search';
import { EasyChatHttpClient } from '../src/client';

describe('RagSearchResource SDK', () => {
  let client: EasyChatHttpClient;
  let resource: RagSearchResource;

  beforeEach(() => {
    client = new EasyChatHttpClient({ apiKey: 'test_key', baseUrl: 'http://localhost:4000' });
    resource = new RagSearchResource(client);
  });

  it('should instantiate RAG search methods', () => {
    expect(resource.searchHybrid).toBeDefined();
    expect(resource.chunkDocument).toBeDefined();
  });
});
