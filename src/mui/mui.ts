
import { useMemo } from "react";
import { useTheme, useMediaQuery } from "@mui/material";


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



export function useWidth() {
  const theme = useTheme();
  const keys = useMemo(() => [...theme.breakpoints.keys], []);


  return keys.reduce((prev, curr) => {
    const match = useMediaQuery(theme.breakpoints.up(curr));
    return match ? curr : prev;
  }, "xs");
}



export function useIsMUIMobile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile;
}



export function useAdminScrollbar() {
  const isMobile = useIsMUIMobile();
  const className = isMobile ? "" : "adminscrollbar";

  return className;
}