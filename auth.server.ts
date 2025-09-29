import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./app/db/db";
import * as schema from './app/db/auth-schema';

///Users/jared/repos/chat-gpt-clone/app/db/auth-schema.ts
///Users/jared/repos/chat-gpt-clone/auth.server.ts

export const auth = betterAuth({
    emailAndPassword: { enabled: true },
    database: drizzleAdapter(db, { provider: "pg", schema }),
});

