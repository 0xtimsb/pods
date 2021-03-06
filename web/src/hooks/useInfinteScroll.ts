import { useState, useEffect, useCallback, useRef } from "react";

const useInfiniteScroll = (callback: () => any) => {
  const [isFetching, setIsFetching] = useState(false);
  const scrollWindowRef = useRef<HTMLElement>();

  const handleScroll = useCallback(() => {
    if (scrollWindowRef.current) {
      const scrolled = scrollWindowRef.current.scrollTop;
      const height = scrollWindowRef.current.scrollHeight;
      const top = scrollWindowRef.current.getBoundingClientRect().top;
      const bottom = scrollWindowRef.current.getBoundingClientRect().bottom;
      console.log(top, bottom, scrolled + height);
      if (-150 > scrolled || isFetching) return;
      setIsFetching(true);
    }
  }, [isFetching]);

  useEffect(() => {
    if (scrollWindowRef.current) {
      scrollWindowRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollWindowRef.current) {
        return scrollWindowRef.current.removeEventListener(
          "scroll",
          handleScroll
        );
      }
    };
  }, [scrollWindowRef.current]);

  useEffect(() => {
    if (!isFetching) return;
    if (callback) {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  return { isFetching, setIsFetching, scrollWindowRef };
};

export default useInfiniteScroll;
