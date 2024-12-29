import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul") 

export function getCurrentTime(){
  return dayjs().locale("ko").tz();
}

export function getKoTime(date:Date){
  return dayjs(date)
}

export function getKoTimeYYYYMMDD(date:Date){
  return dayjs(date).format('YYYYMMDD')
}

export function getCurrentTimeYYYYMMDD(
  {
    unit = "day",
    delay,
  }: {
    unit: string;
    delay: number;
  } // delay를 밀리초로 받음
): string {
  try {
    let formatString = "YYYY-MM-DD"; // 기본 값

    // delay를 반영한 현재 시간 계산
    const currentTime = dayjs().add(delay, "millisecond");

    switch (unit) {
      case "hour":
        formatString += " HH";
        break;
      case "minute":
        formatString += " HH:mm";
        break;
      case "second":
        formatString += " HH:mm:ss";
        break;
      default:
        throw new Error(
          `Invalid unit provided: ${unit}. Valid units are 'day', 'hour', 'minute', 'second'.`
        );
    }

    return currentTime.format(formatString);
  } catch (error: any) {
    console.error(
      error.message ||
        "An unexpected error occurred while getting the current time."
    );
    throw error; // 에러를 다시 던져서 상위 호출자에게 전파
  }
}

/**
 * 두 날짜 사이의 차이를 계산하여 반환하는 함수.
 *
 * @param date1 - 첫 번째 날짜. "YYYY-MM-DD" 또는 "YYYY-MM-DD HH:mm:ss" 형식의 문자열이어야 합니다.
 * @param date2 - 두 번째 날짜. 기본값은 현재 시간이며, "YYYY-MM-DD" 또는 "YYYY-MM-DD HH:mm:ss" 형식의 문자열이어야 합니다.
 * @param unit - 두 날짜 간 차이를 계산할 단위. 'day', 'hour', 'minute', 'second' 중 하나를 사용합니다. 기본값은 'day'입니다.
 *
 * @returns 두 날짜 간의 차이를 `unit`에 따른 숫자로 반환합니다.
 *
 * @throws Error - 날짜 형식이 잘못된 경우 또는 다른 예상치 못한 에러가 발생한 경우 에러를 발생시킵니다.
 */
export function getDifferenceBetweenDates(
  date1: string,
  date2: string = dayjs().format("YYYY-MM-DD HH:mm:ss"),
  unit: "day" | "hour" | "minute" | "second" = "day"
): number {
  try {
    // 날짜 파싱
    const startDate = dayjs(date1, "YYYY-MM-DD HH:mm:ss");
    const endDate = dayjs(date2, "YYYY-MM-DD HH:mm:ss");

    // 유효성 검사
    if (!startDate.isValid()) {
      throw new Error(
        `Invalid date format for date1: ${date1}. Please use YYYY-MM-DD or YYYY-MM-DD HH:mm:ss format.`
      );
    }

    if (!endDate.isValid()) {
      throw new Error(
        `Invalid date format for date2: ${date2}. Please use YYYY-MM-DD or YYYY-MM-DD HH:mm:ss format.`
      );
    }

    let difference: number;

    switch (unit) {
      case "hour":
        difference = endDate.diff(startDate, "hour");
        break;
      case "minute":
        difference = endDate.diff(startDate, "minute");
        break;
      case "second":
        difference = endDate.diff(startDate, "second");
        break;
      default:
        difference = endDate.diff(startDate, "day");
        break;
    }

    return difference;
  } catch (error: any) {
    console.error(error?.message || "An unexpected error occurred");
    throw error; // 에러를 다시 던져서 상위 호출자에게 전파
  }
}
