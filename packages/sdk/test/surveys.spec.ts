import { SurveysResource } from '../src/resources/surveys';
import { EasyChatHttpClient } from '../src/client';

describe('SurveysResource SDK', () => {
  let client: EasyChatHttpClient;
  let resource: SurveysResource;

  beforeEach(() => {
    client = new EasyChatHttpClient({ apiKey: 'test_key', baseUrl: 'http://localhost:4000' });
    resource = new SurveysResource(client);
  });

  it('should instantiate surveys methods', () => {
    expect(resource.submitNps).toBeDefined();
    expect(resource.getAggregateNps).toBeDefined();
    expect(resource.evaluateChurnRisk).toBeDefined();
  });
});
