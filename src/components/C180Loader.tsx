import { StackProps, LinearProgress, SxProps, Theme } from "@mui/material";
import { Centered } from "./Centered";

interface IProps extends StackProps {
  open?: boolean;
  LPsx?: SxProps<Theme>;
}



/**
 * Compact centered loader component for inline or section-level loading states.
 *
 * Displays a horizontally centered `LinearProgress` bar wrapped in a `Centered` layout.
 * Can be customized with additional layout (`sx`) and progress (`LPsx`) styles.
 *
 * Designed for lightweight use cases where a full modal or backdrop is unnecessary.
 *
 * @param {Object} props - Component props.
 * @param {boolean} [props.open=false] - Whether the loader is visible.
 * @param {SxProps<Theme>} [props.sx] - Custom styles for the outer `Centered` container.
 * @param {SxProps<Theme>} [props.LPsx] - Custom styles for the inner `LinearProgress` bar.
 *
 * @example
 * ```tsx
 * <C180Loader
 *   open={loading}
 *   sx={{ mt: 3 }}
 *   LPsx={{ bgcolor: "#334", "& .MuiLinearProgress-bar": { bgcolor: "#8ba4c5" } }}
 * />
 * ```
 */
function C180Loader({ sx, LPsx, open, ...other }: IProps) {
  if (!open) {
    return null;
  }


  return (
    <Centered
      sx={{
        px: 5,
        display: "flex",
        ...sx,
      }}
      {...other}
    >
      <LinearProgress
        color="inherit"
        sx={{
          width: 1,
          maxWidth: 360,
          height: 4,
          borderRadius: "2px",
          ...LPsx
        }}
      />
    </Centered>
  );
}



export { C180Loader };