import { useState, useRef, useCallback } from "react";



/**
 *  A React hook that observes the width of a DOM element using ResizeObserver,
 * supporting dynamic mount and unmount of the element.
 *
 * @template T - The type of HTMLElement to observe (e.g., HTMLDivElement, SVGSVGElement, etc.).
 * @returns {{ htmlElementRef: (node: T | null) => void, width: number }}
 * An object containing:
 *   - htmlElementRef: a callback ref to attach to the target element.
 *   - width: the current width of the observed element in pixels.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { htmlElementRef, width } = useResizeObserver<HTMLDivElement>();
 *
 *   return (
 *     <div ref={htmlElementRef} style={{ padding: "40px", border: "1px solid black" }}>
 *       <p>{`Width: ${width}px`}</p>
 *     </div>
 *   );
 * }
 * ```
 *
 * @remarks
 * This version of the hook uses a callback ref instead of RefObject, which allows
 * it to automatically disconnect the ResizeObserver when the element unmounts,
 * reset the width to 0, and reconnect when it mounts again. 
 * 
 * It observes the content box (`content-box`) of the element.
 * The generic type T must extend HTMLElement. You can override the default element type 
 * by passing a specific HTMLElement type when calling the hook.

 */
export function useResizeObserver<T extends HTMLElement>(): {
  htmlElementRef: (node: T | null) => void;
  width: number;
} {
  const [width, setWidth] = useState(0);
  const observerRef = useRef<ResizeObserver | null>(null);


  const htmlElementRef = useCallback((node: T | null) => {
    if (observerRef.current) {  // Disconnect old observer on mount
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!node) {  // Element unmounted
      setWidth(0);  // Reset width on unmount
      return;
    }

    const observer = new ResizeObserver(entries => {
      if (entries[0]) {  // Update width when element resizes
        setWidth(entries[0].contentRect.width ?? 0);
      }
    });

    observer.observe(node, { box: "content-box" });  // Observe the content box of the element
    observerRef.current = observer; // store observer to disconnect later
  }, []);


  return { htmlElementRef, width };
}