import { EasyChatHttpClient, EasyChatSdkConfig } from './client';
import { ConversationsModule } from './conversations';
import { CrmModule } from './crm';
import { SupportModule } from './support';
import { AutomationModule } from './automation';
import { AnalyticsModule } from './analytics';
import { AiModule } from './ai';
import { PlatformModule } from './platform';
import { SlaApi } from './sla';
import { BillingApi } from './billing';
import { WebhooksApi } from './webhooks';

import { CustomFieldsResource } from './resources/custom-fields';
import { AuditLogsResource } from './resources/audit-logs';
import { SlaResource } from './resources/sla';
import { IntegrationsResource } from './resources/integrations';
import { ContractsResource } from './resources/contracts';
import { AnalyticsResource } from './resources/analytics';
import { ProductsResource } from './resources/products';
import { QuotesResource } from './resources/quotes';
import { ChannelsResource } from './resources/channels';

export class EasyChatClient {
  public http: EasyChatHttpClient;
  public conversations: ConversationsModule;
  public crm: CrmModule;
  public support: SupportModule;
  public automation: AutomationModule;
  public analytics: AnalyticsModule;
  public ai: AiModule;
  public platform: PlatformModule;
  public sla: SlaApi;
  public billing: BillingApi;
  public webhooks: WebhooksApi;

  // Granular Sub-Resources
  public customFieldsResource: CustomFieldsResource;
  public auditLogsResource: AuditLogsResource;
  public slaResource: SlaResource;
  public integrationsResource: IntegrationsResource;
  public contractsResource: ContractsResource;
  public analyticsResource: AnalyticsResource;
  public productsResource: ProductsResource;
  public quotesResource: QuotesResource;
  public channelsResource: ChannelsResource;

  constructor(config: EasyChatSdkConfig = {}) {
    this.http = new EasyChatHttpClient(config);
    this.conversations = new ConversationsModule(this.http);
    this.crm = new CrmModule(this.http);
    this.support = new SupportModule(this.http);
    this.automation = new AutomationModule(this.http);
    this.analytics = new AnalyticsModule(this.http);
    this.ai = new AiModule(this.http);
    this.platform = new PlatformModule(this.http);
    this.sla = new SlaApi(this.http);
    this.billing = new BillingApi(this.http);
    this.webhooks = new WebhooksApi(this.http);

    const fetcher = (path: string, options?: RequestInit) => this.http.request(path, options as any);

    this.customFieldsResource = new CustomFieldsResource(fetcher);
    this.auditLogsResource = new AuditLogsResource(fetcher);
    this.slaResource = new SlaResource(fetcher);
    this.integrationsResource = new IntegrationsResource(fetcher);
    this.contractsResource = new ContractsResource(fetcher);
    this.analyticsResource = new AnalyticsResource(fetcher);
    this.productsResource = new ProductsResource(fetcher);
    this.quotesResource = new QuotesResource(fetcher);
    this.channelsResource = new ChannelsResource(fetcher);
  }

  public setAccessToken(token: string) {
    this.http.setAccessToken(token);
  }

  public setApiKey(key: string) {
    this.http.setApiKey(key);
  }

  public get(path: string) {
    return this.http.request(path, { method: 'GET' });
  }

  public post(path: string, body: any) {
    return this.http.request(path, { method: 'POST', body });
  }

  public put(path: string, body: any) {
    return this.http.request(path, { method: 'PUT', body });
  }

  public delete(path: string) {
    return this.http.request(path, { method: 'DELETE' });
  }
}

export * from './client';
export * from './conversations';
export * from './crm';
export * from './support';
export * from './automation';
export * from './analytics';
export * from './ai';
export * from './platform';
export * from './sla';
export * from './billing';
export * from './webhooks';

export * from './resources/custom-fields';
export * from './resources/audit-logs';
export * from './resources/sla';
export * from './resources/integrations';
export * from './resources/contracts';
export * from './resources/analytics';
export * from './resources/products';
export * from './resources/quotes';
export * from './resources/channels';
