import { Database } from "./types_db";

type TimeScheduleDto = Database["public"]["Tables"]["schedule_no_rls"]["Row"];
export type TimeSchedule = TimeScheduleDto & {
  isChange?: boolean;
};
