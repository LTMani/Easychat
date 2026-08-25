import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, firstName: true, lastName: true, createdAt: true },
  });
  console.log('Registered Users in DB:');
  console.table(users);
}

main().finally(() => prisma.$disconnect());
