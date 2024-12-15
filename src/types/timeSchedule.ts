export default interface TimeSchedule {
  id: number;
  day:string;
  text: string;
  startTime: number;
  endTime: number;
  type: string;
  isChange?: boolean;
}
