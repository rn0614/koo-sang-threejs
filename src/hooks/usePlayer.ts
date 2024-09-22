import { atom, useRecoilState } from "recoil";

// Define atoms for storing the ids and the activeId
export const idsState = atom<number[]>({
  key: 'idsState', // Unique ID for this atom
  default: [], // Default value
});

export const activeIdState = atom<number | undefined>({
  key: 'activeIdState',
  default: undefined,
});

// Custom hook to provide similar functionality to Zustand store
export default function usePlayer() {
  const [ids, setIdsState] = useRecoilState(idsState);
  const [activeId, setActiveIdState] = useRecoilState(activeIdState);

  const setId = (id: number) => {
    setActiveIdState(id);
  };

  const setIds = (ids: number[]) => {
    setIdsState(ids);
  };

  const reset = () => {
    setIdsState([]);
    setActiveIdState(undefined);
  };

  return {
    ids,
    activeId,
    setId,
    setIds,
    reset,
  };
}
