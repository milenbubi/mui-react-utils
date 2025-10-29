
import { useMemo } from "react";
import { useTheme, useMediaQuery, Breakpoint } from "@mui/material";



/**
 * React hook that determines whether the current MUI theme is in dark mode.
 *
 * @returns {{ isThemeDark: boolean }} 
 * Returns an object with a single boolean property:
 * - `isThemeDark` — `true` if the current theme's palette mode is `'dark'`, otherwise `false`.
 *
 * @example
 * ```tsx
 * const { isThemeDark } = useIsThemeDark();
 * console.log(isThemeDark ? "Dark mode" : "Light mode");
 * ```
 */
export function useIsThemeDark(): { isThemeDark: boolean; } {
  const theme = useTheme();

  return {
    isThemeDark: theme.palette.mode === "dark"
  };
}



/**
 * React hook that returns the current active MUI breakpoint key (e.g. `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`).
 * It listens to screen size changes and updates automatically.
 *
 * @returns {Breakpoint}
 * The current breakpoint key based on the theme’s responsive configuration.
 *
 * @example
 * ```tsx
 * const width = useWidth();
 * console.log(`Current breakpoint: ${width}`);
 * ```
 */
export function useWidth(): Breakpoint {
  const theme = useTheme();
  const keys = useMemo(() => [...theme.breakpoints.keys], []);


  return keys.reduce<Breakpoint>((prev, curr) => {
    const match = useMediaQuery(theme.breakpoints.up(curr));
    return match ? curr : prev;
  }, "xs");
}



/**
 * React hook that determines whether the viewport width is considered "mobile"
 * according to the MUI theme (below `'md'` breakpoint).
 *
 * @returns {boolean}
 * `true` if the screen width is below the `'md'` breakpoint, otherwise `false`.
 *
 * @example
 * ```tsx
 * const isMobile = useIsMUIMobile();
 * console.log(isMobile ? "Mobile layout" : "Desktop layout");
 * ```
 */
export function useIsMUIMobile(): boolean {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile;
}