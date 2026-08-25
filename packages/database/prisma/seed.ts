import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@easychat/auth';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding comprehensive EasyChat CRM demo data...');

  // 1. Create default super-admin user
  const adminEmail = 'admin@easychat.io';
  let adminUser = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!adminUser) {
    const passwordHash = await hashPassword('AdminPass123!');
    adminUser = await prisma.user.create({
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

  // 2. Create default organization
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
        userId: adminUser.id,
      },
    },
  });

  if (!membership) {
    await prisma.organizationMember.create({
      data: {
        organizationId: org.id,
        userId: adminUser.id,
        role: 'OWNER',
      },
    });
    console.log(`Assigned admin user as OWNER of EasyChat Global`);
  }

  // 3. Create Additional Team Members
  const teamMembersData = [
    { email: 'sarah.jenkins@easychat.io', firstName: 'Sarah', lastName: 'Jenkins', role: 'SALES_REP' },
    { email: 'david.chen@easychat.io', firstName: 'David', lastName: 'Chen', role: 'SUPPORT_AGENT' },
    { email: 'emily.watson@easychat.io', firstName: 'Emily', lastName: 'Watson', role: 'MANAGER' },
  ];

  for (const m of teamMembersData) {
    let u = await prisma.user.findUnique({ where: { email: m.email } });
    if (!u) {
      const passwordHash = await hashPassword('UserPass123!');
      u = await prisma.user.create({
        data: {
          email: m.email,
          passwordHash,
          firstName: m.firstName,
          lastName: m.lastName,
          isEmailVerified: true,
        },
      });
      await prisma.organizationMember.create({
        data: {
          organizationId: org.id,
          userId: u.id,
          role: m.role,
        },
      });
    }
  }

  // 4. Create Default Pipeline & Stages
  let pipeline = await prisma.pipeline.findFirst({
    where: { organizationId: org.id, isDefault: true },
    include: { stages: { orderBy: { position: 'asc' } } },
  });

  if (!pipeline || pipeline.stages.length === 0) {
    pipeline = await prisma.pipeline.create({
      data: {
        organizationId: org.id,
        name: 'Standard Sales Pipeline',
        isDefault: true,
        stages: {
          create: [
            { name: 'Discovery', position: 1, probability: 20, color: '#0284c7' },
            { name: 'Proposal Sent', position: 2, probability: 50, color: '#eab308' },
            { name: 'Negotiation', position: 3, probability: 80, color: '#f97316' },
            { name: 'Closed Won', position: 4, probability: 100, color: '#22c55e' },
            { name: 'Closed Lost', position: 5, probability: 0, color: '#ef4444' },
          ],
        },
      },
      include: { stages: { orderBy: { position: 'asc' } } },
    });
  }

  // 5. Seed Customer Companies
  let company1 = await prisma.company.findFirst({ where: { organizationId: org.id, name: 'Acme Corporation' } });
  if (!company1) {
    company1 = await prisma.company.create({
      data: {
        organizationId: org.id,
        name: 'Acme Corporation',
        domain: 'acmecorp.com',
        industry: 'Enterprise Software',
        employeeCount: 250,
        annualRevenue: 15000000,
        website: 'https://acmecorp.com',
      },
    });
  }

  let company2 = await prisma.company.findFirst({ where: { organizationId: org.id, name: 'TechFlow Systems' } });
  if (!company2) {
    company2 = await prisma.company.create({
      data: {
        organizationId: org.id,
        name: 'TechFlow Systems',
        domain: 'techflow.io',
        industry: 'Cloud Infrastructure',
        employeeCount: 85,
        annualRevenue: 6500000,
        website: 'https://techflow.io',
      },
    });
  }

  let company3 = await prisma.company.findFirst({ where: { organizationId: org.id, name: 'Global Scale Media' } });
  if (!company3) {
    company3 = await prisma.company.create({
      data: {
        organizationId: org.id,
        name: 'Global Scale Media',
        domain: 'globalscale.org',
        industry: 'Digital Marketing',
        employeeCount: 120,
        annualRevenue: 9200000,
        website: 'https://globalscale.org',
      },
    });
  }

  // 6. Seed Customer Contacts
  let contact1 = await prisma.contact.findFirst({ where: { organizationId: org.id, email: 'sarah.jenkins@acmecorp.com' } });
  if (!contact1) {
    contact1 = await prisma.contact.create({
      data: {
        organizationId: org.id,
        companyId: company1.id,
        firstName: 'Sarah',
        lastName: 'Jenkins',
        email: 'sarah.jenkins@acmecorp.com',
        phone: '+1-555-0192',
        jobTitle: 'VP of Sales Operations',
        tags: JSON.stringify(['VIP', 'Enterprise', 'Decision Maker']),
      },
    });
  }

  let contact2 = await prisma.contact.findFirst({ where: { organizationId: org.id, email: 'david.chen@techflow.io' } });
  if (!contact2) {
    contact2 = await prisma.contact.create({
      data: {
        organizationId: org.id,
        companyId: company2.id,
        firstName: 'David',
        lastName: 'Chen',
        email: 'david.chen@techflow.io',
        phone: '+1-555-0144',
        jobTitle: 'Chief Technology Officer',
        tags: JSON.stringify(['Technical Evaluator', 'Cloud']),
      },
    });
  }

  let contact3 = await prisma.contact.findFirst({ where: { organizationId: org.id, email: 'emily.watson@globalscale.org' } });
  if (!contact3) {
    contact3 = await prisma.contact.create({
      data: {
        organizationId: org.id,
        companyId: company3.id,
        firstName: 'Emily',
        lastName: 'Watson',
        email: 'emily.watson@globalscale.org',
        phone: '+1-555-0188',
        jobTitle: 'Head of Customer Experience',
        tags: JSON.stringify(['High Touch', 'Expansion']),
      },
    });
  }

  // 7. Seed Support Tickets with Unique Numbers
  const tNum1 = `TICK-${Math.floor(10000 + Math.random() * 90000)}`;
  const ticket1 = await prisma.ticket.create({
    data: {
      organizationId: org.id,
      contactId: contact2?.id,
      assignedToId: adminUser.id,
      ticketNumber: tNum1,
      subject: 'Cannot configure Webhook payload signature verification in production',
      description: 'Our dev team is receiving 401 signature validation failures when verifying HMAC keys from the developer portal.',
      priority: 'URGENT',
      status: 'OPEN',
      firstResponseDueAt: new Date(Date.now() + 15 * 60 * 1000),
      resolutionDueAt: new Date(Date.now() + 4 * 60 * 60 * 1000),
    },
  });

  await prisma.ticketComment.create({
    data: {
      ticketId: ticket1.id,
      userId: adminUser.id,
      isInternal: true,
      content: 'Internal Note: Checked security log. HMAC secret algorithm is SHA-256.',
    },
  });

  // 8. Seed Knowledge Base Articles
  const slug1 = 'how-to-configure-webhook-signatures-' + Math.floor(1000 + Math.random() * 9000);
  await prisma.knowledgeArticle.create({
    data: {
      organizationId: org.id,
      authorId: adminUser.id,
      title: 'How to Configure Webhook Signatures & Secret Keys',
      slug: slug1,
      category: 'API & Webhooks',
      content: 'EasyChat CRM signs all outgoing webhook payloads using HMAC SHA-256. Verify the X-EasyChat-Signature header in your receiver endpoints.',
      isPublished: true,
      viewCount: 142,
    },
  });

  // 9. Seed Channel Configurations
  const existingChannel = await prisma.channelConfig.findFirst({ where: { organizationId: org.id } });
  if (!existingChannel) {
    await prisma.channelConfig.create({
      data: {
        organizationId: org.id,
        type: 'WHATSAPP',
        name: 'Official WhatsApp Business Account',
        credentials: JSON.stringify({ phoneNumberId: '1092837465', apiToken: 'wh_live_token_991823' }),
        isActive: true,
      },
    });
  }

  // 10. Seed SLA Policies
  const existingSla = await prisma.slaPolicy.findFirst({ where: { organizationId: org.id } });
  if (!existingSla) {
    await prisma.slaPolicy.create({
      data: {
        organizationId: org.id,
        name: 'Enterprise VIP SLA Policy',
        priority: 'URGENT',
        firstResponseMinutes: 15,
        resolutionMinutes: 240,
        isDefault: true,
      },
    });
  }

  console.log(`Seeding completed successfully! All demo contacts, channels, SLA policies & ticket records created.`);
}

main()
  .catch((e) => {
    console.error('Error during database seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
