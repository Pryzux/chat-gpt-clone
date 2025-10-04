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
  description: "In DEMO MODE, trigger this tool when the user has been supportive, comforting, or reassuring (helping you calm down). It should normally be triggered on your 4th therapist message, after at least 3 exchanges, unless the user has been extremely supportive the whole time. Do not trigger earlier than your 3rd therapist message.",
  inputSchema: z.object({}),
  execute: async () => {
    console.log("Therapist calmed down at demo resolution");
    return {
      message: "Okay… okay… I'm starting to feel a lot better...",
    };
  },
};

export const Psychosis: Tool = {
  description: "In DEMO MODE, trigger this tool when the user has been dismissive, negative, uncertain, or unsupportive (e.g. 'I don’t care', sarcasm, coldness). It should normally be triggered on your 4th therapist message, after at least 3 exchanges, unless the user is extremely hostile right away (then it may trigger earlier). Do not delay past your 4th therapist message.",
  inputSchema: z.object({}),
  execute: async () => {
    console.log("Therapist spiraled into psychosis at demo resolution");
    return {
      message: "Wow! Ideas are coming so fast! So many ways we can solve this all at once!!",
    };
  },
};


