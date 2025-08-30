import { db } from "../src/lib/prisma";
import { redis } from "../src/lib/redis";


const main = async () => {
  console.log("🌱 Iniciando seed...");
  const alice = await db.subscription.create({
    data: { name: "Alice", email: "alice@example.com" },
  });
  const bob = await db.subscription.create({
    data: { name: "Bob", email: "bob@example.com" },
  });
  const charlie = await db.subscription.create({
    data: { name: "Charlie", email: "charlie@example.com" },
  });
  console.log("✅ Usuários criados no Postgres");
  await redis.zadd("referral:ranking",
    3, alice.id,
    2, bob.id,
    1, charlie.id,
  );
  console.log("✅ Ranking inicial salvo no Redis");
  await db.$disconnect();
  await redis.quit();
}

main().catch((e) => {
  console.error(e);
  db.$disconnect();
  redis.quit();
  process.exit(1);
});
