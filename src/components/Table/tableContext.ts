import { RefObject, createContext, useContext } from "react";

type TableContext = {
  incrementCell: (rowId: number, colId: number) => void;
  handleHover: (...args: any[]) => void;
  scale: number;
};

export const TableContext = createContext<TableContext | undefined>(undefined);

export default function useTableContext() {
  const context = useContext(TableContext);
  if (!context)
    throw Error(
      "useTableContext can only be used inside an TableContext.Provider"
    );
  return context;
}
