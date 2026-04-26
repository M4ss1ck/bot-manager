require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL || "",
});

const db = new PrismaClient({ adapter });

/**
 * Utility for easy modifications in DB
 * This example will delete all bots
 */
const reset = async () => {
  const res = await db.bot.deleteMany();
  console.log(res);
};

reset();
