import { atom, useRecoilState } from 'recoil';

// 모달의 상태를 관리하는 atom을 정의합니다.
const authModalState = atom<boolean>({
  key: 'authModalState', // 고유한 key 값
  default: false, // 초기 상태는 닫힘(false)으로 설정
});

// Recoil 상태를 이용하여 모달을 제어하는 custom hook
export default function useAuthModal() {
  const [isOpen, setIsOpen] = useRecoilState(authModalState);

  const onOpen = () => {
    setIsOpen(true); // 모달 열기
  };

  const onClose = () => {
    setIsOpen(false); // 모달 닫기
  };

  return {
    isOpen,
    onOpen,
    onClose,
  };
}