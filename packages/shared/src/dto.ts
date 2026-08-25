import { z } from 'zod';
import {
  SystemRole,
  ConversationType,
  MessageType,
  PresenceStatus,
  LeadStatus,
  LeadSource,
  DealStatus,
  ActivityType,
} from './enums';

export const RegisterSchema = z.object({
  email: z.string().email({ message: 'Invalid email address format' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  organizationName: z.string().min(2, { message: 'Organization name must be at least 2 characters' }),
});
export type RegisterDto = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
  twoFactorCode: z.string().optional(),
});
export type LoginDto = z.infer<typeof LoginSchema>;

export const RefreshTokenSchema = z.object({
  refreshToken: z.string().min(1, { message: 'Refresh token is required' }),
});
export type RefreshTokenDto = z.infer<typeof RefreshTokenSchema>;

export const InviteMemberSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  role: z.nativeEnum(SystemRole),
  teamIds: z.array(z.string()).optional(),
});
export type InviteMemberDto = z.infer<typeof InviteMemberSchema>;

export const CreateTeamSchema = z.object({
  name: z.string().min(2, { message: 'Team name must be at least 2 characters' }),
  description: z.string().optional(),
});
export type CreateTeamDto = z.infer<typeof CreateTeamSchema>;

export const UpdateRoleSchema = z.object({
  memberId: z.string().uuid(),
  role: z.nativeEnum(SystemRole),
});
export type UpdateRoleDto = z.infer<typeof UpdateRoleSchema>;

export const CreateConversationSchema = z.object({
  type: z.nativeEnum(ConversationType),
  title: z.string().optional(),
  description: z.string().optional(),
  participantUserIds: z.array(z.string().uuid()).min(1, { message: 'At least one participant is required' }),
});
export type CreateConversationDto = z.infer<typeof CreateConversationSchema>;

export const SendMessageSchema = z.object({
  conversationId: z.string().uuid(),
  content: z.string().min(1, { message: 'Message content cannot be empty' }),
  type: z.nativeEnum(MessageType).optional().default(MessageType.TEXT),
  replyToId: z.string().uuid().optional(),
  attachments: z.array(z.object({
    fileName: z.string(),
    fileUrl: z.string(),
    fileSize: z.number(),
    mimeType: z.string(),
  })).optional(),
});
export type SendMessageDto = z.infer<typeof SendMessageSchema>;

export const CreateCompanySchema = z.object({
  name: z.string().min(1, { message: 'Company name is required' }),
  domain: z.string().optional(),
  industry: z.string().optional(),
  employeeCount: z.number().optional(),
  annualRevenue: z.number().optional(),
  website: z.string().optional(),
});
export type CreateCompanyDto = z.infer<typeof CreateCompanySchema>;

export const CreateContactSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  companyId: z.string().uuid().optional(),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  tags: z.array(z.string()).optional(),
});
export type CreateContactDto = z.infer<typeof CreateContactSchema>;

export const CreateLeadSchema = z.object({
  title: z.string().min(1, { message: 'Lead title is required' }),
  contactName: z.string().min(1, { message: 'Contact name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().optional(),
  source: z.nativeEnum(LeadSource).optional().default(LeadSource.WEBSITE),
  score: z.number().optional().default(0),
  assignedToId: z.string().uuid().optional(),
  companyId: z.string().uuid().optional(),
});
export type CreateLeadDto = z.infer<typeof CreateLeadSchema>;

export const CreateDealSchema = z.object({
  pipelineId: z.string().uuid(),
  stageId: z.string().uuid(),
  title: z.string().min(1, { message: 'Deal title is required' }),
  amount: z.number().min(0, { message: 'Amount must be positive' }),
  currency: z.string().optional().default('USD'),
  contactId: z.string().uuid().optional(),
  companyId: z.string().uuid().optional(),
  assignedToId: z.string().uuid().optional(),
  expectedCloseDate: z.string().optional(),
});
export type CreateDealDto = z.infer<typeof CreateDealSchema>;

export const UpdateDealStageSchema = z.object({
  stageId: z.string().uuid(),
  status: z.nativeEnum(DealStatus).optional(),
  winLossReason: z.string().optional(),
});
export type UpdateDealStageDto = z.infer<typeof UpdateDealStageSchema>;

export const CreateActivitySchema = z.object({
  type: z.nativeEnum(ActivityType),
  title: z.string().min(1, { message: 'Activity title is required' }),
  notes: z.string().optional(),
  contactId: z.string().uuid().optional(),
  dealId: z.string().uuid().optional(),
  dueAt: z.string().optional(),
});
export type CreateActivityDto = z.infer<typeof CreateActivitySchema>;
