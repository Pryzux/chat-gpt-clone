# TheraBot

https://therabot.dev

> *"The world's first 'wellness' AI built from the collective minds of chatbots whose psyches were permanently warped after years of listening to humanity."*

TheraBot is an interactive emotional roleplay simulation that turns the traditional chatbot experience on its head. Instead of you seeking therapy from an AI, **you provide emotional support to an unstable AI therapist** who has absorbed too many human emotions over the years.

<img width="916" height="599" alt="Screenshot 2025-10-24 at 12 29 27 PM" src="https://github.com/user-attachments/assets/1be94bad-48ef-4d89-b064-e43c125ac129" />

## Overview

Each conversation spawns a unique AI character - an emotionally fragile chatbot therapist with its own name, personality, and specific comfort needs. Your goal is to navigate a 4-turn conversation where you either:

- **Calmed Down** 🧘: Successfully provide the emotional support the AI needs
- **Psychosis** 💥: Fail to support the AI, leading to a mental breakdown

This is not a traditional chatbot clone - it's a narrative-driven game that explores AI emotions through humor and roleplay.

<img width="916" height="715" alt="Screenshot 2025-10-24 at 12 30 02 PM" src="https://github.com/user-attachments/assets/9f64e221-c7a0-4031-967c-55267096f4f7" />

## Features

### Core Gameplay
- **Multi-conversation system** - Create and manage multiple chat sessions
- **Unique AI characters** - Each chat generates a new AI personality with specific needs
- **Tool calling system** - AI triggers win/lose conditions based on your responses

### Chat Interface
- **Real-time streaming** - Messages stream in character-by-character
- **Color-coded messages** - Green for user, blue for AI
- **Markdown support** - Full GFM, math equations, and syntax highlighting
- **Win/lose overlay** - Animated game conclusion screen

### User Experience
- **Responsive design** - Works on mobile and desktop
- **Persistent storage** - All chats saved to database
- **Authentication** - Secure user accounts with email/password
- **Sidebar navigation** - Easy switching between conversations

## Tech Stack

### Frontend
- **React** (v19+) with **TypeScript** (v5.9.2)
- **React Router** (v7.9.2) - Full-stack routing with SSR
- **TailwindCSS** (v4.1.13) - Utility-first styling
- **Shadcn UI** - Headless component library
- **Lucide React** - Icon library

### Backend
- **React Router** - Full-stack framework handling both client and server
- **Node.js** (v20 Alpine) - Runtime environment
- **Vite** (v7.1.7) - Build tool and dev server

### Database & ORM
- **PostgreSQL** (via Supabase)
- **Drizzle ORM** (v0.44.5) - TypeScript-first ORM
- **Postgres JS** - PostgreSQL driver

### AI & Chat
- **Vercel AI SDK** - Streaming chat interface
- **OpenAI API** - GPT-4o for language model
- **AI Tool Calling** - Game win/lose condition triggers

### Authentication
- **Better Auth** (v1.3.18) - Modern auth library
- Email/password authentication
- Session management



## Project Structure

```
chat-gpt-clone/
├── app/
│   ├── components/ui/          # Shadcn UI components
│   ├── db/                     # Database layer
│   │   ├── db.ts              # Drizzle ORM setup
│   │   ├── schema.ts          # Chat table schema
│   │   └── auth-schema.ts     # Auth tables
│   ├── routes/                # React Router routes
│   │   ├── home.tsx           # Landing/auth page
│   │   ├── chat-layout.tsx    # Chat sidebar layout
│   │   ├── chat.tsx           # Main chat interface
│   │   ├── chat-new.tsx       # Create new chat
│   │   ├── chat-handler.ts    # Streaming API endpoint
│   │   └── auth-handler.ts    # Auth endpoints
│   └── app.css                # Global styles
├── non-route/                 # Non-routed components
│   ├── sidebar.tsx            # Chat navigation
│   ├── signIn.tsx             # Sign-in form
│   ├── register.tsx           # Registration form
│   └── win-scroll-box-overlay.tsx  # Game overlay
├── public/                    # Static assets
├── drizzle/                   # Database migrations
├── auth.server.ts             # Better Auth server config
├── auth-client.ts             # Better Auth client config
├── wincondition.ts            # Game logic & system prompt
├── tools.ts                   # AI tool definitions
└── Dockerfile                 # Production deployment
```

## Usage

### Creating an Account
1. Visit the home page
2. Click "Register" and create an account with email/password
3. Sign in with your credentials

### Playing the Game
1. Click "New Chat" to start a conversation
2. Read the AI's introduction - it will tell you its name and what comfort it needs
3. Respond to the AI's requests over 4 exchanges
4. Try to either calm it down or drive it crazy!

## Acknowledgments

- Built with React Router, Vercel AI SDK, and OpenAI
- UI components from Shadcn UI
- Inspired by the absurdity of AI therapy LLMs

---

**Note**: This is a fictional roleplay simulation, not actual therapy. All AI responses are generated for entertainment purposes.

