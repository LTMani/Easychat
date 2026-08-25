import { Test, TestingModule } from '@nestjs/testing';
import { SalesforceEnterpriseConnectorService } from '../src/modules/integrations/salesforce-enterprise-connector.service';

describe('SalesforceEnterpriseConnectorService', () => {
  let service: SalesforceEnterpriseConnectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesforceEnterpriseConnectorService],
    }).compile();
    service = module.get<SalesforceEnterpriseConnectorService>(SalesforceEnterpriseConnectorService);
  });

  it('should return connector status and build valid SOQL queries', () => {
    const status = service.getConnectorStatus();
    expect(status.cdcActive).toBe(true);

    const soql = service.buildSoqlQuery({
      sObject: 'Opportunity',
      fields: ['Id', 'Name', 'Amount', 'StageName'],
      whereClause: "StageName = 'Closed Won'",
      limit: 10,
    });

    expect(soql).toBe("SELECT Id, Name, Amount, StageName FROM Opportunity WHERE StageName = 'Closed Won' LIMIT 10");
  });
});
