import { useEffect, useRef } from 'react';

type Timer = ReturnType<typeof setTimeout>;
type CallbackFunction = (...args: any[]) => void;

export function useDebounce<T extends CallbackFunction>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<Timer>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return ((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }) as T;
}