import { C180ZIndex } from "@ffilip/mui-react-utils";
import { Backdrop, CircularProgress } from "@mui/material";

interface IProps {
  open?: boolean;
}



/**
 * Lightweight modal overlay component for localized loading states.
 *
 * Renders a semi-transparent `Backdrop` with a centered `CircularProgress`,
 * positioned absolutely within its parent element.
 *
 * Useful for blocking interaction with a specific section (e.g. a table or card)
 * while asynchronous operations are in progress.
 *
 * @param {Object} props - Component props.
 * @param {boolean} [props.open=false] - Whether the modal overlay is visible.
 *
 * @example
 * ```tsx
 * <Box sx={{ position: "relative" }}>
 *   <TableContent />
 *   <C180Modal open={loading} />
 * </Box>
 * ```
 */
function C180Modal({ open }: IProps) {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: C180ZIndex.backdrop,
        position: "absolute"
      }}
      open={!!open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}



export { C180Modal };