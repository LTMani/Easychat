import { EasyChatHttpClient } from '../client/http-client';
import { TaxJurisdictionRuleDto, TaxCalculationResultDto } from '@easychat/shared';

export class TaxNexusClient {
  constructor(private readonly http: EasyChatHttpClient) {}

  async listRules(): Promise<TaxJurisdictionRuleDto[]> {
    const res = await this.http.get<{ status: string; data: TaxJurisdictionRuleDto[] }>('/v1/billing/tax-nexus/rules');
    return res.data;
  }

  async calculateTax(params: { subtotalUsd: number; countryCode: string; stateOrRegion?: string; customerVatNumber?: string }): Promise<TaxCalculationResultDto> {
    const res = await this.http.post<{ status: string; data: TaxCalculationResultDto }>('/v1/billing/tax-nexus/calculate', params);
    return res.data;
  }
}
