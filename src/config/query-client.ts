import { QueryClient } from "@tanstack/react-query";

export const clients: QueryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
