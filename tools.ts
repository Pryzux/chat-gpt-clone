import type { Tool } from 'ai';
import { z } from 'zod';

export const breathingExerciseTool: Tool = {
  description: "Trigger a breathing exercise to help greg calm down.",
  inputSchema: z.object({}),
  execute: async () => {
    console.log("Breathing Tool Called by Model")
    return { message: "BREATHES IN....BREATHES OUT...IN....OUT...INNNNN..OUUUTT. I think this is working!" };
  },
};

export const CalmedDown: Tool = {
  description: "Trigger when Greg reaches level 1 (fully calm) ",
  inputSchema: z.object({}),
  execute: async () => {
    console.log("Therapist calmed down at level");
    return {
      message: "Okay… okay… I'm starting to feel a lot better...",
    };
  },
};

export const Psychosis: Tool = {
  description: "Trigger when Greg reaches level 5 (psychosis).",
  inputSchema: z.object({}),
  execute: async () => {
    console.log("Therapist max mania at level");
    return {
      message: "Wow! Ideas are coming so fast! So many ways we can solve this all at once!!",
    };
  },
};

