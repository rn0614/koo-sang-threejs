// store/useUserStore.ts
import { create } from 'zustand';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';

type UserStore = {
  user: any;
  loading: boolean;
  fetchUser: () => Promise<void>;
  signOut: () => Promise<void>; // 로그아웃 액션 추가
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: true,
  fetchUser: async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      set({ user: null, loading: false });
    } else {
      set({ user: data?.user, loading: false });
    }
  },

  signOut: async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error('Error signing out');
      console.error('Error signing out:', error);
    } else {
      set({ user: null }); // 로그아웃 시 유저 상태를 null로 설정
    }
  },
}));

export default useUserStore;
