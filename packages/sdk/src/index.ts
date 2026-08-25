import { EasyChatHttpClient, EasyChatSdkConfig } from './client';
import { ConversationsModule } from './conversations';
import { CrmModule } from './crm';
import { SupportModule } from './support';
import { AutomationModule } from './automation';
import { AnalyticsModule } from './analytics';
import { AiModule } from './ai';
import { PlatformModule } from './platform';

export class EasyChatClient {
  public http: EasyChatHttpClient;
  public conversations: ConversationsModule;
  public crm: CrmModule;
  public support: SupportModule;
  public automation: AutomationModule;
  public analytics: AnalyticsModule;
  public ai: AiModule;
  public platform: PlatformModule;

  constructor(config: EasyChatSdkConfig = {}) {
    this.http = new EasyChatHttpClient(config);
    this.conversations = new ConversationsModule(this.http);
    this.crm = new CrmModule(this.http);
    this.support = new SupportModule(this.http);
    this.automation = new AutomationModule(this.http);
    this.analytics = new AnalyticsModule(this.http);
    this.ai = new AiModule(this.http);
    this.platform = new PlatformModule(this.http);
  }

  public setAccessToken(token: string) {
    this.http.setAccessToken(token);
  }

  public setApiKey(key: string) {
    this.http.setApiKey(key);
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
