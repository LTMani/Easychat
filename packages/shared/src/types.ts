import { SystemRole, Permission, MemberStatus } from './enums';

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
