import React, { Ref, RefObject, useState } from "react";
import Input from "./elements/Input";
import Button from "./elements/Button";
import { RxHamburgerMenu } from "react-icons/rx";

export type VoidFunc = (param: any) => void;

const InputsBar = ({
  handleSetNumberOfElementsToHighlight,
  handleRows,
  handleCols,
  isOpen,
  setIsImputsBarOpen,
  inputBarRef,
}: {
  isOpen: boolean;
  handleSetNumberOfElementsToHighlight: VoidFunc;
  handleRows: VoidFunc;
  handleCols: VoidFunc;
  setIsImputsBarOpen: VoidFunc;
  inputBarRef: RefObject<HTMLDivElement | null>;
}) => {
  const style = isOpen ? "absolute top-[-1000px]" : "";

  return (
    <div>
      <Button
        onClick={() => setIsImputsBarOpen((prev: boolean) => !prev)}
        className={`absolute top-0 left-0 bg-transparent text-white hover:bg-white/5 `}
        icon={<RxHamburgerMenu />}
      ></Button>
      <div
        className={`flex justify-around w-fit gap-5 items-end flex-wrap p-10 ${style}`}
        ref={inputBarRef}
      >
        <Input
          name="Rows (M)"
          onChange={handleRows}
          type="number"
          min={0}
          max={100}
          placeholder="Enter rows"
        />
        <Input
          name="Cols (N)"
          onChange={handleCols}
          type="number"
          min={0}
          max={100}
          placeholder="Enter columns"
        />

        <Input
          name="Elements to highlight (X)"
          onChange={handleSetNumberOfElementsToHighlight}
          type="number"
          min={0}
          placeholder="Enter elments to highlight"
        />
      </div>
    </div>
  );
};

export default InputsBar;
