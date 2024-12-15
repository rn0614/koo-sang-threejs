export function wait(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function list2GroupedMap<T extends Record<string, any>>(
  list: T[],
  goupingData: string,
  initgroupedMap?: any
) {
  const groupedByList = initgroupedMap || new Map<string, T[]>();
  list.forEach((item: T) => {
    if (!groupedByList.has(item[goupingData])) {
      console.log("here1", item);
      groupedByList.set(item[goupingData], [item]);
    } else {
      console.log("here2", item);
      groupedByList.get(item[goupingData])!.push(item);
    }
  });
  return groupedByList;
}
