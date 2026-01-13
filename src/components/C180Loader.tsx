import { Box, LinearProgress, SxProps, Theme } from "@mui/material";
import { Centered } from "./Centered";

interface IProps {
  open?: boolean;
  sx?: SxProps<Theme>;
  LPsx?: SxProps<Theme>;
}



/**
 * Compact centered loader component for section-level or small-area loading states.
 * Designed for lightweight use cases where a full modal or backdrop is unnecessary.
 *
 * Displays a horizontally centered `LinearProgress` bart.
 * Can be customized with additional layout (`sx` and `LPsx`) styles.
 * 
 * @param {Object} props - Component props.
 * @param {boolean} [props.open=false] - Whether the loader is visible.
 * @param {SxProps<Theme>} [props.sx] - Custom styles for the wrapper `Box` container.
 * @param {SxProps<Theme>} [props.LPsx] - Custom styles for the inner `LinearProgress` bar.
 *
 * @example
 * ```tsx
 * <C180Loader
 *   open={loading}
 *   sx={{ mb: 3 }}
 *   LPsx={{ bgcolor: "#334", "& .MuiLinearProgress-bar": { bgcolor: "#8ba4c5" } }}
 * />
 * ```
 */
function C180Loader({ open, sx, LPsx }: IProps) {
  return (
    <Box
      sx={{
        position: "relative",
        width: 1,
        height: "1px",
        ...sx
      }}
    >
      {open && (
        <Centered
          sx={{
            px: 5,
            position: "absolute",
            left: 0, top: 0, right: 0
          }}
        >
          <LinearProgress
            color="inherit"
            sx={{
              width: 1,
              maxWidth: 360,
              height: 2,
              borderRadius: "1px",
              ...LPsx
            }}
          />
        </Centered>
      )}
    </Box>
  );
}



export { C180Loader };