import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@easychat/auth';

const prisma = new PrismaClient();

async function main() {
  const targetPassword = process.env.NEW_PASSWORD || process.env.DEFAULT_SEED_PASSWORD;
  if (!targetPassword) {
    console.error('Error: Please provide NEW_PASSWORD environment variable.');
    process.exit(1);
  }

  const newHash = await hashPassword(targetPassword);

  const result = await prisma.user.updateMany({
    data: {
      passwordHash: newHash,
    },
  });

  console.log(`Successfully updated passwords for ${result.count} accounts.`);
}

main().finally(() => prisma.$disconnect());
