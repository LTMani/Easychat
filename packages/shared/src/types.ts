import {
  SystemRole,
  Permission,
  MemberStatus,
  ConversationType,
  MessageType,
  NotificationType,
  PresenceStatus,
  LeadStatus,
  LeadSource,
  DealStatus,
  ActivityType,
} from './enums';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    details?: any;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface UserSessionPayload {
  userId: string;
  email: string;
  organizationId?: string;
  roles: SystemRole[];
  permissions: Permission[];
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationInfo {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  createdAt: string;
}

export interface TeamInfo {
  id: string;
  organizationId: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface OrganizationMemberInfo {
  id: string;
  organizationId: string;
  userId: string;
  role: SystemRole;
  status: MemberStatus;
  user: UserProfile;
  createdAt: string;
}

export interface ConversationPayload {
  id: string;
  organizationId: string;
  type: ConversationType;
  title?: string;
  description?: string;
  createdById: string;
  lastMessageAt: string;
  createdAt: string;
  participants: {
    id: string;
    userId: string;
    role: string;
    user: UserProfile;
  }[];
  lastMessage?: MessagePayload;
  unreadCount?: number;
}

export interface MessageAttachmentPayload {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
}

export interface MessagePayload {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: MessageType;
  replyToId?: string;
  isEdited: boolean;
  createdAt: string;
  sender: UserProfile;
  attachments?: MessageAttachmentPayload[];
}

export interface NotificationPayload {
  id: string;
  organizationId: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface PresencePayload {
  userId: string;
  status: PresenceStatus;
  customStatus?: string;
  lastActiveAt: string;
}

export interface CompanyPayload {
  id: string;
  organizationId: string;
  name: string;
  domain?: string;
  industry?: string;
  employeeCount?: number;
  annualRevenue?: number;
  website?: string;
  createdAt: string;
}

export interface ContactPayload {
  id: string;
  organizationId: string;
  companyId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  tags: string[];
  company?: CompanyPayload;
  createdAt: string;
}

export interface LeadPayload {
  id: string;
  organizationId: string;
  companyId?: string;
  title: string;
  contactName: string;
  email: string;
  phone?: string;
  source: LeadSource;
  status: LeadStatus;
  score: number;
  assignedToId?: string;
  assignedTo?: UserProfile;
  company?: CompanyPayload;
  createdAt: string;
}

export interface PipelineStagePayload {
  id: string;
  pipelineId: string;
  name: string;
  position: number;
  probability: number;
  color?: string;
}

export interface PipelinePayload {
  id: string;
  organizationId: string;
  name: string;
  isDefault: boolean;
  stages: PipelineStagePayload[];
}

export interface DealPayload {
  id: string;
  organizationId: string;
  pipelineId: string;
  stageId: string;
  contactId?: string;
  companyId?: string;
  assignedToId?: string;
  title: string;
  amount: number;
  currency: string;
  status: DealStatus;
  winLossReason?: string;
  expectedCloseDate?: string;
  contact?: ContactPayload;
  company?: CompanyPayload;
  assignedTo?: UserProfile;
  stage?: PipelineStagePayload;
  createdAt: string;
}

export interface ActivityPayload {
  id: string;
  organizationId: string;
  userId: string;
  contactId?: string;
  dealId?: string;
  type: ActivityType;
  title: string;
  notes?: string;
  dueAt?: string;
  completedAt?: string;
  user: UserProfile;
  createdAt: string;
}
