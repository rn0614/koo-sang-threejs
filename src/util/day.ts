import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale("ko");

/**
 * 한국 현재시간을 출력하는 함수.
 *
 * @param unit - 출력할 시간의 단위를 지정. 'day', 'hour', 'minute', 'second' 중 하나를 선택할 수 있습니다. 기본값은 'day'입니다.
 *
 * @returns 현재 시간을 지정된 단위 형식에 따라 문자열로 반환합니다.
 *
 * @throws Error - 유효하지 않은 `unit` 값이 전달되었을 때 에러를 발생시킵니다.
 */
export function getCurrentTime(
  unit: "day" | "hour" | "minute" | "second" = "day"
): string {
  try {
    let formatString = "YYYY-MM-DD"; // 기본 값

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

    return dayjs().format(formatString);
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
