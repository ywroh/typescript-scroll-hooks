import { useRef, useCallback, useEffect } from 'react';

const useScrollFadeIn = () => {
  const dom = useRef<HTMLInputElement>(null);

  const handleScroll = useCallback(([entry]) => {
    const current = dom.current;
    if (entry.isIntersecting && current != null) {
      current.style.transitionProperty = 'opacity transform';
      current.style.transitionDuration = '3s';
      current.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
      current.style.transitionDelay = '0s';
      current.style.opacity = '1';
      current.style.transform = 'translate3d(0, 0, 0)';
    }
  }, []);

  useEffect(() => {
    const { current } = dom;

    if (current) {
      let observer = new IntersectionObserver(handleScroll, { threshold: 0.7 });
      observer.observe(current);

      return () => observer && observer.disconnect();
    }
  }, [handleScroll]);

  return {
    ref: dom,
    style: {
      opacity: 0,
      transform: 'translate3d(0, 50%, 0)',
    },
  };
};

export default useScrollFadeIn;
