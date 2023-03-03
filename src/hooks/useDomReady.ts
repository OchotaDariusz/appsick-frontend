import { useEffect, useState } from "react";

const useDomReady = (): boolean => {
  const [isDomReady, setIsDomReady] = useState(false);

  useEffect(() => {
    setIsDomReady(true);
  }, [setIsDomReady]);

  return isDomReady;
};

export default useDomReady;
