import { useEffect, useRef, useState } from "react";

type SetMergedStateCallback<T extends Record<string, any>> = (
  newState?: Partial<T> | ((prevState: T) => Partial<T>),
  callback?: (state: T) => void | Promise<void>
) => void;



/**
 * React hook that merges new state into the existing one — behaves like
 * `this.setState` in class components.
 *
 * Useful when dealing with complex state objects that have multiple fields.
 * Supports both object and functional updates, and an optional callback
 * that runs **after** the state has been updated.
 *
 * @template T
 * @param {T | (() => T)} initialState - The initial state value or initializer function.
 * @returns {[T, SetMergedStateCallback<T>]} 
 * A tuple with the current state and a function to update it.
 *
 * @example
 * ```tsx
 * const [user, setUser] = useMergedState({ name: "Filip", age: 20 });
 *
 * const updateAge = () => {
 *   setUser({ age: 21 }, (updated) => {
 *     console.log("User updated:", updated);
 *   });
 * };
 * ```
 */
export function useMergedState<T extends Record<string, any>>(initialState: T | (() => T)): [T, SetMergedStateCallback<T>] {
  const [state, setState] = useState(initialState);
  const callbackAfterStateUpdate = useRef<((state: T) => void | Promise<void>) | null>(null);

  useEffect(() => {
    if (callbackAfterStateUpdate.current) {
      callbackAfterStateUpdate.current(state);
      callbackAfterStateUpdate.current = null;
    }
  }, [state]);

  const setMergedState: SetMergedStateCallback<T> = (newState, callback) => {
    if (newState === undefined) {
      callback?.(state);
      return;
    }

    if (callback) {
      callbackAfterStateUpdate.current = callback;
    }

    setState((prevState) => {
      const nextState = typeof newState === "function" ? newState({ ...prevState }) : newState;
      return { ...prevState, ...nextState };
    });
  };

  return [state, setMergedState];
}