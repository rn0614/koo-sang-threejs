//import { timeScheduleMock } from "@/mocks/data/time-schedule-list.mock";
import { TimeSchedule } from "@/types/timeSchedule";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

export const getScheduleListRequest = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/schedule`
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Unknown error");
  }
  return await response.json();
};

export const postScheduleListRequest = async (scheduleList: TimeSchedule[]) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/schedule`,
    {
      method: "POST",
      body: JSON.stringify({
        scheduleList,
      }),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Unknown error");
  }
  return await response.json();
};

export function useScheduler(): [
  TimeSchedule[],
  Dispatch<SetStateAction<TimeSchedule[]>>,
  postScheduleListRequest: any,
  refetch:any
] {
  const [wrapper, setWrapper] = useState<TimeSchedule[]>([]);
  const {data, refetch} = useQuery<TimeSchedule[]>({
    queryKey: ["schedule-list"],
    queryFn: () => getScheduleListRequest(),
    staleTime: 2000,
  });

  useEffect(() => {
    setWrapper(data ?? []);
  }, [data]);
  return [wrapper, setWrapper, postScheduleListRequest, refetch];
}
