import { useMemo } from "react";
import { colors } from "@mui/material";
import { useIsThemeDark } from "./mui";

type IChan180Colors = Record<
  "greenC" | "redC" | "yellowC" | "blueC" | "labelC" | "borderC" | "bgrC",
  string
> & { isDark: boolean };



/**
 * React hook that provides a consistent color palette for the Chan180 project,
 * adapting automatically to the current MUI theme mode (light or dark).
 *
 * Uses MUI's built-in color system and the `useIsThemeDark` hook to dynamically
 * return a set of themed color values for UI components.
 *
 * @returns {IChan180Colors} An object containing theme-aware color values:
 * - `greenC`: shade of green (lighter in dark mode)
 * - `redC`: shade of red (lighter in dark mode)
 * - `yellowC`: shade of yellow (lighter in dark mode)
 * - `blueC`: shade of blue (lighter in dark mode)
 * - `isDark`: boolean indicating whether the current theme is dark
 * - `labelC`: custom text/label color tuned per mode
 * - `borderC`: neutral grey border color
 * - `bgrC`: background color tuned for the current theme (darker in dark mode)
 *
 * @example
 * ```tsx
 * import { useChan180Colors } from "@ffilip/mui-react-utils";
 *
 * export default function Example() {
 *   const { greenC, redC, labelC, isDark } = useChan180Colors();
 *
 *   return (
 *     <Box sx={{ backgroundColor: greenC, color: labelC, p: 2 }}>
 *       {isDark ? "Dark mode colors" : "Light mode colors"}
 *     </Box>
 *   );
 * }
 * ```
 */
export function useChan180Colors(): IChan180Colors {
  const { isThemeDark } = useIsThemeDark();

  const chan180Colors = useMemo<IChan180Colors>(
    () => ({
      greenC: colors.green[isThemeDark ? 400 : 900],
      redC: colors.red[isThemeDark ? 300 : 800],
      yellowC: colors.yellow[isThemeDark ? 300 : 900],
      blueC: colors.blue[isThemeDark ? 400 : 900],
      isDark: isThemeDark,
      labelC: isThemeDark ? "#f3fb97" : "#335a53",
      borderC: isThemeDark ? colors.grey[500] : colors.grey[500],
      bgrC: isThemeDark ? "#0b0d0e" : "#fbfcfe",

    }), [isThemeDark]
  );

  return chan180Colors;
}