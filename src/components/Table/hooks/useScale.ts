import gsap from "gsap";
import { useRef, useState } from "react";

const useScale = () => {
  const [scale, setScale] = useState(1);
  const mainTableRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const LeftPanelRef = useRef<HTMLDivElement>(null);
  const BottomPanelRef = useRef<HTMLDivElement>(null);
  const leftTableWrap = useRef<HTMLDivElement>(null);

  const scaleRef = useRef<HTMLDivElement>(null);
  const [boxHelper, setBoxHelper] = useState<{
    x: number;
    y: number;
  }>();

  function handleScrollSync() {
    if (mainTableRef.current) {
      if (BottomPanelRef.current)
        BottomPanelRef.current.scrollLeft = mainTableRef.current.scrollLeft;
      if (scale == 1) {
        if (LeftPanelRef.current)
          LeftPanelRef.current.scrollTop = mainTableRef.current.scrollTop;
      } else if (scale < 1) {
        if (LeftPanelRef.current)
          LeftPanelRef.current.scrollTop =
            mainTableRef.current.scrollTop / scale;
      } else if (scale > 1) {
        if (LeftPanelRef.current)
          LeftPanelRef.current.scrollTop =
            mainTableRef.current.scrollTop * scale;
      }
    }
  }

  const handleZoomIn = () => {
    const newScale = Math.max(scale + 0.1, 0.2);

    gsap.set(LeftPanelRef.current, {
      scale: newScale,
      transformOrigin: "top left",
    });

    setScale(newScale);
  };

  const handleZoomOut = () => {
    const newScale = Math.max(scale - 0.1, 0.2);

    gsap.set(LeftPanelRef.current, {
      scale: newScale,
      transformOrigin: "top left",
    });

    setScale(newScale);
  };

  return {
    scale,
    tableRef,
    leftTableWrap,
    mainTableRef,
    LeftPanelRef,
    BottomPanelRef,
    scaleRef,
    handleZoomIn,
    handleZoomOut,
    boxHelper,
    setBoxHelper,
    handleScrollSync,
  };
};

export default useScale;
