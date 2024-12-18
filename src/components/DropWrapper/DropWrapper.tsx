import React, { useRef } from "react";
import DropArea from "../DropArea/DropArea";
import styles from "./DropWrapper.module.scss";

type DropWrapperProps<T> = {
  areaList: T[] | undefined;
  addBox: any;
  day: string;
};

export default function DropWrapper<
  T extends { startTime: number; endTime: number; id: number }
>({ areaList, addBox, day }: DropWrapperProps<T>) {
  const ref = useRef<HTMLTableRowElement>(null);
  const wrapperList = Array.from({ length: 24 }, (v, k) => k);
  const resultList = wrapperList.map((time) => {
    // areaList에서 해당 시간과 일치하는 요소 찾기
    const found = areaList?.find((area) => area.startTime === time) ?? null;
    // 일치하는 요소가 있으면 그 요소의 id를 사용, 없으면 null
    return {
      time,
      data: found,
    };
  });

  const dropCheckHandler = (data: any, item: any, monitor: any) => {
    let diff = Math.floor(
      (monitor.getInitialClientOffset()!.y -
        monitor.getInitialSourceClientOffset()!.y) /
        20
    );
    let downsideCheck = data.time - diff;
    let upsideCheck =
      data.time + item.data.endTime - item.data.startTime - diff;
    let check = resultList.every((row) => {
      let diffRow =
        row.data !== null ? row.data?.endTime - row.data?.startTime - 1 : 0;
      if (upsideCheck > 24 || downsideCheck < 0) return false;
      if (row.data?.id == item.data.id) return true;
      if (row.time >= upsideCheck || row.time + diffRow < downsideCheck)
        return true;
      if (row.data === null) return true;
      return false;
    });
    return check;
  };

  return (
    <div ref={ref} className={styles["wrapper"]}>
      <div>{day}</div>
      {wrapperList.map((_, idx) => (
        <DropArea
          key={idx}
          addBox={addBox}
          time={idx}
          data={resultList[idx]}
          day={day}
          dropCheckHandler={dropCheckHandler}
        ></DropArea>
      ))}
    </div>
  );
}
