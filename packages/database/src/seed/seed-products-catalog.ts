import { PrismaClient } from '@prisma/client';

export async function seedProductCatalog(prisma: PrismaClient, organizationId: string) {
  console.log(`Seeding product catalog items for org ${organizationId}...`);

  const PRODUCTS_DATA = [
    { name: 'EasyChat Starter Plan', sku: 'ECH-STR-001', price: 49, currency: 'USD', description: 'Essential omnichannel support for teams up to 5 seats' },
    { name: 'EasyChat Professional Plan', sku: 'ECH-PRO-001', price: 99, currency: 'USD', description: 'Advanced CRM, SLA timers, and custom reporting for growing teams' },
    { name: 'EasyChat Enterprise Annual', sku: 'ECH-ENT-ANN', price: 2988, currency: 'USD', description: 'Unlimited seats, dedicated CSM, 99.9% uptime SLA, and custom SSO' },
    { name: 'Professional Onboarding & Setup', sku: 'SVC-IMPL-001', price: 3500, currency: 'USD', description: 'Hands-on CRM data migration and customized workflow architecture' },
    { name: 'High-Volume WhatsApp Messaging (100k/mo)', sku: 'ADD-WA-100K', price: 299, currency: 'USD', description: 'Additional 100,000 WhatsApp broadcast marketing messages per month' },
    { name: 'API Quota Expansion (1M calls/mo)', sku: 'ADD-API-1M', price: 199, currency: 'USD', description: '1,000,000 additional REST API and Webhook event dispatches' },
  ];

  const created = [];
  for (const p of PRODUCTS_DATA) {
    const record = await prisma.productCatalog.create({
      data: {
        organizationId,
        name: p.name,
        sku: p.sku,
        price: p.price,
        currency: p.currency,
        description: p.description,
        isActive: true,
      },
    });
    created.push(record);
  }

  console.log(`Seeded ${created.length} product catalog items.`);
  return created;
}
