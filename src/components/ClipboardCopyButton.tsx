import { useMemo, useState } from "react";
import { isMobile } from "@ffilip/chan180-utils/env";
import { IconButton, SxProps, Theme, Box, Tooltip, TooltipProps } from "@mui/material";

import { Iconify } from "./Iconify";
import { C180ZIndex, useChan180Colors } from "../mui";

interface IProps {
  defaultTitle: string;
  textToCopy: string;
  size?: number;
  sx?: SxProps<Theme>;
};



/**
 * Copy-to-clipboard button component for Chan180 projects.
 *
 * Displays an icon button with a tooltip that copies a given text to the clipboard
 * when clicked. The tooltip automatically updates to "Copied" on success and
 * resets to the default title afterward. Works differently on mobile devices to
 * ensure proper user feedback.
 *
 * - Uses `navigator.clipboard.writeText` (only available in HTTPS contexts).
 * - Adapts tooltip behavior for desktop and mobile via `@ffilip/chan180-utils/env.isMobile`.
 * - Integrates with the Chan180 color system through `useChan180Colors()`.
 *
 * @component
 * @example
 * ```tsx
 * import { ClipboardCopyButton } from "@ffilip/mui-react-utils";
 *
 * export default function Example() {
 *   return (
 *     <ClipboardCopyButton
 *       defaultTitle="Copy link"
 *       textToCopy="https://chan180.net"
 *       size={20}
 *     />
 *   );
 * }
 * ```
 *
 * @param {object} props - Component props.
 * @param {string} props.defaultTitle - Default tooltip text (e.g., "Copy").
 * @param {string} props.textToCopy - Text value to be copied to the clipboard.
 * @param {number} [props.size=18] - Icon size in pixels.
 * @param {SxProps<Theme>} [props.sx] - Optional custom styling for the `IconButton`.
 *
 * @returns {JSX.Element | null} The copy button component, or `null` if HTTPS is not available.
 */
function ClipboardCopyButton({ defaultTitle, textToCopy, size = 18, sx }: IProps): JSX.Element | null {
  const { blueC } = useChan180Colors();
  const [open, setOpen] = useState(false);
  const isDeviceMobile = useMemo(() => isMobile(), []);
  const successCopyTitle = useMemo(() => "Copied", []);
  const [tooltip, setTooltip] = useState(defaultTitle);
  const isHTTPS = useMemo(() => window.isSecureContext, []);

  const tooltipProps = useMemo<Partial<TooltipProps>>(() => {
    if (!isDeviceMobile) {
      return { onMouseLeave: () => setTooltip(defaultTitle) };
    }

    return {
      open,
      disableFocusListener: true,
      disableHoverListener: true,
      disableTouchListener: true
    };
  }, [open, defaultTitle]);


  const handleCopy = () => {
    if (isHTTPS && navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setTooltip(successCopyTitle);
          isDeviceMobile && setOpen(true);

          // Automatically hide if current device is mobile
          isDeviceMobile && setTimeout(() => {
            setTooltip(defaultTitle);
            setOpen(false);
          }, 1500);
        })
        .catch(() => { });
    }
  };


  // If the context is not HTTPS, do not render anything
  if (!isHTTPS) {
    return null;
  }


  return (
    <Tooltip
      placement="top-start"
      arrow
      slotProps={{
        popper: {
          sx: {
            zIndex: C180ZIndex.copyButton
          }
        }
      }}
      title={<Box>{tooltip}</Box>}
      {...tooltipProps}
    >
      <IconButton onClick={handleCopy} sx={sx}>
        <Iconify icon="uiw:copy" width={size} sx={{ color: blueC }} />
      </IconButton>
    </Tooltip>
  );
}



export { ClipboardCopyButton };