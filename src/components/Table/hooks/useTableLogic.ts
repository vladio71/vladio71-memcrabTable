import { useCallback, useMemo, useState } from "react";
import { Cell } from "../core/TableCel";

export type Func<T> = (p: T) => void;
type Handler<T> = (prev: T) => T;
type HandlerFunction = (prev: TableData, cb: Handler<any>) => TableData;
type TableData = Array<Cell[]>;

const useTableLogic = (numberOfElementsToHighlight: number) => {
  const [tableData, setTableData] = useState<TableData>([]);
  const [sumOfRows, setSumOfRows] = useState<number[]>([]);
  const [halfPercentile, setHalfPercentile] = useState<number[]>([]);
  const [heatMap, setHeatMap] = useState<boolean[]>([]);
  const [update, setUpdate] = useState(true);
  const sortedValues = useMemo<Cell[]>(() => {
    return makeSortedArrayFromValuesOfTableData(tableData);
  }, [tableData]);

  function recalculateData(rows: number, cols: number) {
    const data = generateTableData(rows, cols);
    setTableData(data);
    updateSumOfRowsAndLastRow(data);
  }

  function generateTableData(rows: number, cols: number) {
    let data: TableData = Array.from({ length: rows }, (_, rowId) =>
      Array.from({ length: cols }, (_, colId) => {
        return {
          id: rowId * 1000 + colId,
          amount: getRandomNumber(899) + 100,
        };
      })
    );
    return data;
  }

  function handleHeatMap(rowId: number) {
    setHeatMap((prev) => {
      prev[rowId] = true;
      return prev;
    });
    setUpdate(!update);
    clearHightights();
  }

  function handleHeatMapLeave(rowId: number) {
    setHeatMap((prev) => {
      prev[rowId] = false;
      return prev;
    });
    setUpdate(!update);
  }

  const getRandomNumber = (max: number) =>
    Math.floor(Math.random() * (max + 1));

  const updateDataCells = (cb: Handler<Cell>) => {
    tableData.forEach((row, rId) => {
      row.forEach((_, cId) => {
        tableData[rId][cId] = cb(tableData[rId][cId]);
      });
    });
    setTableData([...tableData]);
    setUpdate(!update);
  };

  function incrementCell(rowId: number, colId: number) {
    tableData[rowId][colId] = {
      ...tableData[rowId][colId],
      amount: tableData[rowId][colId].amount + 1,
    };
    setUpdate(!update);
  }

  function addRow() {
    const newRow = Array.from({ length: tableData[0].length }, (_, colId) => {
      return {
        id: tableData.length * 1000 + colId,
        amount: getRandomNumber(999) + 100,
      };
    });
    const newData = [...tableData, newRow];
    setTableData(newData);
    updateSumOfRowsAndLastRow(newData);
  }

  function deleteRow(rowId: number) {
    const newData = tableData.filter((_, id) => id != rowId);
    setTableData(newData);
    updateSumOfRowsAndLastRow(newData);
  }

  function updateSumOfRowsAndLastRow(data: TableData) {
    if (data.length == 0) return;
    const rowSums = data.map(calculateSum);
    setSumOfRows(rowSums);
    setHalfPercentile(vertical2DMap(data));
  }

  function calculateSum(cells: Cell[]) {
    return cells.reduce((prev, curr) => (prev += curr.amount), 0);
  }

  function calculateHalfOfSum(cells: Cell[]) {
    return Math.floor(calculateSum(cells) / 2);
  }

  function vertical2DMap(arr: TableData, cb = calculateHalfOfSum) {
    let rotated2dArray: Cell[][] = [[]];
    for (let i = 0, j = arr.length - 1; i < arr[0].length; j--) {
      if (j < 0) {
        i++;
        if (i < arr[0].length) rotated2dArray.push([]);
        j = arr.length;
        continue;
      }
      rotated2dArray[i].push(arr[j][i]);
    }
    return rotated2dArray.map(cb);
  }

  function clearHightights() {
    updateDataCells((prev) => ({
      ...prev,
      isHighlighted: false,
    }));
  }

  //first try
  const setElementsToHighlight = (
    data: TableData,
    maxHighlightElements: number,
    sortStartPoint2D: number
  ) => {
    let cellsToHighlight: Cell[] = [];
    data.forEach((row) => {
      row.forEach((cell) => {
        cellsToHighlight.push(cell);
      });
    });
    cellsToHighlight.sort(
      (a, b) =>
        Math.abs(sortStartPoint2D - a.amount) -
        Math.abs(sortStartPoint2D - b.amount)
    );
    cellsToHighlight = cellsToHighlight.slice(0, maxHighlightElements);

    const highlightedIds = new Set(cellsToHighlight.map((obj) => obj.id));

    updateDataCells((prev) => {
      const isHighlighted = highlightedIds.has(prev.id);
      return { ...prev, isHighlighted };
    });
  };

  //second try)
  function makeSortedArrayFromValuesOfTableData(data: TableData) {
    let result: Cell[] = [];
    data.forEach((row) => {
      row.forEach((cell) => {
        result.push(cell);
      });
    });
    result.sort((a, b) => a.amount - b.amount);
    return result;
  }

  function setElementsToHighlightPerormancePlusEdition(
    sortedArray: Cell[],
    sortStartPoint2D: number,
    maxHighlightElements: number
  ) {
    if (sortedArray.length <= 1) return;
    //get hovered element from sorted array (sort on change)
    let base = sortedArray.findIndex((cell) => cell.amount == sortStartPoint2D);

    let left = base - 1;
    let right = base + 1;

    const closestElements = [];

    console.log(maxHighlightElements);

    let i = 1;
    //get all values from left right checking lower
    while (
      closestElements.length < maxHighlightElements &&
      (left >= 0 || right < sortedArray.length)
    ) {
      if (left < 0) {
        closestElements.push(sortedArray[right]);
        right++;
      } else if (right >= sortedArray.length) {
        closestElements.push(sortedArray[left]);
        left--;
      } else {
        const leftDiff = Math.abs(sortedArray[left].amount - sortStartPoint2D);
        const rightDiff = Math.abs(
          sortedArray[right].amount - sortStartPoint2D
        );

        if (leftDiff <= rightDiff) {
          closestElements.push(sortedArray[left]);
          left--;
        } else {
          closestElements.push(sortedArray[right]);
          right++;
        }
      }
      i++;
    }

    const highlightedIds = new Set(closestElements.map((obj) => obj.id));
    updateDataCells((prev) => ({
      ...prev,
      isHighlighted: highlightedIds.has(prev.id),
    }));
  }

  return {
    tableData,
    sumOfRows,
    sortedValues,
    halfPercentile,
    heatMap,
    recalculateData,
    generateTableData,
    updateSumOfRowsAndLastRow,
    setElementsToHighlightPerormancePlusEdition,
    clearHightights,
    addRow,
    deleteRow,
    incrementCell,
    handleHeatMap,
    handleHeatMapLeave,
  };
};

export default useTableLogic;
