import { DependencyList, EffectCallback, useEffect, useRef } from "react";



/**
 * React hook that mimics the behavior of `componentDidUpdate` in class components.
 *
 * Runs the provided effect **only after the component has mounted**, effectively skipping
 * the first render but running on all subsequent updates when dependencies change.
 *
 * @param {EffectCallback} effect - Imperative function that can optionally return a cleanup function.
 * @param {DependencyList} [deps] - Optional dependency array that controls when the effect should re-run.
 *
 * @example
 * ```tsx
 * const [count, setCount] = useState(0);
 *
 * useDidUpdateEffect(() => {
 *   console.log("Runs only after mount and when count changes:", count);
 * }, [count]);
 * ```
 */
export function useDidUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return effect();
    }
    else {
      didMountRef.current = true;
    }
  }, deps);
}