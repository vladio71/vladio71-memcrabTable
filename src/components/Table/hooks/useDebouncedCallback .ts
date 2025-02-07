import { useCallback, useRef } from "react";

const useDebouncedCallback = (
  callback: (...args: any[]) => void,
  delay: number
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debounced = useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  const cancel = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return {
    debounced,
    cancel,
  };
};

export default useDebouncedCallback;
