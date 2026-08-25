import { SystemRole, Permission, MemberStatus, ConversationType, MessageType, NotificationType, PresenceStatus } from './enums';

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
