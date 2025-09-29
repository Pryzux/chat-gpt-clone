import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("routes/mainPage", 'routes/mainPage.tsx'),
  route("api/auth/*", "routes/auth-handler.ts"),
] satisfies RouteConfig;
