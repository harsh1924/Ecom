import type { inferRouterOutputs } from "@trpc/server";

import { AppRouter } from "@/trpc/routers/_app";

export type CategoriesGetManyOutput = inferRouterOutputs<AppRouter>["categories"]["getMany"];