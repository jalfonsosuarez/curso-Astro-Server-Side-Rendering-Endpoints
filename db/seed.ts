import { Clients, db } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Clients).values([
    { name: "Jose", age: 59, isActive: true },
    { name: "Patricia", age: 53, isActive: true },
  ]);
}
