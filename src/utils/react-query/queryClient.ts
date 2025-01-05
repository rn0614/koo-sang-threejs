import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

const queryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus:false, // 탭전환해서 돌아올 시
        retryOnMount:true,          // 컴포넌트가 다시 마운트 될 때
        refetchOnReconnect:false,   // 인터넷 연결이 다시 연결
        retry: false,
        staleTime:30,
        cacheTime:30,               // gcTime, staleTime보다 김
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
