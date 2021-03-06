import { useState, useEffect, useCallback, useRef } from "react";

const useMessageScroll = (callback: () => any) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isFetching, setIsFetching] = useState(false);

  const scrollToBottom = () => {
    if (scrollRef && scrollRef.current) {
      // Scroll to bottom.
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const handleScroll = useCallback(() => {
    if (scrollRef && scrollRef.current) {
      if (scrollRef.current.scrollTop > 10 || isFetching) return;
      setIsFetching(true);
    }
  }, [isFetching, scrollRef.current]);

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      // Add scroll event listener.
      scrollRef.current.addEventListener("scroll", handleScroll);

      // Scroll to bottom.
      scrollToBottom();

      // Cleanup.
      return () => {
        if (scrollRef && scrollRef.current) {
          scrollRef.current.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, [scrollRef.current]);

  useEffect(() => {
    if (!isFetching) return;
    if (callback) {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  return { scrollRef, isFetching, setIsFetching, scrollToBottom };
};

export default useMessageScroll;
