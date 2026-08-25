import { EasyChatHttpClient } from '../client/http-client';
import { BpmnProcessDefinitionDto } from '@easychat/shared';

export class BpmnEngineClient {
  constructor(private readonly http: EasyChatHttpClient) {}

  async listProcesses(): Promise<BpmnProcessDefinitionDto[]> {
    const res = await this.http.get<{ status: string; data: BpmnProcessDefinitionDto[] }>('/v1/workflow/bpmn/processes');
    return res.data;
  }

  async startProcess(processId: string, variables: Record<string, any>): Promise<any> {
    const res = await this.http.post<{ status: string; data: any }>(`/v1/workflow/bpmn/processes/${processId}/start`, { variables });
    return res.data;
  }

  async getInstance(instanceId: string): Promise<any> {
    const res = await this.http.get<{ status: string; data: any }>(`/v1/workflow/bpmn/instances/${instanceId}`);
    return res.data;
  }
}
