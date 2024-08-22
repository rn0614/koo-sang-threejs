"use client"
import React, { useState } from "react";
const DynamicSelects = ({ tree, columns }: { tree: any, columns:string[] }) => {
  const initialSelectedState = columns.reduce((acc, column) => {
    acc[column] = "";
    return acc;
  }, {} as Record<string, string>);

  const [selectedColumns, setSelectedColumns] = useState(initialSelectedState);

  const handleChange = (column: string, value: string) => {
    setSelectedColumns((prev) => {
      const newState = { ...prev, [column]: value };

      // 리셋해야 하는 컬럼의 값을 초기화합니다.
      if (column === "column1") {
        newState.column2 = "";
        newState.column3 = "";
        newState.column4 = "";
      } else if (column === "column2") {
        newState.column3 = "";
        newState.column4 = "";
      } else if (column === "column3") {
        newState.column4 = "";
      }

      return newState;
    });
  };

  const getFinalOptions = () => {
    const finalOptions = tree[selectedColumns.column1]?.[selectedColumns.column2]?.[selectedColumns.column3];
    if (Array.isArray(finalOptions)) {
      return finalOptions;
    } else if (finalOptions && typeof finalOptions === "object") {
      return Object.keys(finalOptions);
    }
    return [];
  };

  return (
    <div>
      <div>
        <label>Select Column 1:</label>
        <select
          value={selectedColumns.column1}
          onChange={(e) => handleChange("column1", e.target.value)}
        >
          <option value="">-- Select --</option>
          {Object.keys(tree).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Select Column 2:</label>
        <select
          value={selectedColumns.column2}
          onChange={(e) => handleChange("column2", e.target.value)}
          disabled={!selectedColumns.column1}
        >
          <option value="">-- Select --</option>
          {selectedColumns.column1 &&
            Object.keys(tree[selectedColumns.column1] || {}).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label>Select Column 3:</label>
        <select
          value={selectedColumns.column3}
          onChange={(e) => handleChange("column3", e.target.value)}
          disabled={!selectedColumns.column2}
        >
          <option value="">-- Select --</option>
          {selectedColumns.column2 &&
            Object.keys(tree[selectedColumns.column1][selectedColumns.column2] || {}).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label>Select Column 4:</label>
        <select
          value={selectedColumns.column4}
          onChange={(e) => handleChange("column4", e.target.value)}
          disabled={!selectedColumns.column3}
        >
          <option value="">-- Select --</option>
          {getFinalOptions().map((value: string) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DynamicSelects;