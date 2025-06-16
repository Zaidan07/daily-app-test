import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      name: 'Admin One',
      email: 'admin@thousanddream.com',
      password: 'admin123',
      role: Role.ADMIN,
    },
    {
      name: 'Raihan',
      email: 'raihan@thousanddream.com',
      password: 'password',
      role: Role.USER,
    },
    {
      name: 'Abby',
      email: 'abby@thousanddream.com',
      password: 'password',
      role: Role.USER,
    },
    {
      name: 'Habib',
      email: 'habib@thousanddream.com',
      password: 'password',
      role: Role.USER,
    },
    {
      name: 'Daffa',
      email: 'daffa@thousanddream.com',
      password: 'password',
      role: Role.USER,
    },
    {
      name: 'Afif',
      email: 'afif@thousanddream.com',
      password: 'password',
      role: Role.USER,
    },
    {
      name: 'Yudha',
      email: 'yudha@thousanddream.com',
      password: 'password',
      role: Role.USER,
    },
  ];

  for (const user of users) {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          role: user.role,
          password: await bcrypt.hash(user.password, 10), 
        },
      });
      console.log(`✅ User created: ${user.email}`);
    } else {
      console.log(`⚠️  User already exists: ${user.email}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
