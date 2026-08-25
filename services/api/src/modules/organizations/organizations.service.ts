import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { prisma, SystemRoleName, MemberStatus as DatabaseMemberStatus } from '@easychat/database';
import { InviteMemberDto, CreateTeamDto, UpdateRoleDto, ApiResponse, SystemRole } from '@easychat/shared';
import { hashPassword } from '@easychat/auth';

@Injectable()
export class OrganizationsService {
  async getOrganizationDetails(orgId: string): Promise<ApiResponse> {
    const org = await prisma.organization.findUnique({
      where: { id: orgId },
      include: {
        teams: true,
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
                isEmailVerified: true,
              },
            },
          },
        },
      },
    });

    if (!org) {
      throw new NotFoundException('Organization not found');
    }

    return {
      success: true,
      data: org,
    };
  }

  async inviteMember(orgId: string, dto: InviteMemberDto): Promise<ApiResponse> {
    let user = await prisma.user.findUnique({ where: { email: dto.email } });

    if (!user) {
      // Create user placeholder for invited member
      const tempHash = await hashPassword('TempPass123!');
      user = await prisma.user.create({
        data: {
          email: dto.email,
          passwordHash: tempHash,
          firstName: dto.email.split('@')[0],
          lastName: 'User',
          isEmailVerified: false,
        },
      });
    }

    const existingMember = await prisma.organizationMember.findUnique({
      where: {
        organizationId_userId: {
          organizationId: orgId,
          userId: user.id,
        },
      },
    });

    if (existingMember) {
      throw new ConflictException('User is already a member of this organization');
    }

    const member = await prisma.organizationMember.create({
      data: {
        organizationId: orgId,
        userId: user.id,
        role: dto.role as unknown as SystemRoleName,
        status: DatabaseMemberStatus.INVITED,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (dto.teamIds && dto.teamIds.length > 0) {
      await prisma.teamMember.createMany({
        data: dto.teamIds.map((teamId) => ({
          teamId,
          organizationMemberId: member.id,
        })),
      });
    }

    return {
      success: true,
      message: 'Member invited successfully',
      data: member,
    };
  }

  async createTeam(orgId: string, dto: CreateTeamDto): Promise<ApiResponse> {
    const team = await prisma.team.create({
      data: {
        organizationId: orgId,
        name: dto.name,
        description: dto.description,
      },
    });

    return {
      success: true,
      message: 'Team created successfully',
      data: team,
    };
  }

  async updateMemberRole(orgId: string, memberId: string, role: SystemRole): Promise<ApiResponse> {
    const member = await prisma.organizationMember.findFirst({
      where: { id: memberId, organizationId: orgId },
    });

    if (!member) {
      throw new NotFoundException('Organization member not found');
    }

    const updated = await prisma.organizationMember.update({
      where: { id: memberId },
      data: { role: role as unknown as SystemRoleName },
    });

    return {
      success: true,
      message: 'Member role updated successfully',
      data: updated,
    };
  }

  async getTeams(orgId: string): Promise<ApiResponse> {
    const teams = await prisma.team.findMany({
      where: { organizationId: orgId },
      include: {
        members: {
          include: {
            member: {
              include: { user: true },
            },
          },
        },
      },
    });

    return {
      success: true,
      data: teams,
    };
  }
}
