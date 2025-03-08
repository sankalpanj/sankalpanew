import { AppRouter } from "@/server/routers/app-routes";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>({});
