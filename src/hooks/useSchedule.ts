
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const GET_SCHEDULE_LIST = () =>
  `${process.env.NEXT_PUBLIC_API_BACK}/schedule/list`;


export const getScheduleListRequest = async () => {
  try {
    const response = {data: []}
    return response.data;
  } catch (error) {
    throw error;
  }
};

export function useScheduler() {
  const returnData = useQuery<any[]>({
    queryKey: ["schedule-list"],
    queryFn: () => getScheduleListRequest(),
    staleTime: 2000,
  });
  return returnData;
}

const changeData = (inputData:any) => {
  // Creating a Map to group data by type
  const groupedByType = new Map();

  // Filling the map with data grouped by type
  inputData.forEach((item:any) => {
    if (!groupedByType.has(item.type)) {
      groupedByType.set(item.type, []);
    }
    groupedByType.get(item.type).push(item);
  });

  return Array.from(groupedByType.values());
};