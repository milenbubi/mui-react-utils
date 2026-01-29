import { useState, useEffect, useRef } from "react";



/**
 * A React hook that observes the width of a DOM element using ResizeObserver.
 *
 * @template T - The type of HTMLElement to observe (e.g., HTMLDivElement, SVGSVGElement, etc.).
 * @returns {{ htmlElementRef: React.RefObject<T>, width: number }}
 * An object containing:
 *   - htmlElementRef: a React ref to attach to the target element.
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
 * The hook uses the ResizeObserver API and observes the content box of the element.
 * The generic type T must extend HTMLElement. You can override the default element type 
 * by passing a specific HTMLElement type when calling the hook.
 */
export function useResizeObserver<T extends HTMLElement>(): { htmlElementRef: React.RefObject<T>; width: number; } {
  const htmlElementRef = useRef<T>(null);
  const [width, setWidth] = useState(0);


  useEffect(() => {
    const el = htmlElementRef.current;

    if (!el) {
      return;
    }

    const observer = new ResizeObserver(entries => {
      if (entries[0]) {
        setWidth(entries[0]?.contentRect.width ?? 0);
      }
    });

    observer.observe(el, { box: "content-box" });

    return () => {
      observer.disconnect();
    }
  }, [htmlElementRef]);


  return { htmlElementRef, width };
}