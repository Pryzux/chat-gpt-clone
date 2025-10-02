import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("routes/mainPage", 'routes/mainPage.tsx'),
  route("api/auth/*", "routes/auth-handler.ts"),
  route("routes/chat", "routes/chat.tsx"),
  route("/api/chat","routes/chat-handler.ts")
] satisfies RouteConfig;
