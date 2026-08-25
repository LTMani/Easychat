export interface MockChatMessage {
  id: string;
  conversationId: string;
  senderRole: 'CUSTOMER' | 'AGENT' | 'SYSTEM' | 'AI_BOT';
  senderName: string;
  channel: 'EMAIL' | 'WHATSAPP' | 'LIVE_CHAT' | 'SMS';
  messageText: string;
  timestamp: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'URGENT';
}

export const MOCK_OMNICHANNEL_MESSAGES: MockChatMessage[] = [
  { id: 'msg_01', conversationId: 'conv_101', senderRole: 'CUSTOMER', senderName: 'Jonathan Vance', channel: 'LIVE_CHAT', messageText: 'Hi team! We need to provision 50 additional Enterprise seats for our Singapore office expansion.', timestamp: '2026-08-25 14:10:00', sentiment: 'POSITIVE' },
  { id: 'msg_02', conversationId: 'conv_101', senderRole: 'AGENT', senderName: 'Sarah Jenkins', channel: 'LIVE_CHAT', messageText: 'Hello Jonathan! Delighted to assist. I can apply your existing volume discount tier to the additional seats immediately.', timestamp: '2026-08-25 14:11:15', sentiment: 'POSITIVE' },
  { id: 'msg_03', conversationId: 'conv_102', senderRole: 'CUSTOMER', senderName: 'Kathrin Mueller', channel: 'WHATSAPP', messageText: 'Guten Tag, our billing department requires the formal signed MSA before initiating wire transfer.', timestamp: '2026-08-25 13:45:00', sentiment: 'NEUTRAL' },
  { id: 'msg_04', conversationId: 'conv_102', senderRole: 'AGENT', senderName: 'Priya Sharma', channel: 'WHATSAPP', messageText: 'Hallo Frau Mueller! I have resent the fully executed contract certificate (PDF) to your accounting email.', timestamp: '2026-08-25 13:48:30', sentiment: 'POSITIVE' },
  { id: 'msg_05', conversationId: 'conv_103', senderRole: 'CUSTOMER', senderName: 'Marcus Aurelius', channel: 'EMAIL', messageText: 'Urgent: Our Okta SAML certificate expires in 48 hours. Can an engineer verify our new metadata XML file?', timestamp: '2026-08-25 12:30:00', sentiment: 'URGENT' },
  { id: 'msg_06', conversationId: 'conv_103', senderRole: 'AGENT', senderName: 'Alex Mercer', channel: 'EMAIL', messageText: 'Hi Marcus, I have loaded and verified your updated Okta X.509 certificate on our staging cluster. Ready to switch over.', timestamp: '2026-08-25 12:42:00', sentiment: 'POSITIVE' },
  { id: 'msg_07', conversationId: 'conv_104', senderRole: 'CUSTOMER', senderName: 'Oliver Smith', channel: 'SMS', messageText: 'Confirmation received, thank you for the fast response.', timestamp: '2026-08-25 11:15:00', sentiment: 'POSITIVE' },
];
