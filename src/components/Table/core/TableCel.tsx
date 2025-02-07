import { FC, useMemo } from "react";
import TableCellWrapper from "../TableCellWrapper";
import useTableContext from "../tableContext";

type CellId = number; // unique value for all table
type CellValue = number; // three digit random number

export type Cell = {
  id: CellId;
  amount: CellValue;
  isHighlighted?: boolean;
};

interface TableCelProps extends Cell {
  sum: number;
  colId: number;
  rowId: number;
  largestNumber: number;
  isHighlighted?: boolean;
  isHeatmapView?: boolean;
}

const TableCel: FC<TableCelProps> = ({
  id,
  amount,
  isHighlighted,
  isHeatmapView,
  largestNumber,
  colId,
  rowId,
  sum,
}) => {
  const { handleHover, incrementCell, scale } = useTableContext();

  const persentage = useMemo(() => {
    return Math.round(amount / (sum / 100));
  }, [amount, sum]);

  const color = useMemo(
    () => getColorFromValue(amount / largestNumber),
    [amount, largestNumber]
  );

  function getColorFromValue(value: number) {
    value = Math.max(0, Math.min(1, value));
    const darkGreen = [15, 102, 41];
    const darkYellow = [107, 94, 46];
    const deepRed = [191, 49, 49];

    const mix = (start: number[], end: number[], factor: number) =>
      start.map((s, i) => Math.round(s + (end[i] - s) * factor));

    const color =
      value < 0.5
        ? mix(darkGreen, darkYellow, value * 2)
        : mix(darkYellow, deepRed, (value - 0.5) * 2);

    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  }

  const styles = {
    scaled: {
      fontSize: 24 * scale,
      width: scale * 2.5 + "rem",
      height: scale * 2.5 + "rem",
    },
    highlight: isHighlighted ? "bg-highlight " : "",
    heatmap: isHeatmapView
      ? {
          background: isHeatmapView ? color : "",
        }
      : {},
  };

  return (
    <TableCellWrapper
      key={id}
      className={styles.highlight + styles.scaled}
      style={{ ...styles.heatmap, ...styles.scaled }}
      onMouseEnter={() => handleHover(amount)}
      onClick={() => incrementCell(rowId, colId)}
    >
      {isHeatmapView ? persentage + "%" : amount}
    </TableCellWrapper>
  );
};

export default TableCel;
