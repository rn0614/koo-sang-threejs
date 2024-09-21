import { atom, useRecoilState } from "recoil";

// Define atoms for storing the ids and the activeId
export const idsState = atom<string[]>({
  key: 'idsState', // Unique ID for this atom
  default: [], // Default value
});

export const activeIdState = atom<string | undefined>({
  key: 'activeIdState',
  default: undefined,
});

// Custom hook to provide similar functionality to Zustand store
export default function usePlayer() {
  const [ids, setIdsState] = useRecoilState(idsState);
  const [activeId, setActiveIdState] = useRecoilState(activeIdState);

  const setId = (id: string) => {
    setActiveIdState(id);
  };

  const setIds = (ids: string[]) => {
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
