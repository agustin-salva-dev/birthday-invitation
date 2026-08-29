import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GUEST_NAMES = [
  "Nora Coronel",
  "Laura Coronel",
  "Francisco",
  "Julio",
  "Gonzalo",
  "Aye",
  "Emi",
  "Cami",
  "Patricia",
  "Way",
  "Kiara",
  "Laura",
  "Mariel",
  "Cande",
  "Ana",
  "Carli",
  "Cyn",
  "Bety",
  "Vicky",
  "Sabri",
  "Ceci",
  "Lauty",
  "Lu",
  "Thiago",
  "Erica",
];

async function main() {
  console.log("🐉 Seeding 50 guests to Neon DB...");

  await prisma.guest.deleteMany();

  const created = await prisma.guest.createMany({
    data: GUEST_NAMES.map((name) => ({ name })),
  });

  console.log(`✅ ${created.count} guests created successfully!`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
