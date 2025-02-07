"use client";

import { useEffect, FC, RefObject } from "react";
import useTableLogic from "../hooks/useTableLogic";
import TableRow from "./TableRow";
import TableCellWrapper from "../TableCellWrapper";
import { TableContext } from "../tableContext";
import Button from "../../elements/Button";
import { FaPlus } from "react-icons/fa6";
import { createPortal } from "react-dom";
import useScale from "../hooks/useScale";
import { IoMdClose } from "react-icons/io";
import useResize from "../hooks/useResize";
import useDebouncedCallback from "../hooks/useDebouncedCallback ";

type TableTypes = {
  rows: number;
  cols: number;
  isInputsBarOpen: boolean;
  numberOfElementsToHighlight: number;
  inputBarRef: RefObject<HTMLDivElement | null>;
};

const SCROLL_HEIGHT = 8;

const Table: FC<TableTypes> = ({
  rows,
  cols,
  isInputsBarOpen,
  numberOfElementsToHighlight,
  inputBarRef,
}) => {
  const height = useResize(isInputsBarOpen);

  const {
    tableData,
    sumOfRows,
    halfPercentile,
    heatMap,
    sortedValues,
    recalculateData,
    clearHightights,
    addRow,
    deleteRow,
    incrementCell,
    setElementsToHighlightPerormancePlusEdition,
    handleHeatMap,
    handleHeatMapLeave,
  } = useTableLogic(numberOfElementsToHighlight);

  useEffect(() => {
    recalculateData(rows, cols);
  }, [rows, cols]);

  const {
    scale,
    tableRef,
    mainTableRef,
    LeftPanelRef,
    BottomPanelRef,
    handleZoomIn,
    handleZoomOut,
    handleScrollSync,
  } = useScale();

  const { debounced: handleHover, cancel: cancelHandleHover } =
    useDebouncedCallback((amount: number) => {
      setElementsToHighlightPerormancePlusEdition(
        sortedValues,
        amount,
        numberOfElementsToHighlight
      );
    }, 100);

  return (
    <>
      <h1 className="relative  m-4">Awesome Table</h1>

      <TableContext.Provider
        value={{
          incrementCell,
          handleHover,
          scale,
        }}
      >
        <>
          {inputBarRef &&
            inputBarRef.current &&
            createPortal(
              <Button onClick={addRow} className="h-[50px]" icon={<FaPlus />}>
                Add Row
              </Button>,
              inputBarRef.current
            )}
          <div className="fixed left-[5vw] top-1/3">
            <Button
              onClick={handleZoomIn}
              className="w-10"
              disabled={scale >= 1}
            >
              +
            </Button>
            <button></button>

            <Button onClick={handleZoomOut} className="w-10">
              -
            </Button>
          </div>
          <div className="max-w-[80vw] max-h-[80vh] row-span-2">
            <div
              className={`relative  grid grid-cols-8 max-h-[${height + 100}px]`}
            >
              <div
                onMouseLeave={cancelHandleHover}
                className={`col-span-7 h-[${height}px]`}
                style={{
                  height,
                }}
              >
                <div
                  ref={mainTableRef}
                  onScroll={handleScrollSync}
                  className={`max-h-[${height}px] inline-block overflow-scroll h-[${height}px] w-full`}
                  style={{
                    maxHeight: height + SCROLL_HEIGHT,
                    height: height + SCROLL_HEIGHT,
                  }}
                >
                  <table className="w-full table h-full" ref={tableRef}>
                    <tbody onMouseLeave={clearHightights}>
                      {tableData.map((tableRow, id) => {
                        return (
                          <TableRow
                            items={tableRow}
                            rowId={id}
                            sum={sumOfRows[id]}
                            deleteRow={deleteRow}
                            clearHightights={clearHightights}
                            isHeatmapView={heatMap[id]}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div
                className={`col-span-1  max-h-[${height}px] `}
                style={{
                  height: height,
                }}
              >
                <div
                  ref={LeftPanelRef}
                  className="h-full w-full overflow-hidden"
                  style={{
                    height: height / scale,
                    minWidth: 200,
                  }}
                >
                  <table className="table h-full w-full">
                    <tbody>
                      {sumOfRows &&
                        sumOfRows.map((sum, rowId) => {
                          return (
                            <tr>
                              <TableCellWrapper
                                className="w-[70%]"
                                onMouseEnter={() => handleHeatMap(rowId)}
                                onMouseLeave={() => handleHeatMapLeave(rowId)}
                              >
                                {sum}
                              </TableCellWrapper>
                              <TableCellWrapper
                                onClick={() => deleteRow(rowId)}
                              >
                                <Button
                                  className="bg-red-500 hover:bg-red-600 transition m-auto duration-150 hover:text-black"
                                  icon={<IoMdClose />}
                                />
                              </TableCellWrapper>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                ref={BottomPanelRef}
                className="h-full overflow-x-hidden col-span-7"
              >
                <table
                  className="w-full"
                  style={{
                    width: `calc(100% - ${SCROLL_HEIGHT}px)`,
                  }}
                >
                  <tbody>
                    <tr>
                      {halfPercentile.map((half) => (
                        <TableCellWrapper className="">{half}</TableCellWrapper>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      </TableContext.Provider>
    </>
  );
};

export default Table;
