import { useEffect, useRef } from "react";



/**
 * React hook that stores and returns the previous value of a given variable.
 *
 * @template T
 * @param {T} value - The current value to track.
 * @returns {T | undefined} The previous value from the last render, or `undefined` on the first render.
 *
 * @example
 * ```tsx
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 * 
 * useEffect(() => {
 *   console.log(`Previous: ${prevCount}, Current: ${count}`);
 * }, [count]);
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}