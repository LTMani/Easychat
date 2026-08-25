import { PrismaClient } from '@prisma/client';

export async function seedConversationsAndMessages(prisma: PrismaClient, organizationId: string) {
  console.log(`Seeding omnichannel conversations and messages for org ${organizationId}...`);

  const contacts = await prisma.contact.findMany({ where: { organizationId }, take: 4 });
  const CHANNELS = ['EMAIL', 'WHATSAPP', 'LIVE_CHAT', 'SMS'];

  const createdConversations = [];

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const channel = CHANNELS[i % CHANNELS.length];

    const conversation = await prisma.conversation.create({
      data: {
        organizationId,
        contactId: contact.id,
        channel,
        status: 'OPEN',
        priority: 'NORMAL',
        subject: `Inbound inquiry via ${channel} from ${contact.firstName} ${contact.lastName}`,
        messages: {
          create: [
            {
              senderType: 'CUSTOMER',
              senderId: contact.id,
              content: `Hi team, I would like to inquire about enterprise volume pricing and custom SLA options for our European branch.`,
              type: 'TEXT',
              metadata: JSON.stringify({ sentiment: 'POSITIVE', channel }),
            },
            {
              senderType: 'AGENT',
              senderId: 'agent_sys_01',
              content: `Hello ${contact.firstName}! Thank you for reaching out. We would be delighted to put together a tailored proposal for your team. What is your estimated user count?`,
              type: 'TEXT',
              metadata: JSON.stringify({ delivered: true, channel }),
            },
            {
              senderType: 'CUSTOMER',
              senderId: contact.id,
              content: `We currently have 45 active support agents and 12 sales managers across Germany and France.`,
              type: 'TEXT',
              metadata: JSON.stringify({ entities: [{ type: 'NUMBER', value: '45' }, { type: 'LOCATION', value: 'Germany' }] }),
            },
          ],
        },
      },
    });

    createdConversations.push(conversation);
  }

  console.log(`Seeded ${createdConversations.length} conversation threads with messages.`);
  return createdConversations;
}
