import { useEffect, useMemo, useState } from "react";

let INITAL_TABLE_HEIGHT = 500;
let FULL_SCREEN_TABLE_HEIGHT = 700;

const useResize = (isInputsBarOpen: boolean) => {
  const [resizeUpdate, setResizeUpdate] = useState(true);

  const height = useMemo(() => {
    if (!isInputsBarOpen) {
      return INITAL_TABLE_HEIGHT;
    } else {
      return FULL_SCREEN_TABLE_HEIGHT;
    }
  }, [isInputsBarOpen, resizeUpdate]);

  function resize() {
    const wHeight = window.innerHeight;
    INITAL_TABLE_HEIGHT = wHeight / 2 + 100;
    FULL_SCREEN_TABLE_HEIGHT = wHeight - 200;
    setResizeUpdate(!resizeUpdate);
  }

  useEffect(() => {
    resize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [resizeUpdate]);

  return height;
};

export default useResize;
