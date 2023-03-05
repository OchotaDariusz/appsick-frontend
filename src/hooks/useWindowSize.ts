import { useEffect, useState } from "react";

/**
 * Use Window Size
 * @returns actual window size(viewport)
 */
const useWindowSize: () => number = () => {
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

  useEffect(() => {
    window.onresize = () => {
      setWindowSize(window.innerWidth);
    };
  }, [setWindowSize]);

  return windowSize;
};

export default useWindowSize;
