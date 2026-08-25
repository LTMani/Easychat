import { Injectable, BadRequestException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { prisma } from '@easychat/database';
import { hashPassword, comparePassword, generateToken, getPermissionsForRole } from '@easychat/auth';
import { RegisterDto, LoginDto, RefreshTokenDto, SystemRole, ApiResponse } from '@easychat/shared';

@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET || 'super-secret-jwt-key-easychat-crm-2026-production-change-me';
  private readonly jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'super-secret-refresh-key-easychat-crm-2026-production-change-me';

  async register(dto: RegisterDto): Promise<ApiResponse> {
    const normalizedEmail = dto.email.toLowerCase().trim();
    const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existingUser) {
      throw new ConflictException('User with this email address already exists');
    }

    const passwordHash = await hashPassword(dto.password);
    const slug = dto.organizationName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.floor(1000 + Math.random() * 9000);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        isEmailVerified: true,
      },
    });

    const org = await prisma.organization.create({
      data: {
        name: dto.organizationName,
        slug,
      },
    });

    await prisma.organizationMember.create({
      data: {
        organizationId: org.id,
        userId: user.id,
        role: 'OWNER',
      },
    });

    // Create default teams
    await prisma.team.createMany({
      data: [
        { organizationId: org.id, name: 'Sales Team', description: 'Default sales team' },
        { organizationId: org.id, name: 'Support Team', description: 'Default support team' },
      ],
    });

    const role = SystemRole.OWNER;
    const permissions = getPermissionsForRole(role);

    const accessToken = generateToken(
      { userId: user.id, email: user.email, organizationId: org.id, roles: [role], permissions },
      { secret: this.jwtSecret, expiresIn: '15m' },
    );

    const refreshToken = generateToken(
      { userId: user.id, email: user.email, organizationId: org.id, roles: [role], permissions },
      { secret: this.jwtRefreshSecret, expiresIn: '7d' },
    );

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    await prisma.auditLog.create({
      data: {
        organizationId: org.id,
        userId: user.id,
        action: 'USER_REGISTERED',
        entityType: 'User',
        entityId: user.id,
      },
    });

    return {
      success: true,
      message: 'Registration successful',
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        organization: {
          id: org.id,
          name: org.name,
          slug: org.slug,
        },
      },
    };
  }

  async login(dto: LoginDto): Promise<ApiResponse> {
    const normalizedEmail = dto.email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        memberships: {
          include: { organization: true },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await comparePassword(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const primaryMembership = user.memberships[0];
    const role = (primaryMembership?.role as unknown as SystemRole) || SystemRole.MEMBER;
    const permissions = getPermissionsForRole(role);
    const orgId = primaryMembership?.organizationId;

    const accessToken = generateToken(
      { userId: user.id, email: user.email, organizationId: orgId, roles: [role], permissions },
      { secret: this.jwtSecret, expiresIn: '15m' },
    );

    const refreshToken = generateToken(
      { userId: user.id, email: user.email, organizationId: orgId, roles: [role], permissions },
      { secret: this.jwtRefreshSecret, expiresIn: '7d' },
    );

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    await prisma.auditLog.create({
      data: {
        organizationId: orgId,
        userId: user.id,
        action: 'USER_LOGGED_IN',
        entityType: 'User',
        entityId: user.id,
      },
    });

    return {
      success: true,
      message: 'Login successful',
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        organization: primaryMembership
          ? {
              id: primaryMembership.organization.id,
              name: primaryMembership.organization.name,
              slug: primaryMembership.organization.slug,
              role: primaryMembership.role,
            }
          : null,
      },
    };
  }

  async refreshToken(dto: RefreshTokenDto): Promise<ApiResponse> {
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: dto.refreshToken },
      include: { user: { include: { memberships: true } } },
    });

    if (!storedToken || storedToken.isRevoked || storedToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = storedToken.user;
    const primaryMembership = user.memberships[0];
    const role = (primaryMembership?.role as unknown as SystemRole) || SystemRole.MEMBER;
    const permissions = getPermissionsForRole(role);

    const accessToken = generateToken(
      { userId: user.id, email: user.email, organizationId: primaryMembership?.organizationId, roles: [role], permissions },
      { secret: this.jwtSecret, expiresIn: '15m' },
    );

    return {
      success: true,
      message: 'Token refreshed successfully',
      data: { accessToken },
    };
  }

  async logout(userId: string, refreshToken?: string): Promise<ApiResponse> {
    if (refreshToken) {
      await prisma.refreshToken.updateMany({
        where: { token: refreshToken, userId },
        data: { isRevoked: true },
      });
    }

    await prisma.auditLog.create({
      data: {
        userId,
        action: 'USER_LOGGED_OUT',
      },
    });

    return {
      success: true,
      message: 'Logged out successfully',
    };
  }
}
