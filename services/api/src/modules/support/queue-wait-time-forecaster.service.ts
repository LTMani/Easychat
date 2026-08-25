import { Injectable, Logger } from '@nestjs/common';

export interface ErlangCQueueMetrics {
  queueName: string;
  activeAgentsCount: number;
  inboundCallRatePerHour: number;
  averageHandleTimeSeconds: number;
  trafficIntensityErlangs: number;
  probabilityOfWaitingPercent: number;
  averageWaitTimeSeconds: number;
  serviceLevel80_20Achieved: boolean;
  recommendedAgentStaffing: number;
}

@Injectable()
export class QueueWaitTimeForecasterService {
  private readonly logger = new Logger(QueueWaitTimeForecasterService.name);

  calculateErlangC(
    queueName: string,
    agents: number = 8,
    arrivalRatePerHour: number = 120,
    ahtSeconds: number = 180,
  ): ErlangCQueueMetrics {
    this.logger.debug(`Calculating Erlang C queue forecast for '${queueName}' with ${agents} agents`);

    // Traffic intensity A = (arrivalRate * aht) / 3600
    const A = (arrivalRatePerHour * ahtSeconds) / 3600;

    // Erlang C approximation
    let sum = 0;
    for (let k = 0; k < agents; k++) {
      let fact = 1;
      for (let i = 1; i <= k; i++) fact *= i;
      sum += Math.pow(A, k) / fact;
    }

    let factN = 1;
    for (let i = 1; i <= agents; i++) factN *= i;
    const termN = Math.pow(A, agents) / (factN * (1 - A / agents));

    const pw = termN / (sum + termN);
    const probWait = Math.max(0, Math.min(100, parseFloat((pw * 100).toFixed(1))));

    // Average speed of answer (ASA)
    const asa = (pw * ahtSeconds) / (agents - A);
    const avgWait = Math.max(0, parseFloat(asa.toFixed(1)));

    return {
      queueName,
      activeAgentsCount: agents,
      inboundCallRatePerHour: arrivalRatePerHour,
      averageHandleTimeSeconds: ahtSeconds,
      trafficIntensityErlangs: parseFloat(A.toFixed(2)),
      probabilityOfWaitingPercent: probWait,
      averageWaitTimeSeconds: avgWait,
      serviceLevel80_20Achieved: avgWait <= 20 && probWait <= 20,
      recommendedAgentStaffing: Math.ceil(A + 2), // +2 safety buffer
    };
  }
}
