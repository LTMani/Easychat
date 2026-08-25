export interface MockIvrNode {
  nodeId: string;
  dtmfDigit: string;
  actionType: 'PLAY_AUDIO' | 'QUEUE_TRANSFER' | 'SUB_MENU' | 'AI_BOT_HANDOFF' | 'VOICEMAIL';
  audioPromptUrl?: string;
  promptText: string;
  targetQueue?: string;
  timeoutSeconds: number;
  subNodes?: MockIvrNode[];
}

export const ENTERPRISE_IVR_CALL_TREES: MockIvrNode[] = [
  {
    nodeId: 'ivr_root_main',
    dtmfDigit: '0',
    actionType: 'SUB_MENU',
    promptText: 'Thank you for calling EasyChat Global. For Sales, press 1. For Technical Support, press 2. For Billing and Invoices, press 3. To speak with our AI Copilot, press 4.',
    timeoutSeconds: 10,
    subNodes: [
      {
        nodeId: 'ivr_sales_tier',
        dtmfDigit: '1',
        actionType: 'QUEUE_TRANSFER',
        promptText: 'Connecting you to our enterprise sales engineering desk.',
        targetQueue: 'QUEUE_SALES_ENTERPRISE',
        timeoutSeconds: 30,
      },
      {
        nodeId: 'ivr_support_tier',
        dtmfDigit: '2',
        actionType: 'SUB_MENU',
        promptText: 'For urgent Priority 1 outages, press 1. For general inquiries, press 2.',
        timeoutSeconds: 8,
        subNodes: [
          {
            nodeId: 'ivr_support_p1',
            dtmfDigit: '1',
            actionType: 'QUEUE_TRANSFER',
            promptText: 'Connecting to 24/7 VIP Emergency Response Engineer.',
            targetQueue: 'QUEUE_SUPPORT_P1_CRITICAL',
            timeoutSeconds: 15,
          },
          {
            nodeId: 'ivr_support_general',
            dtmfDigit: '2',
            actionType: 'QUEUE_TRANSFER',
            promptText: 'Connecting to standard support queue.',
            targetQueue: 'QUEUE_SUPPORT_GENERAL',
            timeoutSeconds: 45,
          },
        ],
      },
      {
        nodeId: 'ivr_billing_tier',
        dtmfDigit: '3',
        actionType: 'QUEUE_TRANSFER',
        promptText: 'Transferring to Finance & Accounts Receivable.',
        targetQueue: 'QUEUE_FINANCE_BILLING',
        timeoutSeconds: 30,
      },
      {
        nodeId: 'ivr_ai_bot_tier',
        dtmfDigit: '4',
        actionType: 'AI_BOT_HANDOFF',
        promptText: 'Connecting you with our conversational AI Support Voicebot.',
        targetQueue: 'GATEWAY_AI_VOICE_STREAM',
        timeoutSeconds: 5,
      },
    ],
  },
];
