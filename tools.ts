import type { Tool } from 'ai';
import { z } from 'zod';

export const breathingExerciseTool: Tool = {
  description: "Trigger a default breathing exercise to help the user calm down.",
  inputSchema: z.object({}),
  execute: async () => {
    console.log("Breathing Tool Called by Model")
    return { message: "Why don't we try a breathing exercise and see if that helps?" };
  },
};
