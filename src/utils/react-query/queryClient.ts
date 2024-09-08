import { MutationCache, QueryCache, QueryClient } from "react-query";

const queryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        cacheTime: 0,
      },
    },
    queryCache: new QueryCache({
      onError: queryErrorHandler,
    }),
    mutationCache: new MutationCache({
      onError: queryErrorHandler,
    }),
  });
};

const queryErrorHandler = () => {};

export default queryClient;
