// db.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// import all schema files you want Drizzle to know about
import * as authSchema from "./auth-schema";
import * as chatSchema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

const client = postgres(connectionString);

// merge schemas together so drizzle knows about all tables
export const db = drizzle(client, { schema: { ...authSchema, ...chatSchema } });
