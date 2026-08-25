import { PrismaClient } from '@prisma/client';
import { seedEnterpriseOrgs } from './seed-enterprises';
import { seedAdvancedContacts } from './seed-contacts-advanced';
import { seedPipelinesAndDeals } from './seed-pipelines-deals';
import { seedTicketsAndSla } from './seed-tickets-sla';
import { seedConversationsAndMessages } from './seed-conversations-omni';
import { seedProductCatalog } from './seed-products-catalog';

export async function runMasterSeed() {
  const prisma = new PrismaClient();

  console.log('====================================================');
  console.log('  EasyChat CRM Master Database Seeding Pipeline     ');
  console.log('====================================================');

  try {
    // 1. Seed Organizations
    const orgs = await seedEnterpriseOrgs(prisma);
    const primaryOrg = orgs[0];

    if (primaryOrg) {
      console.log(`Populating rich ecosystem data for primary org: ${primaryOrg.name} (${primaryOrg.id})...`);

      // 2. Seed Contacts
      await seedAdvancedContacts(prisma, primaryOrg.id);

      // 3. Seed Pipelines & Deals
      await seedPipelinesAndDeals(prisma, primaryOrg.id);

      // 4. Seed Support Tickets & SLA Logs
      await seedTicketsAndSla(prisma, primaryOrg.id);

      // 5. Seed Omnichannel Conversations & Messages
      await seedConversationsAndMessages(prisma, primaryOrg.id);

      // 6. Seed Product Catalog
      await seedProductCatalog(prisma, primaryOrg.id);
    }

    console.log('====================================================');
    console.log('  Master Seeding Pipeline Successfully Completed!   ');
    console.log('====================================================');
  } catch (err: any) {
    console.error('Master seed failed with error:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  runMasterSeed();
}
