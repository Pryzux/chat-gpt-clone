import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("api/auth/*", "routes/auth-handler.ts"),
  route("api/chat", "routes/chat-handler.ts"),

  // -- Chat section with sidebar 
  route("chat", "routes/chat-layout.tsx", [
    index("routes/chat-welcome.tsx"), 
    route(":id", "routes/chat.tsx"),
    route("new", "routes/chat-new.tsx"),
  ]),
] satisfies RouteConfig;