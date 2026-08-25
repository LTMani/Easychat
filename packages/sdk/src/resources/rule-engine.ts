import { EasyChatHttpClient } from '../client';

export class RuleEngineResource {
  constructor(private readonly client: EasyChatHttpClient) {}

  async evaluateRule(ruleGroup: Record<string, any>, contextData: Record<string, any>) {
    return this.client.request('/v1/automation/rules/evaluate', {
      method: 'POST',
      body: JSON.stringify({ ruleGroup, contextData }),
    });
  }

  async renderTemplate(rawTemplate: string, variables: Record<string, any>, fallbackDefaults?: Record<string, string>) {
    return this.client.request('/v1/automation/rules/templates/render', {
      method: 'POST',
      body: JSON.stringify({ rawTemplate, variables, fallbackDefaults }),
    });
  }
}
