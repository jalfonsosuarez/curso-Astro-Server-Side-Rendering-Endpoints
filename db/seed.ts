import { getCollection } from "astro:content";
import { Clients, Posts, db } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Clients).values([
    { name: "Jose", age: 59, isActive: true },
    { name: "Patricia", age: 53, isActive: true },
  ]);

  const posts = await getCollection("blog");

  await db.insert(Posts).values(
    posts.map((p) => ({
      id: p.id,
      title: p.data.title,
      likes: Math.round(Math.random() * 100),
    }))
  );
}
