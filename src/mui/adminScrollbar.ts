import { useIsMUIMobile } from "./mui";


/**
 * React hook that returns a CSS class name for enabling the custom admin scrollbar.
 * On mobile devices (below `'md'` breakpoint), no class is returned.
 *
 * @returns {string}
 * `"adminscrollbar"` when on desktop, or an empty string on mobile.
 *
 * @example
 * ```tsx
 * const scrollbarClass = useAdminScrollbar();
 * return <div className={scrollbarClass}>Content</div>;
 * ```
 */
export function useAdminScrollbar(): string {
  const isMobile = useIsMUIMobile();
  const className = isMobile ? "" : "adminscrollbar";

  return className;
}