export interface PivotQueryParams {
  entity: 'deal' | 'contact' | 'ticket' | 'conversation';
  rowDimensions: string[];
  columnDimension?: string;
  metricField: string;
  aggregationType: 'SUM' | 'COUNT' | 'AVG' | 'MIN' | 'MAX';
  from?: string;
  to?: string;
}

export interface FunnelMetricItem {
  stage: string;
  count: number;
  conversionRate: string;
  dropOffRate: string;
  pipelineValue: number;
}

export class AnalyticsResource {
  constructor(private readonly fetcher: (path: string, options?: RequestInit) => Promise<any>) {}

  async getPivotTable(params: PivotQueryParams): Promise<any> {
    return this.fetcher('/v1/analytics/pivot', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async getLeadFunnel(): Promise<{ stages: FunnelMetricItem[]; totalInbound: number; closedWonCount: number }> {
    return this.fetcher('/v1/analytics/funnel');
  }

  async getAgentLeaderboard(limit?: number): Promise<{ data: Array<{ agentId: string; name: string; ticketsClosed: number; csatScore: number; avgResponseTime: number }> }> {
    const query = limit ? `?limit=${limit}` : '';
    return this.fetcher(`/v1/analytics/agent-leaderboard${query}`);
  }

  async getGeographicDistribution(): Promise<{ byRegion: Record<string, number>; byCountry: Array<{ country: string; contacts: number; revenue: number }> }> {
    return this.fetcher('/v1/analytics/geographic');
  }
}
