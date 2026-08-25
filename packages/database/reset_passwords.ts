import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@easychat/auth';

const prisma = new PrismaClient();

async function main() {
  const newHash = await hashPassword('AdminPass123!');
  
  // Update all users' passwords to AdminPass123! for convenience during testing
  const result = await prisma.user.updateMany({
    data: {
      passwordHash: newHash,
    },
  });

  console.log(`Successfully reset password to "AdminPass123!" for ${result.count} accounts.`);
}

main().finally(() => prisma.$disconnect());
