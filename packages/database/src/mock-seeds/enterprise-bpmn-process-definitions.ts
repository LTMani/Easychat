export interface MockBpmnProcessSeed {
  processKey: string;
  name: string;
  category: 'SALES_ONBOARDING' | 'SLA_INCIDENT_ESCALATION' | 'BILLING_DUNNING' | 'GDPR_DATA_LIFECYCLE';
  targetSlaMinutes: number;
  totalExecutionsLast30Days: number;
  successRatePercent: number;
  xmlBpmnPayload: string;
}

export const ENTERPRISE_BPMN_PROCESS_DEFINITIONS: MockBpmnProcessSeed[] = [
  {
    processKey: 'bpmn_sales_lead_v1',
    name: 'Enterprise Inbound Lead Triage and Account Assignment',
    category: 'SALES_ONBOARDING',
    targetSlaMinutes: 15,
    totalExecutionsLast30Days: 4890,
    successRatePercent: 99.4,
    xmlBpmnPayload: `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" id="Definitions_1">
  <bpmn:process id="Process_Lead_Triage" isExecutable="true">
    <bpmn:startEvent id="Start_InboundLead" name="Form Submitted" />
    <bpmn:serviceTask id="Task_ClearbitEnrich" name="Firmographic Enrichment" />
    <bpmn:exclusiveGateway id="Gateway_VipCheck" name="Deal >= $50k?" />
    <bpmn:serviceTask id="Task_AssignVp" name="Assign VP of Sales" />
    <bpmn:serviceTask id="Task_RoundRobinSdr" name="Round-Robin SDR Pool" />
    <bpmn:endEvent id="End_LeadProvisioned" name="Lead Ready" />
  </bpmn:process>
</bpmn:definitions>`,
  },
  {
    processKey: 'bpmn_p1_incident_v1',
    name: 'Priority 1 Outage Automated Incident Response & PagerDuty Paging',
    category: 'SLA_INCIDENT_ESCALATION',
    targetSlaMinutes: 5,
    totalExecutionsLast30Days: 12,
    successRatePercent: 100.0,
    xmlBpmnPayload: `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" id="Definitions_2">
  <bpmn:process id="Process_P1_Incident" isExecutable="true">
    <bpmn:startEvent id="Start_P1BreachAlert" name="Synthetic Monitor Failure" />
    <bpmn:serviceTask id="Task_PageOnCallLead" name="Trigger PagerDuty High Urgency Alert" />
    <bpmn:serviceTask id="Task_AssembleWarRoom" name="Create Zoom Incident Bridge & Slack Channel" />
    <bpmn:userTask id="Task_IncidentCommanderTriage" name="Root Cause Mitigation" />
    <bpmn:serviceTask id="Task_BroadcastStatusPage" name="Update StatusPage to Degraded Performance" />
    <bpmn:endEvent id="End_IncidentResolved" name="All Systems Operational" />
  </bpmn:process>
</bpmn:definitions>`,
  },
  {
    processKey: 'bpmn_dunning_retry_v1',
    name: 'Smart Dunning Retries & Subscription Downgrade Protection',
    category: 'BILLING_DUNNING',
    targetSlaMinutes: 1440,
    totalExecutionsLast30Days: 142,
    successRatePercent: 94.8,
    xmlBpmnPayload: `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" id="Definitions_3">
  <bpmn:process id="Process_Dunning" isExecutable="true">
    <bpmn:startEvent id="Start_InvoiceFailed" name="Stripe Charge Failed" />
    <bpmn:serviceTask id="Task_SendGraceEmail" name="Send 7-Day Grace Period Notice" />
    <bpmn:intermediateCatchEvent id="Timer_3Days" name="Wait 3 Days" />
    <bpmn:serviceTask id="Task_SmartRetry" name="Smart ML Card Retry" />
    <bpmn:exclusiveGateway id="Gateway_PaymentSuccess" name="Payment Succeeded?" />
    <bpmn:endEvent id="End_SubscriptionRestored" name="Subscription Active" />
  </bpmn:process>
</bpmn:definitions>`,
  },
];
