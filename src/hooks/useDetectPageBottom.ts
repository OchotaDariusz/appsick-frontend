import { useEffect, useState } from "react";

const useDetectPageBottom = (): boolean => {
  const [isPageOnBottom, setIsPageOnBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const { scrollTop } = document.documentElement;

      const hasReachedBottom = offsetHeight - (innerHeight + scrollTop) <= 10;

      setIsPageOnBottom(hasReachedBottom);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isPageOnBottom;
};

export default useDetectPageBottom;
