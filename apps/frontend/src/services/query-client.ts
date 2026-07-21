import { QueryClient } from '@tanstack/react-query';

let queryClient: QueryClient | undefined;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 2,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 1,
      },
    },
  });
}

export function createQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  }
  if (!queryClient) {
    queryClient = makeQueryClient();
  }
  return queryClient;
}
