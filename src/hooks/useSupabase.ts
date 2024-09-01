// client 단에서 쓰기 위한 hook 인데 mocking이 supabase에 의존하기도 하고
// 다른 backend 프로젝트 구축시 걷어내기가 매우 어려워 지므로 모든 요청은 next back단을 거쳐서 supabase로 가도록 설정

import { useMemo } from 'react';
import { getSupabaseBrowserClient } from '@/utils/supabase/client';
 
function useSupabase() {
  return useMemo(getSupabaseBrowserClient, []);
}
 
export default useSupabase;