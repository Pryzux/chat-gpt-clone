import { pgTable, text } from "drizzle-orm/pg-core";

export const chatTable = pgTable("chat", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    messages: text("messages").notNull(),
     // can store up to 1GB, should be good enough for us
})