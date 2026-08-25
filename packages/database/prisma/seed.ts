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
      console.log(`Created team member: ${m.firstName} ${m.lastName} (${m.role})`);
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
    console.log(`Created sales pipeline with 5 stages`);
  }

  // 5. Seed Customer Companies
  const company1 = await prisma.company.create({
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

  const company2 = await prisma.company.create({
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

  const company3 = await prisma.company.create({
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

  console.log(`Created 3 customer companies`);

  // 6. Seed Customer Contacts
  const contact1 = await prisma.contact.create({
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

  const contact2 = await prisma.contact.create({
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

  const contact3 = await prisma.contact.create({
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

  const contact4 = await prisma.contact.create({
    data: {
      organizationId: org.id,
      firstName: 'Michael',
      lastName: 'Scott',
      email: 'michael.scott@dundermifflin.com',
      phone: '+1-555-0133',
      jobTitle: 'Regional Branch Manager',
      tags: JSON.stringify(['Prospect', 'Inbound']),
    },
  });

  console.log(`Created 4 customer contacts`);

  // 7. Seed Leads
  await prisma.lead.create({
    data: {
      organizationId: org.id,
      companyId: company1.id,
      title: 'Enterprise CRM Migration & 500 Seats',
      contactName: 'Robert California',
      email: 'robert@sabrecorp.com',
      phone: '+1-555-0999',
      source: 'WEBSITE',
      status: 'QUALIFIED',
      score: 95,
      assignedToId: adminUser.id,
    },
  });

  await prisma.lead.create({
    data: {
      organizationId: org.id,
      companyId: company2.id,
      title: 'Realtime Webhook Messaging Expansion',
      contactName: 'Jennifer Taylor',
      email: 'jtaylor@apexsol.com',
      phone: '+1-555-0888',
      source: 'CHAT',
      status: 'CONTACTED',
      score: 80,
      assignedToId: adminUser.id,
    },
  });

  await prisma.lead.create({
    data: {
      organizationId: org.id,
      title: 'Annual Support SLA & SLA Breach Alerting',
      contactName: 'Marcus Brody',
      email: 'brody@indiana.edu',
      phone: '+1-555-0777',
      source: 'REFERRAL',
      status: 'NEW',
      score: 65,
      assignedToId: adminUser.id,
    },
  });

  console.log(`Created 3 sales leads`);

  // 8. Seed Sales Deals
  const discoveryStage = pipeline.stages.find((s) => s.name === 'Discovery') || pipeline.stages[0];
  const proposalStage = pipeline.stages.find((s) => s.name === 'Proposal Sent') || pipeline.stages[1];
  const negotiationStage = pipeline.stages.find((s) => s.name === 'Negotiation') || pipeline.stages[2];
  const wonStage = pipeline.stages.find((s) => s.name === 'Closed Won') || pipeline.stages[3];

  await prisma.deal.create({
    data: {
      organizationId: org.id,
      pipelineId: pipeline.id,
      stageId: proposalStage.id,
      contactId: contact1.id,
      companyId: company1.id,
      assignedToId: adminUser.id,
      title: 'Acme Corp — 500 Seat Enterprise License',
      amount: 125000,
      currency: 'USD',
      status: 'OPEN',
      expectedCloseDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.deal.create({
    data: {
      organizationId: org.id,
      pipelineId: pipeline.id,
      stageId: negotiationStage.id,
      contactId: contact2.id,
      companyId: company2.id,
      assignedToId: adminUser.id,
      title: 'TechFlow Cloud API Realtime Integration',
      amount: 45000,
      currency: 'USD',
      status: 'OPEN',
      expectedCloseDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.deal.create({
    data: {
      organizationId: org.id,
      pipelineId: pipeline.id,
      stageId: wonStage.id,
      contactId: contact3.id,
      companyId: company3.id,
      assignedToId: adminUser.id,
      title: 'Global Scale Annual Platform SLA & Support',
      amount: 78000,
      currency: 'USD',
      status: 'WON',
      expectedCloseDate: new Date(),
    },
  });

  console.log(`Created 3 sales deals across pipeline stages`);

  // 9. Seed Support Tickets
  const urgentDue = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
  const highDue = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours

  const ticket1 = await prisma.ticket.create({
    data: {
      organizationId: org.id,
      contactId: contact2.id,
      assignedToId: adminUser.id,
      ticketNumber: 'TICK-10092',
      subject: 'Cannot configure Webhook payload signature verification in production',
      description: 'Our dev team is receiving 401 signature validation failures when verifying HMAC keys from the developer portal.',
      priority: 'URGENT',
      status: 'OPEN',
      firstResponseDueAt: urgentDue,
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

  const ticket2 = await prisma.ticket.create({
    data: {
      organizationId: org.id,
      contactId: contact1.id,
      assignedToId: adminUser.id,
      ticketNumber: 'TICK-10085',
      subject: 'Request for SSO SAML 2.0 Identity Provider setup instructions',
      description: 'We require Okta SAML 2.0 configuration guide for our enterprise security compliance audit.',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      firstResponseDueAt: highDue,
      resolutionDueAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
    },
  });

  console.log(`Created 2 support tickets with SLA targets`);

  // 10. Seed Knowledge Base Articles
  await prisma.knowledgeArticle.create({
    data: {
      organizationId: org.id,
      authorId: adminUser.id,
      title: 'How to Configure Webhook Signatures & Secret Keys',
      slug: 'how-to-configure-webhook-signatures-secret-keys',
      category: 'API & Webhooks',
      content: 'EasyChat CRM signs all outgoing webhook payloads using HMAC SHA-256. Verify the X-EasyChat-Signature header in your receiver endpoints.',
      isPublished: true,
      viewCount: 142,
    },
  });

  await prisma.knowledgeArticle.create({
    data: {
      organizationId: org.id,
      authorId: adminUser.id,
      title: 'Lead Conversion Best Practices: From Contact to Active Sales Deal',
      slug: 'lead-conversion-best-practices',
      category: 'CRM Guide',
      content: 'Use 1-click lead conversion in EasyChat CRM to transform qualified leads directly into customer contacts, companies, and active pipeline deals.',
      isPublished: true,
      viewCount: 215,
    },
  });

  console.log(`Created 2 knowledge base articles`);

  // 11. Seed Tasks & Activities
  await prisma.task.create({
    data: {
      organizationId: org.id,
      assignedToId: adminUser.id,
      contactId: contact1.id,
      title: 'Send Enterprise Security Addendum PDF to Sarah Jenkins',
      description: 'Include SOC2 Type II compliance audit report and SSO documentation.',
      status: 'PENDING',
      dueAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  await prisma.activity.create({
    data: {
      organizationId: org.id,
      userId: adminUser.id,
      contactId: contact1.id,
      type: 'MEETING',
      title: 'Executive Architecture & Security Review Call',
      notes: 'Reviewed 500-seat rollout plan. Client approved proposal terms.',
    },
  });

  console.log(`Seeding completed successfully! All demo contacts, companies, leads, deals, tickets, articles & tasks created.`);
}

main()
  .catch((e) => {
    console.error('Error during database seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
