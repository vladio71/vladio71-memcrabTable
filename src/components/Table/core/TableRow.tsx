import { useEffect, useMemo, useRef, useState } from "react";
import TableCel, { Cell } from "./TableCel";
import TableCellWrapper from "../TableCellWrapper";
import { Func } from "../hooks/useTableLogic";
import useTableContext from "../tableContext";
import { createPortal } from "react-dom";
import Button from "@/components/elements/Button";
import { IoMdClose } from "react-icons/io";

const TableRow = ({
  items,
  rowId,
  sum,
  isHeatmapView,
}: {
  items: Cell[];
  sum: number;
  rowId: number;
  deleteRow: Func<number>;
  clearHightights: Func<void>;
  isHeatmapView: boolean;
}) => {
  const largestNumber = useMemo(
    () => Math.max(...items.map((cell) => cell.amount)),
    [items]
  );

  return (
    <>
      <tr key={rowId}>
        {items.map(({ id, amount, isHighlighted }, colId) => (
          <TableCel
            key={id}
            id={id}
            sum={sum}
            rowId={rowId}
            colId={colId}
            amount={amount}
            isHeatmapView={isHeatmapView}
            largestNumber={largestNumber}
            isHighlighted={isHighlighted}
          />
        ))}
      </tr>
    </>
  );
};

export default TableRow;
