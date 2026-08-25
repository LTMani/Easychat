import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedEnterpriseData() {
  console.log('Seeding Enterprise CRM Data...');

  // Create Organizations
  const org1 = await prisma.organization.upsert({
    where: { slug: 'acme-corp' },
    update: {},
    create: {
      name: 'Acme Corporation',
      slug: 'acme-corp',
      domain: 'acme.com',
      industry: 'Technology & Software',
      currency: 'USD',
      timezone: 'America/New_York',
      maxUsers: 50,
    },
  });

  const org2 = await prisma.organization.upsert({
    where: { slug: 'starlight-inc' },
    update: {},
    create: {
      name: 'Starlight Enterprises',
      slug: 'starlight-inc',
      domain: 'starlight.io',
      industry: 'Financial Services',
      currency: 'EUR',
      timezone: 'Europe/London',
      maxUsers: 100,
    },
  });

  // Create Users
  const user1 = await prisma.user.upsert({
    where: { email: 'admin@acme.com' },
    update: {},
    create: {
      email: 'admin@acme.com',
      passwordHash: '$2b$10$EpRmg74a/01.32.4.3.4.5',
      firstName: 'Sarah',
      lastName: 'Connor',
      jobTitle: 'VP of Customer Success',
      department: 'Executive',
      isEmailVerified: true,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'agent.alex@acme.com' },
    update: {},
    create: {
      email: 'agent.alex@acme.com',
      passwordHash: '$2b$10$EpRmg74a/01.32.4.3.4.5',
      firstName: 'Alex',
      lastName: 'Mercer',
      jobTitle: 'Senior Support Lead',
      department: 'Customer Care',
      isEmailVerified: true,
    },
  });

  // Link Organization Memberships
  await prisma.organizationMember.upsert({
    where: { organizationId_userId: { organizationId: org1.id, userId: user1.id } },
    update: {},
    create: {
      organizationId: org1.id,
      userId: user1.id,
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });

  await prisma.organizationMember.upsert({
    where: { organizationId_userId: { organizationId: org1.id, userId: user2.id } },
    update: {},
    create: {
      organizationId: org1.id,
      userId: user2.id,
      role: 'SUPPORT_AGENT',
      status: 'ACTIVE',
    },
  });

  // Create Teams
  const teamSales = await prisma.team.create({
    data: {
      organizationId: org1.id,
      name: 'Enterprise Sales Team',
      description: 'Strategic accounts and revenue growth division.',
      leadUserId: user1.id,
    },
  });

  const teamSupport = await prisma.team.create({
    data: {
      organizationId: org1.id,
      name: 'Tier-2 Technical Support',
      description: 'Complex SLA escalation and API integration support.',
      leadUserId: user2.id,
    },
  });

  // Create Subscription Plans
  const starterPlan = await prisma.subscriptionPlan.upsert({
    where: { code: 'STARTER' },
    update: {},
    create: {
      name: 'Starter Tier',
      code: 'STARTER',
      description: 'Essential CRM and live chat inbox.',
      priceMonthly: 29.0,
      priceYearly: 290.0,
      maxSeats: 5,
      maxContacts: 2500,
    },
  });

  const proPlan = await prisma.subscriptionPlan.upsert({
    where: { code: 'PRO' },
    update: {},
    create: {
      name: 'Professional Tier',
      code: 'PRO',
      description: 'Omnichannel workspace, SLA policies, and AI Assistant.',
      priceMonthly: 89.0,
      priceYearly: 890.0,
      maxSeats: 25,
      maxContacts: 25000,
    },
  });

  // Create SLA Policies
  await prisma.slaPolicy.create({
    data: {
      organizationId: org1.id,
      name: 'Urgent Executive SLA Policy',
      description: 'Strict 15-minute response target for high-value contracts.',
      priority: 'URGENT',
      firstResponseMinutes: 15,
      nextResponseMinutes: 30,
      resolutionMinutes: 120,
      isDefault: false,
    },
  });

  await prisma.slaPolicy.create({
    data: {
      organizationId: org1.id,
      name: 'Standard Customer SLA Policy',
      description: 'Standard 1-hour first response target.',
      priority: 'MEDIUM',
      firstResponseMinutes: 60,
      nextResponseMinutes: 120,
      resolutionMinutes: 480,
      isDefault: true,
    },
  });

  // Create Products Catalog
  const prod1 = await prisma.productCatalog.create({
    data: {
      organizationId: org1.id,
      name: 'EasyChat Enterprise Annual License',
      sku: 'LIC-ENT-001',
      description: 'Annual seat license for enterprise team access.',
      unitPrice: 1200.0,
      currency: 'USD',
    },
  });

  const prod2 = await prisma.productCatalog.create({
    data: {
      organizationId: org1.id,
      name: 'Dedicated SIP Voice Trunk Add-on',
      sku: 'ADD-SIP-002',
      description: 'Dedicated WebRTC SIP trunking channel.',
      unitPrice: 350.0,
      currency: 'USD',
    },
  });

  // Create B2B Companies & Contacts
  const comp1 = await prisma.company.create({
    data: {
      organizationId: org1.id,
      name: 'Global Logistics Solutions',
      domain: 'globallogistics.com',
      industry: 'Transportation',
      employeeCount: 450,
      annualRevenue: 15000000.0,
    },
  });

  const contact1 = await prisma.contact.create({
    data: {
      organizationId: org1.id,
      companyId: comp1.id,
      firstName: 'David',
      lastName: 'Miller',
      email: 'david.miller@globallogistics.com',
      phone: '+1 (555) 789-0123',
      jobTitle: 'Chief Technology Officer',
      city: 'Chicago',
      country: 'USA',
      lifetimeValue: 24500.0,
      leadScore: 92,
      tags: JSON.stringify(['VIP', 'Enterprise', 'High-Intent']),
    },
  });

  // Create Sales Pipeline & Deals
  const pipeline = await prisma.pipeline.create({
    data: {
      organizationId: org1.id,
      name: 'Standard B2B Sales Pipeline',
      isDefault: true,
    },
  });

  const stage1 = await prisma.pipelineStage.create({
    data: {
      pipelineId: pipeline.id,
      name: 'Qualification',
      position: 1,
      probability: 20,
    },
  });

  const stage2 = await prisma.pipelineStage.create({
    data: {
      pipelineId: pipeline.id,
      name: 'Proposal / Quote Sent',
      position: 2,
      probability: 60,
    },
  });

  const deal1 = await prisma.deal.create({
    data: {
      organizationId: org1.id,
      pipelineId: pipeline.id,
      stageId: stage2.id,
      contactId: contact1.id,
      companyId: comp1.id,
      assignedToId: user1.id,
      title: 'Global Logistics - 200 Seat Upgrade',
      amount: 48000.0,
      currency: 'USD',
      status: 'OPEN',
    },
  });

  // Create CPQ Quote
  await prisma.dealQuote.create({
    data: {
      dealId: deal1.id,
      createdById: user1.id,
      quoteNumber: 'QT-2026-0091',
      totalAmount: 48000.0,
      taxAmount: 4800.0,
      discountAmount: 2000.0,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: 'SENT',
      lineItems: {
        create: [
          {
            productId: prod1.id,
            quantity: 40,
            unitPrice: 1200.0,
            discount: 5.0,
            totalPrice: 45600.0,
          },
        ],
      },
    },
  });

  // Create Support Ticket
  await prisma.ticket.create({
    data: {
      organizationId: org1.id,
      teamId: teamSupport.id,
      contactId: contact1.id,
      assignedToId: user2.id,
      ticketNumber: 'TCK-2026-8801',
      subject: 'Inbound Webhook Verification Latency Issue',
      description: 'Customer reports occasional 2-second latency spikes on high volume webhook dispatches.',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      category: 'API_INTEGRATION',
      firstResponseDueAt: new Date(Date.now() + 30 * 60 * 1000),
      resolutionDueAt: new Date(Date.now() + 4 * 60 * 60 * 1000),
    },
  });

  console.log('Enterprise CRM Data Seeding Completed Successfully!');
}

seedEnterpriseData()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
