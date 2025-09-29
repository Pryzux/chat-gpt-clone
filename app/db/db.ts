import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./auth-schema";

// Ensure DATABASE_URL is defined
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

const client = postgres(connectionString);
export const db = drizzle(client, { schema });