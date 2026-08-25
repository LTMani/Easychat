import { EasyChatHttpClient } from '../client/http-client';
import { MonteCarloForecastResultDto } from '@easychat/shared';

export class MonteCarloClient {
  constructor(private readonly http: EasyChatHttpClient) {}

  async getForecast(iterations: number = 1000): Promise<MonteCarloForecastResultDto> {
    const res = await this.http.get<{ status: string; data: MonteCarloForecastResultDto }>(`/v1/crm/forecast/monte-carlo?iterations=${iterations}`);
    return res.data;
  }
}
