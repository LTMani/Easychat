import { PrismaClient } from '@prisma/client';

export async function seedPipelinesAndDeals(prisma: PrismaClient, organizationId: string) {
  console.log(`Seeding sales pipelines and opportunities for org ${organizationId}...`);

  // 1. Create Enterprise Pipeline
  const pipeline = await prisma.pipeline.create({
    data: {
      organizationId,
      name: 'Enterprise Direct Sales Pipeline',
      isDefault: true,
      stages: {
        create: [
          { name: 'Prospecting', position: 1, probability: 10, organizationId },
          { name: 'Qualification', position: 2, probability: 25, organizationId },
          { name: 'Demo & Security Review', position: 3, probability: 50, organizationId },
          { name: 'Proposal Delivered', position: 4, probability: 75, organizationId },
          { name: 'Contract Negotiation', position: 5, probability: 90, organizationId },
          { name: 'Closed Won', position: 6, probability: 100, organizationId },
          { name: 'Closed Lost', position: 7, probability: 0, organizationId },
        ],
      },
    },
    include: { stages: true },
  });

  const stages = pipeline.stages;
  const contacts = await prisma.contact.findMany({ where: { organizationId }, take: 6 });

  const DEALS_DATA = [
    { title: 'Global Multi-Region SaaS Rollout', amount: 145000, stageIndex: 4, status: 'OPEN' },
    { title: 'Enterprise Omnichannel Support Suite', amount: 89000, stageIndex: 5, status: 'WON' },
    { title: 'Annual Security & SAML SSO License', amount: 48000, stageIndex: 3, status: 'OPEN' },
    { title: 'Professional Implementation & Training', amount: 24000, stageIndex: 2, status: 'OPEN' },
    { title: 'WhatsApp High-Volume Broadcast Add-on', amount: 18000, stageIndex: 5, status: 'WON' },
    { title: 'Legacy CRM Migration Contract', amount: 62000, stageIndex: 1, status: 'OPEN' },
  ];

  const createdDeals = [];
  for (let i = 0; i < DEALS_DATA.length; i++) {
    const d = DEALS_DATA[i];
    const contact = contacts[i % contacts.length];
    const stage = stages[d.stageIndex];

    const deal = await prisma.deal.create({
      data: {
        organizationId,
        pipelineId: pipeline.id,
        stageId: stage.id,
        contactId: contact ? contact.id : null,
        title: d.title,
        amount: d.amount,
        currency: 'USD',
        status: d.status,
        expectedCloseDate: new Date(Date.now() + (i + 1) * 7 * 24 * 60 * 60 * 1000),
      },
    });
    createdDeals.push(deal);
  }

  console.log(`Seeded pipeline '${pipeline.name}' with ${createdDeals.length} deals.`);
  return { pipeline, deals: createdDeals };
}
