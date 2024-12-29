"use client";
import { useCallback, useEffect, useState } from "react";
import { DropTargetMonitor } from "react-dnd";
import { useScheduler } from "@/hooks/useSchedule";
import { TimeSchedule } from "@/types/timeSchedule";
import DropWrapper from "@/components/DropWrapper/DropWrapper";
import { cloneDeep } from "lodash";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { DndProvider } from "react-dnd-multi-backend";
import styles from "./styles.module.scss";
import { list2GroupedMap } from "@/utils/lib";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek"; // ISO 주 계산
import { handleConfirmAction } from "@/components/ConfirmModal/ConfirmModal";

dayjs.extend(isoWeek); // ISO 주(월요일 시작) 지원

export default function DragDropPage() {
  const today = dayjs().format("YYYY-MM-DD");
  const startOfWeek = dayjs(today).startOf("isoWeek");
  const weekDates = Array.from(
    { length: 7 },
    (_, i) => startOfWeek.add(i, "day").format("YYYY-MM-DD") // 월요일부터 일요일까지
  );
  const newMap = new Map();
  weekDates.forEach((date) => {
    newMap.set(date, []);
  });

  const [schedule, setSchedule, postScheduleListRequest, refetch] =
    useScheduler();
  const [wrapper, setWrapper] = useState<Map<string, TimeSchedule[]>>(newMap);
  const doConfirm = () => {
    handleConfirmAction("confirm-cancel", async () => {
      console.log(wrapper);
      const changeList: TimeSchedule[] = [];
      wrapper.forEach((data) => {
        const changeFileteredMap = data.filter((item) => item?.isChange);
        changeList.push(...changeFileteredMap);
      });
      console.log(postScheduleListRequest);
      await postScheduleListRequest(changeList);
      await refetch();
    });
  };
  const doAdd = () => {};
  const addBox = useCallback(
    (
      time: number,
      item: any,
      monitor: DropTargetMonitor<unknown, unknown>,
      day: string
    ) => {
      let diff = Math.floor(
        (monitor.getInitialClientOffset()!.y -
          monitor.getInitialSourceClientOffset()!.y) /
          20
      );
      setWrapper((preRows) => {
        let itemToMove = cloneDeep(preRows);
        const deleteData = itemToMove.get(item.data.day);
        if (deleteData) {
          const filteredData =
            deleteData.filter((schedule) => {
              console.log("schedule", schedule, item.id);
              return schedule.id !== item.id;
            }) || [];
          itemToMove.set(item.data.day, filteredData);
        }

        const addData = itemToMove.get(day);
        if (addData) {
          const filteredData = [
            ...addData,
            {
              id: item.id,
              day: day,
              text: item.text,
              startTime: time - diff,
              endTime: time + item.data.endTime - item.data.startTime - diff,
              type: item.type,
              isChange: true,
            } as TimeSchedule,
          ];
          itemToMove.set(day, filteredData);
        }
        return itemToMove;
      });
    },
    [setWrapper]
  );
  useEffect(() => {
    const endSchedule = list2GroupedMap(schedule, "day", newMap);
    setWrapper(endSchedule);
  }, [schedule, today]);
  if (!wrapper) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <DndProvider options={HTML5toTouch}>
        <div className={styles["time-schedule-top"]}>
          <div className={styles["sheet-wrapper"]}>
            <div className={styles["time-wrapper"]}>
              {Array.from({ length: 26 }, (v, k) => k - 1).map((item) => (
                <div
                  key={item}
                  style={{
                    height: "20px",
                    backgroundColor: "rgb(178, 178, 178)",
                    textAlign: "right",
                    paddingRight: "5px",
                  }}
                >
                  {item >= 0 ? item : null}
                </div>
              ))}
            </div>
            <DropWrapper
              areaList={wrapper.get(weekDates[0])}
              addBox={addBox}
              day={weekDates[0]}
            />
            <DropWrapper
              areaList={wrapper.get(weekDates[1])}
              addBox={addBox}
              day={weekDates[1]}
            />
            <DropWrapper
              areaList={wrapper.get(weekDates[2])}
              addBox={addBox}
              day={weekDates[2]}
            />
            <DropWrapper
              areaList={wrapper.get(weekDates[3])}
              addBox={addBox}
              day={weekDates[3]}
            />
            <DropWrapper
              areaList={wrapper.get(weekDates[4])}
              addBox={addBox}
              day={weekDates[4]}
            />
            <DropWrapper
              areaList={wrapper.get(weekDates[5])}
              addBox={addBox}
              day={weekDates[5]}
            />
            <DropWrapper
              areaList={wrapper.get(weekDates[6])}
              addBox={addBox}
              day={weekDates[6]}
            />
          </div>
        </div>
        <div>
          <label htmlFor="txt">텍스트</label>
          <input name="txt" placeholder="텍스트"></input>
          <button onClick={doAdd}>추가</button>
          <button onClick={doConfirm}>확정</button>
        </div>
        <div></div>
      </DndProvider>
    </div>
  );
}
