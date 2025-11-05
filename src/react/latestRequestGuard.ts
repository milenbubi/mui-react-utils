import { useRef } from "react";



/**
 * React hook that prevents race conditions between overlapping async requests.
 *
 * Each time `register()` is called, a unique request ID is recorded.
 * Later, when the async operation finishes, you can verify if the request
 * is still the latest one using `isOutdated(id)`.
 *
 * This helps ensure that stale responses (from earlier requests)
 * don't overwrite newer state updates.
 *
 * @returns {{
 *   register: () => number,
 *   isOutdated: (id: number) => boolean
 * }} An object with two helper functions:
 * - `register()` — creates and stores a new unique request ID.
 * - `isOutdated(id)` — returns `true` if the given request is no longer the latest.
 *
 * @example
 * ```tsx
 * const { register, isOutdated } = useLatestRequestGuard();
 *
 * const loadData = async () => {
 *   const id = register();
 *   const data = await fetchSomething();
 *   if (isOutdated(id)) { return; }  // ignore outdated result
 *   setData(data);
 * };
 * ```
 */
export function useLatestRequestGuard(): {
  register: () => number;
  isOutdated: (id: number) => boolean;
} {
  const lastRequestId = useRef(0);


  const register = () => {
    const id = Date.now();
    lastRequestId.current = id;
    return id;
  };


  const isOutdated = (id: number) => {
    return lastRequestId.current !== id;
  };


  return { register, isOutdated };
}
