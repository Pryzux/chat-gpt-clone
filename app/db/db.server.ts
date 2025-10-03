import type { UIMessage } from "ai";
import { and, eq } from "drizzle-orm";
import { db } from "./db"; // path to your db.ts
import { chatTable } from "./schema";

type DbChat = {
  id: string;
  userId: string;
  messages: string;
};

export type Chat = {
  id: string;
  userId: string;
  messages: UIMessage[];
};

export async function listChats(userId: string): Promise<string[]> {
  const results = await db
    .select({ id: chatTable.id })
    .from(chatTable)
    .where(eq(chatTable.userId, userId));

  return results.map((row) => row.id);
}

export async function getChat(id: string, userId: string): Promise<Chat | null> {
  const results = await db
    .select()
    .from(chatTable)
    .where(and(eq(chatTable.id, id), eq(chatTable.userId, userId)));

  if (results.length === 0) return null;
  return toChat(results[0] as DbChat);
}

export async function saveChat(chat: Chat): Promise<any> {
  const dbChat = toDbChat(chat);
  return await db
    .insert(chatTable)
    .values(dbChat)
    .onConflictDoUpdate({
      target: chatTable.id,
      set: dbChat,
    });
}

function toChat(row: DbChat): Chat {
  return {
    id: row.id,
    userId: row.userId,
    messages: JSON.parse(row.messages) as UIMessage[],
  };
}

function toDbChat(chat: Chat): DbChat {
  return {
    id: chat.id,
    userId: chat.userId,
    messages: JSON.stringify(chat.messages),
  };
}
