import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const cities = [
    { name: "Jakarta" },
    { name: "Surabaya" },
    { name: "Bandung" },
    { name: "Medan" },
    { name: "Semarang" },
    { name: "Makassar" },
    { name: "Palembang" },
    { name: "Tangerang" },
    { name: "Depok" },
    { name: "South Tangerang" },
  ];

  for (const city of cities) {
    await prisma.city.upsert({
      where: { name: city.name },
      update: {},
      create: city,
    });
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
