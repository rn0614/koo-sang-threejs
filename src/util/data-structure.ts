interface JsonItem<T> {
  [key: string]: T;
}

interface TreeStructure {
  [key: string]: any; // 트리 구조의 중첩 수준에 따라 다를 수 있기 때문에 `any`를 사용
}

export const convertJson2Tree = <T extends string>(
  jsonData: JsonItem<T>[],
  columns: Array<keyof JsonItem<T>>
): TreeStructure => {
  const tree: TreeStructure = {};

  jsonData.forEach((item) => {
    let currentLevel = tree;

    columns.forEach((column, index) => {
      const value = item[column] as string;

      if (index === columns.length - 1) {
        // 마지막 컬럼에서는 값을 배열로 처리
        if (!currentLevel[value]) {
          currentLevel[value] = [];
        }
        if (!currentLevel[value].includes(item[column])) {
          currentLevel[value].push(item[column]);
        }
      } else {
        // 중간 컬럼에서는 객체로 처리
        if (!currentLevel[value]) {
          currentLevel[value] = {};
        }
        currentLevel = currentLevel[value];
      }
    });
  });

  return tree;
};