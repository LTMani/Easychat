import { PrismaClient } from '@prisma/client';

export async function seedTicketsAndSla(prisma: PrismaClient, organizationId: string) {
  console.log(`Seeding SLA policies, support tickets, and breach logs for org ${organizationId}...`);

  // 1. Create Enterprise SLA Policy
  const slaPolicy = await prisma.slaPolicy.create({
    data: {
      organizationId,
      name: 'Enterprise VIP 15m Response SLA',
      description: 'Strict 15m first response SLA for enterprise tier accounts',
      priority: 'URGENT',
      firstResponseMinutes: 15,
      nextResponseMinutes: 60,
      resolutionMinutes: 120,
      isDefault: true,
    },
  });

  const contacts = await prisma.contact.findMany({ where: { organizationId }, take: 5 });

  const TICKETS_DATA = [
    { subject: 'Database webhook latency spike in EU-Central', priority: 'URGENT', status: 'IN_PROGRESS', category: 'INFRASTRUCTURE' },
    { subject: 'SSO Okta metadata certificate renewal needed', priority: 'HIGH', status: 'OPEN', category: 'SECURITY' },
    { subject: 'WhatsApp template broadcast rejected by Meta', priority: 'MEDIUM', status: 'RESOLVED', category: 'CHANNELS' },
    { subject: 'Request for custom field CSV export script', priority: 'LOW', status: 'CLOSED', category: 'SUPPORT' },
    { subject: 'Payment invoice credit note adjustment', priority: 'HIGH', status: 'OPEN', category: 'BILLING' },
  ];

  const createdTickets = [];
  for (let i = 0; i < TICKETS_DATA.length; i++) {
    const t = TICKETS_DATA[i];
    const contact = contacts[i % contacts.length];
    const ticketNum = `TKT-${2026}-${String(i + 101).padStart(4, '0')}`;

    const ticket = await prisma.ticket.create({
      data: {
        organizationId,
        slaPolicyId: slaPolicy.id,
        contactId: contact ? contact.id : null,
        ticketNumber: ticketNum,
        subject: t.subject,
        description: `Customer submitted issue regarding ${t.subject}. Detailed environment context attached.`,
        priority: t.priority,
        status: t.status,
        category: t.category,
        firstResponseDueAt: new Date(Date.now() + 15 * 60 * 1000),
        resolutionDueAt: new Date(Date.now() + 120 * 60 * 1000),
        firstRespondedAt: t.status === 'RESOLVED' || t.status === 'CLOSED' ? new Date(Date.now() - 60 * 60 * 1000) : null,
        resolvedAt: t.status === 'RESOLVED' || t.status === 'CLOSED' ? new Date() : null,
      },
    });

    if (t.priority === 'URGENT') {
      await prisma.slaBreachLog.create({
        data: {
          slaPolicyId: slaPolicy.id,
          ticketId: ticket.id,
          breachType: 'FIRST_RESPONSE',
          targetMinutes: 15,
          actualMinutes: 42,
          breachedAt: new Date(Date.now() - 30 * 60 * 1000),
        },
      });
    }

    createdTickets.push(ticket);
  }

  console.log(`Seeded ${createdTickets.length} support tickets with SLA logs.`);
  return { slaPolicy, tickets: createdTickets };
}
