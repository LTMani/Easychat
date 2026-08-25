import { z } from 'zod';
import {
  SystemRole,
  LeadStatus,
  LeadSource,
  DealStatus,
  ActivityType,
  TaskStatus,
  TicketPriority,
  TicketStatus,
  WorkflowTriggerType,
  WorkflowActionType,
  CustomFieldDataType,
  SubscriptionBillingCycle,
  QueueRoutingStrategy,
} from './enums';

// ==========================================
// AUTH & USER DTOS
// ==========================================

export const RegisterDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  organizationName: z.string().min(1).optional(),
});

export type RegisterDto = z.infer<typeof RegisterDtoSchema>;

export const LoginDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginDto = z.infer<typeof LoginDtoSchema>;

export const RefreshTokenDtoSchema = z.object({
  refreshToken: z.string().min(1),
});

export type RefreshTokenDto = z.infer<typeof RefreshTokenDtoSchema>;

export const ChangePasswordDtoSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

export type ChangePasswordDto = z.infer<typeof ChangePasswordDtoSchema>;

// ==========================================
// ORGANIZATION & TEAM DTOS
// ==========================================

export const CreateOrganizationDtoSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(2),
  logoUrl: z.string().url().optional(),
  currency: z.string().default('USD'),
  timezone: z.string().default('UTC'),
});

export type CreateOrganizationDto = z.infer<typeof CreateOrganizationDtoSchema>;

export const InviteMemberDtoSchema = z.object({
  email: z.string().email(),
  role: z.nativeEnum(SystemRole).default(SystemRole.MEMBER),
  teamIds: z.array(z.string().uuid()).optional(),
});

export type InviteMemberDto = z.infer<typeof InviteMemberDtoSchema>;

export const UpdateRoleDtoSchema = z.object({
  role: z.nativeEnum(SystemRole),
});

export type UpdateRoleDto = z.infer<typeof UpdateRoleDtoSchema>;

export const CreateTeamDtoSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  leadUserId: z.string().uuid().optional(),
});

export type CreateTeamDto = z.infer<typeof CreateTeamDtoSchema>;

// ==========================================
// CRM & CUSTOMER 360 DTOS
// ==========================================

export const CreateContactDtoSchema = z.object({
  companyId: z.string().uuid().optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export type CreateContactDto = z.infer<typeof CreateContactDtoSchema>;

export const CreateCompanyDtoSchema = z.object({
  name: z.string().min(1),
  domain: z.string().optional(),
  industry: z.string().optional(),
  employeeCount: z.number().int().optional(),
  annualRevenue: z.number().optional(),
  website: z.string().optional(),
});

export type CreateCompanyDto = z.infer<typeof CreateCompanyDtoSchema>;

export const CreateLeadDtoSchema = z.object({
  companyId: z.string().uuid().optional(),
  title: z.string().min(1),
  contactName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  source: z.nativeEnum(LeadSource).default(LeadSource.WEBSITE),
  status: z.nativeEnum(LeadStatus).default(LeadStatus.NEW),
  score: z.number().int().default(0),
  assignedToId: z.string().uuid().optional(),
});

export type CreateLeadDto = z.infer<typeof CreateLeadDtoSchema>;

export const CreateDealDtoSchema = z.object({
  pipelineId: z.string().uuid(),
  stageId: z.string().uuid(),
  contactId: z.string().uuid().optional(),
  companyId: z.string().uuid().optional(),
  assignedToId: z.string().uuid().optional(),
  title: z.string().min(1),
  amount: z.number().positive(),
  currency: z.string().default('USD'),
  expectedCloseDate: z.string().optional(),
});

export type CreateDealDto = z.infer<typeof CreateDealDtoSchema>;

export const UpdateDealStageDtoSchema = z.object({
  stageId: z.string().uuid(),
  status: z.nativeEnum(DealStatus).optional(),
  winLossReason: z.string().optional(),
});

export type UpdateDealStageDto = z.infer<typeof UpdateDealStageDtoSchema>;

export const CreateQuoteDtoSchema = z.object({
  dealId: z.string().uuid(),
  validUntil: z.string(),
  notes: z.string().optional(),
  lineItems: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().int().positive(),
      unitPrice: z.number().positive(),
      discount: z.number().default(0),
    })
  ),
});

export type CreateQuoteDto = z.infer<typeof CreateQuoteDtoSchema>;

export const CreateTaskDtoSchema = z.object({
  contactId: z.string().uuid().optional(),
  dealId: z.string().uuid().optional(),
  assignedToId: z.string().uuid().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  dueAt: z.string().optional(),
  priority: z.string().default('MEDIUM'),
});

export type CreateTaskDto = z.infer<typeof CreateTaskDtoSchema>;

export const UpdateTaskStatusDtoSchema = z.object({
  status: z.nativeEnum(TaskStatus),
});

export type UpdateTaskStatusDto = z.infer<typeof UpdateTaskStatusDtoSchema>;

export const CreateCustomerDocumentDtoSchema = z.object({
  contactId: z.string().uuid().optional(),
  companyId: z.string().uuid().optional(),
  fileName: z.string().min(1),
  fileUrl: z.string().url(),
  fileSize: z.number().int().positive(),
  mimeType: z.string().min(1),
});

export type CreateCustomerDocumentDto = z.infer<typeof CreateCustomerDocumentDtoSchema>;

export const LinkConversationCrmDtoSchema = z.object({
  conversationId: z.string().uuid().optional(),
  contactId: z.string().uuid().optional(),
  dealId: z.string().uuid().optional(),
});

export type LinkConversationCrmDto = z.infer<typeof LinkConversationCrmDtoSchema>;

// ==========================================
// CONVERSATIONS & CHANNELS DTOS
// ==========================================

export const CreateConversationDtoSchema = z.object({
  channelId: z.string().uuid().optional(),
  contactId: z.string().uuid().optional(),
  dealId: z.string().uuid().optional(),
  type: z.string().default('DIRECT'),
  title: z.string().optional(),
  description: z.string().optional(),
  initialMessage: z.string().optional(),
  participantUserIds: z.array(z.string().uuid()).optional(),
});

export type CreateConversationDto = z.infer<typeof CreateConversationDtoSchema>;

export const SendMessageDtoSchema = z.object({
  conversationId: z.string().uuid(),
  content: z.string().min(1),
  type: z.string().default('TEXT'),
  replyToId: z.string().uuid().optional(),
  attachments: z
    .array(
      z.object({
        fileName: z.string(),
        fileUrl: z.string(),
        fileSize: z.number(),
        mimeType: z.string(),
      })
    )
    .optional(),
});

export type SendMessageDto = z.infer<typeof SendMessageDtoSchema>;

export const CreateCannedResponseDtoSchema = z.object({
  shortcut: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
  category: z.string().default('GENERAL'),
});

export type CreateCannedResponseDto = z.infer<typeof CreateCannedResponseDtoSchema>;

// ==========================================
// SLA & TICKET ENGINE DTOS
// ==========================================

export const CreateSlaPolicyDtoSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  priority: z.nativeEnum(TicketPriority).default(TicketPriority.MEDIUM),
  firstResponseMinutes: z.number().int().positive().default(60),
  nextResponseMinutes: z.number().int().positive().default(120),
  resolutionMinutes: z.number().int().positive().default(480),
  isDefault: z.boolean().default(false),
});

export type CreateSlaPolicyDto = z.infer<typeof CreateSlaPolicyDtoSchema>;

export const CreateTicketQueueDtoSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  teamId: z.string().uuid().optional(),
  strategy: z.nativeEnum(QueueRoutingStrategy).default(QueueRoutingStrategy.ROUND_ROBIN),
  memberIds: z.array(z.string().uuid()).default([]),
});

export type CreateTicketQueueDto = z.infer<typeof CreateTicketQueueDtoSchema>;

export const CreateTicketDtoSchema = z.object({
  subject: z.string().min(1),
  description: z.string().min(1),
  priority: z.nativeEnum(TicketPriority).default(TicketPriority.MEDIUM),
  category: z.string().default('GENERAL'),
  contactId: z.string().uuid().optional(),
  conversationId: z.string().uuid().optional(),
  teamId: z.string().uuid().optional(),
  queueId: z.string().uuid().optional(),
  assignedToId: z.string().uuid().optional(),
  slaPolicyId: z.string().uuid().optional(),
});

export type CreateTicketDto = z.infer<typeof CreateTicketDtoSchema>;

export const UpdateTicketStatusDtoSchema = z.object({
  status: z.nativeEnum(TicketStatus),
  assignedToId: z.string().uuid().optional(),
});

export type UpdateTicketStatusDto = z.infer<typeof UpdateTicketStatusDtoSchema>;

export const AddTicketCommentDtoSchema = z.object({
  ticketId: z.string().uuid().optional(),
  content: z.string().min(1),
  isInternal: z.boolean().default(false),
  attachments: z.array(z.string()).default([]),
});

export type AddTicketCommentDto = z.infer<typeof AddTicketCommentDtoSchema>;

export const CreateKnowledgeArticleDtoSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().min(1),
  content: z.string().min(1),
  isPublished: z.boolean().default(true),
});

export type CreateKnowledgeArticleDto = z.infer<typeof CreateKnowledgeArticleDtoSchema>;

export const SubmitCsatDtoSchema = z.object({
  surveyId: z.string().uuid(),
  ticketId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  feedback: z.string().optional(),
});

export type SubmitCsatDto = z.infer<typeof SubmitCsatDtoSchema>;

// ==========================================
// BILLING, PLATFORM & CUSTOM FIELDS DTOS
// ==========================================

export const CreateSubscriptionDtoSchema = z.object({
  planCode: z.string().min(1),
  billingCycle: z.nativeEnum(SubscriptionBillingCycle).default(SubscriptionBillingCycle.MONTHLY),
  paymentMethodToken: z.string().optional(),
});

export type CreateSubscriptionDto = z.infer<typeof CreateSubscriptionDtoSchema>;

export const CreateApiKeyDtoSchema = z.object({
  name: z.string().min(1),
  permissions: z.array(z.string()).default([]),
  expiresInDays: z.number().optional(),
});

export type CreateApiKeyDto = z.infer<typeof CreateApiKeyDtoSchema>;

export const CreateWebhookEndpointDtoSchema = z.object({
  url: z.string().url(),
  events: z.array(z.string()).default([]),
});

export type CreateWebhookEndpointDto = z.infer<typeof CreateWebhookEndpointDtoSchema>;

export const CreateCustomFieldDtoSchema = z.object({
  entityType: z.string().min(1),
  fieldKey: z.string().min(1),
  label: z.string().min(1),
  dataType: z.nativeEnum(CustomFieldDataType).default(CustomFieldDataType.STRING),
  isRequired: z.boolean().default(false),
  options: z.array(z.string()).default([]),
});

export type CreateCustomFieldDto = z.infer<typeof CreateCustomFieldDtoSchema>;

// ==========================================
// WORKFLOW & AI DTOS
// ==========================================

export const CreateWorkflowRuleDtoSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  triggerType: z.nativeEnum(WorkflowTriggerType),
  actionType: z.nativeEnum(WorkflowActionType),
  config: z.record(z.any()).default({}),
  nodes: z
    .array(
      z.object({
        id: z.string(),
        nodeType: z.string(),
        label: z.string(),
        positionX: z.number(),
        positionY: z.number(),
        config: z.record(z.any()),
      })
    )
    .optional(),
  edges: z
    .array(
      z.object({
        id: z.string(),
        sourceNodeId: z.string(),
        targetNodeId: z.string(),
        label: z.string().optional(),
      })
    )
    .optional(),
});

export type CreateWorkflowRuleDto = z.infer<typeof CreateWorkflowRuleDtoSchema>;

export const CreateAiPromptDtoSchema = z.object({
  name: z.string().min(1),
  purpose: z.string().default('SUMMARIZATION'),
  promptText: z.string().min(1),
  temperature: z.number().min(0).max(2).default(0.7),
  modelName: z.string().default('gpt-4-turbo'),
});

export type CreateAiPromptDto = z.infer<typeof CreateAiPromptDtoSchema>;

export const GenerateAiSummaryDtoSchema = z.object({
  conversationId: z.string().uuid().optional(),
  text: z.string().optional(),
});

export type GenerateAiSummaryDto = z.infer<typeof GenerateAiSummaryDtoSchema>;
