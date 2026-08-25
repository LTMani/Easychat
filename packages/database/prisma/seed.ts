import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@easychat/auth';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding baseline database data...');

  // Create default admin user
  const adminEmail = 'admin@easychat.io';
  const existingUser = await prisma.user.findUnique({ where: { email: adminEmail } });

  let user = existingUser;
  if (!user) {
    const passwordHash = await hashPassword('AdminPass123!');
    user = await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
        firstName: 'System',
        lastName: 'Admin',
        isEmailVerified: true,
      },
    });
    console.log(`Created default super-admin user: ${adminEmail}`);
  }

  // Create default organization
  const defaultOrgSlug = 'default-org';
  let org = await prisma.organization.findUnique({ where: { slug: defaultOrgSlug } });
  if (!org) {
    org = await prisma.organization.create({
      data: {
        name: 'EasyChat Global',
        slug: defaultOrgSlug,
      },
    });
    console.log(`Created default organization: EasyChat Global`);
  }

  // Link admin user to organization as OWNER
  const membership = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId: org.id,
        userId: user.id,
      },
    },
  });

  if (!membership) {
    await prisma.organizationMember.create({
      data: {
        organizationId: org.id,
        userId: user.id,
        role: 'OWNER',
      },
    });
    console.log(`Assigned admin user as OWNER of EasyChat Global`);
  }

  // Create default teams
  const salesTeam = await prisma.team.findFirst({
    where: { organizationId: org.id, name: 'Sales Team' },
  });
  if (!salesTeam) {
    await prisma.team.create({
      data: {
        organizationId: org.id,
        name: 'Sales Team',
        description: 'Handles incoming leads and sales deals',
      },
    });
    console.log(`Created default team: Sales Team`);
  }

  const supportTeam = await prisma.team.findFirst({
    where: { organizationId: org.id, name: 'Support Team' },
  });
  if (!supportTeam) {
    await prisma.team.create({
      data: {
        organizationId: org.id,
        name: 'Support Team',
        description: 'Customer success and technical support',
      },
    });
    console.log(`Created default team: Support Team`);
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during database seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
