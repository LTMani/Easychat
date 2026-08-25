import { PrismaClient } from '@prisma/client';

export interface EnterpriseSeedConfig {
  name: string;
  plan: 'STARTER' | 'PRO' | 'ENTERPRISE';
  timezone: string;
  defaultCurrency: string;
  supportEmail: string;
  website: string;
  membersCount: number;
}

export const ENTERPRISE_ORGS: EnterpriseSeedConfig[] = [
  { name: 'Acme Global Corporation', plan: 'ENTERPRISE', timezone: 'America/New_York', defaultCurrency: 'USD', supportEmail: 'enterprise-support@acme.com', website: 'https://acme.com', membersCount: 25 },
  { name: 'FinTech Velocity GmbH', plan: 'ENTERPRISE', timezone: 'Europe/Berlin', defaultCurrency: 'EUR', supportEmail: 'support@fintechvelocity.de', website: 'https://fintechvelocity.de', membersCount: 18 },
  { name: 'GlobalRetail Cloud Inc', plan: 'ENTERPRISE', timezone: 'America/Chicago', defaultCurrency: 'USD', supportEmail: 'help@globalretail.io', website: 'https://globalretail.io', membersCount: 40 },
  { name: 'CyberShield Systems UK', plan: 'PRO', timezone: 'Europe/London', defaultCurrency: 'GBP', supportEmail: 'soc@cybershield.co.uk', website: 'https://cybershield.co.uk', membersCount: 12 },
  { name: 'Bharat Logistics Pvt Ltd', plan: 'PRO', timezone: 'Asia/Kolkata', defaultCurrency: 'INR', supportEmail: 'support@bharatlogistics.in', website: 'https://bharatlogistics.in', membersCount: 15 },
  { name: 'Nordic Health Dynamics', plan: 'ENTERPRISE', timezone: 'Europe/Stockholm', defaultCurrency: 'EUR', supportEmail: 'patient-care@nordichealth.se', website: 'https://nordichealth.se', membersCount: 22 },
  { name: 'Pacific Trade & Supply', plan: 'PRO', timezone: 'Asia/Singapore', defaultCurrency: 'SGD', supportEmail: 'service@pacifictrade.sg', website: 'https://pacifictrade.sg', membersCount: 10 },
  { name: 'Tokyo Robotics & AI', plan: 'ENTERPRISE', timezone: 'Asia/Tokyo', defaultCurrency: 'USD', supportEmail: 'ai-ops@tokyorobotics.jp', website: 'https://tokyorobotics.jp', membersCount: 30 },
  { name: 'Aussie Solar Energy', plan: 'PRO', timezone: 'Australia/Sydney', defaultCurrency: 'AUD', supportEmail: 'info@aussiesolar.com.au', website: 'https://aussiesolar.com.au', membersCount: 8 },
  { name: 'Sao Paulo Cloud Tech', plan: 'STARTER', timezone: 'America/Sao_Paulo', defaultCurrency: 'USD', supportEmail: 'contato@saopaulocloud.br', website: 'https://saopaulocloud.br', membersCount: 4 },
];

export async function seedEnterpriseOrgs(prisma: PrismaClient) {
  console.log('Seeding enterprise organizations...');
  const createdOrgs = [];

  for (const org of ENTERPRISE_ORGS) {
    const record = await prisma.organization.upsert({
      where: { id: `org_${org.name.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 20)}` },
      update: {
        name: org.name,
        plan: org.plan,
      },
      create: {
        id: `org_${org.name.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 20)}`,
        name: org.name,
        plan: org.plan,
      },
    });
    createdOrgs.push(record);
  }

  console.log(`Seeded ${createdOrgs.length} enterprise organizations.`);
  return createdOrgs;
}
