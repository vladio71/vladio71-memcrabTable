import React, { ChangeEvent, useMemo, useRef, useState } from "react";
import InputsBar from "./InputsBar";
import Table from "./Table/core/Table";

export type VoidFunc = (param: any) => void;

const App = () => {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(15);
  const [numberOfElementsToHighlight, setNumberOfHighlightedElements] =
    useState(100);
  const xConstraint = useMemo(() => rows * cols - 1, [rows, cols]);
  const inputBarRef = useRef<HTMLDivElement | null>(null);
  const [isInputsBarOpen, setIsImputsBarOpen] = useState<boolean>(false);

  function handleSetNumberOfElementsToHighlight(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const val = parseInt(e.target.value);
    if (val < 0 || val > xConstraint) return;

    setNumberOfHighlightedElements(val);
  }

  function handleSetCols(e: React.ChangeEvent<HTMLInputElement>) {
    const val = parseInt(e.target.value);
    if (val < 0 || val > 100) return;
    setCols(val);
  }

  function handleSetRows(e: React.ChangeEvent<HTMLInputElement>) {
    const val = parseInt(e.target.value);
    if (!val || val < 0 || val > 100) return;
    setRows(val);
  }

  return (
    <>
      <main className="h-[100vh] flex flex-col justify-start items-center  overflow-auto">
        <InputsBar
          handleSetNumberOfElementsToHighlight={
            handleSetNumberOfElementsToHighlight
          }
          handleCols={handleSetCols}
          handleRows={handleSetRows}
          isOpen={isInputsBarOpen}
          setIsImputsBarOpen={setIsImputsBarOpen}
          inputBarRef={inputBarRef}
        />
        <Table
          rows={rows}
          cols={cols}
          numberOfElementsToHighlight={numberOfElementsToHighlight}
          isInputsBarOpen={isInputsBarOpen}
          inputBarRef={inputBarRef}
        />
      </main>
    </>
  );
};

export default App;
