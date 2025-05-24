import { useEffect, useState, useRef } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
      ...options,
    });

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]);

  return [ref, isVisible];
};

export default useIntersectionObserver;
