const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

/**
 * Utility for easy modifications in DB
 * This example will delete all bots
 */
const reset = async () => {
  const res = await db.bot.deleteMany();
  console.log(res);
};

reset();
