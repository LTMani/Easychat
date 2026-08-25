import { z } from 'zod';
import { SystemRole } from './enums';

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
