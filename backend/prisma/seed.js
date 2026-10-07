import { PrismaClient } from "@prisma/client";
import { SKILLS } from "../../ai/skills/skillTaxonomy.js";

const prisma = new PrismaClient();

async function main() {
  for (const skill of SKILLS) {
    await prisma.skill.upsert({
      where: { slug: skill.id },
      update: {
        name: skill.name,
        category: skill.category,
      },
      create: {
        slug: skill.id,
        name: skill.name,
        category: skill.category,
      },
    });
  }

  console.log(`Seeded ${SKILLS.length} NextRole skills.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
