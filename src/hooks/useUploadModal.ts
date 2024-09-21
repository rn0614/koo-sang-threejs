import { atom, useRecoilState } from 'recoil';

// 모달의 상태를 관리하는 atom 생성
const uploadModalState = atom<boolean>({
  key: 'uploadModalState', // Recoil의 고유 key
  default: false, // 초기값: 모달이 닫혀있는 상태
});

// 모달 상태를 제어하는 custom hook
export default function useUploadModal() {
  const [isOpen, setIsOpen] = useRecoilState(uploadModalState);

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
