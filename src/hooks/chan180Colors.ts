import { useMemo } from "react";
import { colors } from "@mui/material";
import { useIsThemeDark } from "../mui/mui";




type IChan180Colors = {
  greenC: string;
  redC: string;
  yellowC: string;
  isDark: boolean;
  blueC: string;
  labelC: string;
  borderC: string;
};


export function useChan180Colors() {
  const { isThemeDark } = useIsThemeDark();

  const trColors = useMemo<IChan180Colors>(
    () => ({
      greenC: colors.green[isThemeDark ? 400 : 900],
      redC: colors.red[isThemeDark ? 300 : 800],
      yellowC: colors.yellow[isThemeDark ? 300 : 900],
      blueC: colors.blue[isThemeDark ? 400 : 900],
      isDark: isThemeDark,
      labelC: isThemeDark ? "#f3fb97" : "#335a53",
      borderC: isThemeDark ? colors.grey[500] : colors.grey[500]
    }), [isThemeDark]
  );

  return trColors;
}