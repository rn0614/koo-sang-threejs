import { timeScheduleMock } from "@/mocks/data/time-schedule-list.mock";
import TimeSchedule from "@/types/timeSchedule";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

export const getScheduleListRequest = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSchedule`
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Unknown error");
  }
  return await response.json();
};

export function useScheduler(): [
  TimeSchedule[],
  Dispatch<SetStateAction<TimeSchedule[]>>
] {
  const [wrapper, setWrapper] = useState<TimeSchedule[]>([]);
  const returnData = useQuery<TimeSchedule[]>({
    queryKey: ["schedule-list"],
    queryFn: () => getScheduleListRequest(),
    staleTime: 2000,
  });

  useEffect(() => {
    setWrapper(returnData.data ?? []);
  }, [returnData]);
  return [wrapper, setWrapper];
}
