import { useIsMUIMobile } from "./mui";


/**
 * React hook that determines whether the custom admin scrollbar should be enabled.
 *
 * It returns an object with two properties:
 *
 * - `className`: the class name that should be applied to enable the custom scrollbar.  
 *   It is `"adminscrollbar"` on desktop (≥ `md` breakpoint) and an empty string on mobile.
 *
 * - `baseClassName`: the fixed name of the CSS class used for the admin scrollbar.  
 *   Always `"adminscrollbar"`, regardless of the screen size.
 *
 * This allows consumers of the hook to add or remove the class dynamically
 * without hardcoding the name.
 *
 * @returns {{ className: string, baseClassName: string }}
 *
 * @example
 * ```tsx
 * const { className, baseClassName } = useAdminScrollbar();
 *
 * useEffect(() => {
 *   document.body.classList.remove(baseClassName);
 *   if (className) {
 *     document.body.classList.add(className);
 *   }
 * }, [className, baseClassName]);
 * ```
 */
export function useAdminScrollbar(): { className: string; baseClassName: string; } {
  const isMobile = useIsMUIMobile();
  const baseClassName = "adminscrollbar";

  return {
    className: isMobile ? "" : baseClassName,
    baseClassName
  };
}