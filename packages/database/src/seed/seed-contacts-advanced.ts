import { PrismaClient } from '@prisma/client';

export interface SeedContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  city: string;
  country: string;
  lifetimeValue: number;
  leadScore: number;
  tags: string;
}

export const ADVANCED_CONTACTS: SeedContact[] = [
  { firstName: 'Jonathan', lastName: 'Vance', email: 'j.vance@techalpha.io', phone: '+14155550192', jobTitle: 'Chief Technology Officer', city: 'San Francisco', country: 'US', lifetimeValue: 84000, leadScore: 92, tags: 'enterprise,vip,decision-maker' },
  { firstName: 'Kathrin', lastName: 'Mueller', email: 'k.mueller@bavaria-auto.de', phone: '+49895551234', jobTitle: 'VP Procurement', city: 'Munich', country: 'DE', lifetimeValue: 125000, leadScore: 88, tags: 'enterprise,automotive,contract-signed' },
  { firstName: 'Aarav', lastName: 'Patel', email: 'aarav.patel@mumbai-tech.in', phone: '+91225559876', jobTitle: 'Head of Engineering', city: 'Mumbai', country: 'IN', lifetimeValue: 42000, leadScore: 85, tags: 'pro,cloud,whatsapp-user' },
  { firstName: 'Charlotte', lastName: 'Dubois', email: 'c.dubois@paris-retail.fr', phone: '+33145550011', jobTitle: 'Operations Director', city: 'Paris', country: 'FR', lifetimeValue: 67000, leadScore: 78, tags: 'enterprise,retail,inbound' },
  { firstName: 'Marcus', lastName: 'Aurelius', email: 'm.aurelius@rome-analytics.it', phone: '+39065554321', jobTitle: 'Chief Information Officer', city: 'Rome', country: 'IT', lifetimeValue: 95000, leadScore: 95, tags: 'enterprise,security,saml' },
  { firstName: 'Hiroshi', lastName: 'Tanaka', email: 'tanaka.h@tokyo-ventures.jp', phone: '+81355558899', jobTitle: 'Managing Partner', city: 'Tokyo', country: 'JP', lifetimeValue: 180000, leadScore: 98, tags: 'vip,enterprise,annual' },
  { firstName: 'Beatriz', lastName: 'Silva', email: 'b.silva@saopaulo-digital.br', phone: '+5511988887766', jobTitle: 'Product Lead', city: 'Sao Paulo', country: 'BR', lifetimeValue: 31000, leadScore: 72, tags: 'starter,growth,web-lead' },
  { firstName: 'Liam', lastName: 'O\'Connor', email: 'liam.oc@dublin-cloud.ie', phone: '+35315559988', jobTitle: 'Infrastructure Architect', city: 'Dublin', country: 'IE', lifetimeValue: 56000, leadScore: 81, tags: 'pro,dev-api,webhooks' },
  { firstName: 'Mei', lastName: 'Ling', email: 'mei.ling@sg-investments.sg', phone: '+6565551122', jobTitle: 'Managing Director', city: 'Singapore', country: 'SG', lifetimeValue: 210000, leadScore: 99, tags: 'vip,enterprise,finance' },
  { firstName: 'Oliver', lastName: 'Smith', email: 'oliver.smith@london-fintech.co.uk', phone: '+442075553344', jobTitle: 'Head of Compliance', city: 'London', country: 'GB', lifetimeValue: 78000, leadScore: 84, tags: 'enterprise,gdpr,banking' },
];

export async function seedAdvancedContacts(prisma: PrismaClient, organizationId: string) {
  console.log(`Seeding ${ADVANCED_CONTACTS.length} advanced contacts for org ${organizationId}...`);
  const created = [];

  for (const c of ADVANCED_CONTACTS) {
    const contact = await prisma.contact.create({
      data: {
        organizationId,
        firstName: c.firstName,
        lastName: c.lastName,
        email: c.email,
        phone: c.phone,
        jobTitle: c.jobTitle,
        city: c.city,
        country: c.country,
        lifetimeValue: c.lifetimeValue,
        leadScore: c.leadScore,
        tags: c.tags,
      },
    });
    created.push(contact);
  }

  console.log(`Successfully seeded ${created.length} contacts.`);
  return created;
}
