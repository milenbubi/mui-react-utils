import { useMemo, useState } from "react";
import { isMobile } from "@ffilip/chan180-utils/env";
import { C180ZIndex, Iconify, useChan180Colors } from "@ffilip/mui-react-utils";
import { IconButton, SxProps, Theme, Box, Tooltip, TooltipProps, Typography } from "@mui/material";


interface IProps {
  defaultTitle: string;
  textToCopy: string;
  iconSize?: number;
  butonSx?: SxProps<Theme>;
  label?: string;
  labelPosition?: "left" | "right";
};


/**
 * A button that copies text to the clipboard with a tooltip feedback.
 *
 * Displays an icon button (optionally with a label) that copies the given `textToCopy`
 * to the clipboard when clicked. The tooltip shows `defaultTitle` by default and
 * temporarily updates to "Copied" after a successful copy.
 *
 * Handles mobile devices differently to ensure proper tooltip behavior.
 * Does not render if the page is not served over HTTPS.
 *
 * @component
 *
 * @param {object} props
 * @param {string} props.defaultTitle - Default tooltip text (e.g., "Copy").
 * @param {string} props.textToCopy - The text string to be copied to the clipboard.
 * @param {number} [props.iconSize=18] - The size of the copy icon in pixels. Default - 18.
 * @param {SxProps<Theme>} [props.butonSx] - Optional additional styling for the button.
 * @param {string} [props.label] - Optional text label displayed next to the icon.
 * @param {"left"|"right"} [props.labelPosition="right"] - Position of the label relative to the icon. Default - "right".
 *
 * @returns {JSX.Element | null} The copy button component, or `null` if HTTPS is unavailable.
 *
 * @example
 * ```tsx
 * <ClipboardCopyButton
 *   defaultTitle="Copy link"
 *   textToCopy="https://chan180.net"
 *   iconSize={20}
 *   label="Copy"
 *   labelPosition="left"
 * />
 * ```
 */
function ClipboardCopyButton({ defaultTitle, textToCopy, iconSize = 18, butonSx, label, labelPosition = "right" }: IProps): JSX.Element | null {
  const { blueC } = useChan180Colors();
  const [open, setOpen] = useState(false);
  const isDeviceMobile = useMemo(() => isMobile(), []);
  const successCopyTitle = useMemo(() => "Copied", []);
  const [tooltip, setTooltip] = useState(defaultTitle);
  const isHTTPS = useMemo(() => window.isSecureContext, []);


  const tooltipProps = useMemo<Partial<TooltipProps>>(() => {
    if (!isDeviceMobile) {
      return {
        onMouseLeave: () => {
          setTimeout(() => {
            setTooltip(defaultTitle);
          }, 200);
        }
      }
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
          if (isDeviceMobile) {
            setTimeout(() => {
              setTooltip(defaultTitle);
            }, 1700);

            setTimeout(() => {
              setOpen(false);
            }, 1500);
          }
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
      <IconButton onClick={handleCopy} sx={{ color: blueC, borderRadius: 999, ...butonSx }}>
        {(label && labelPosition === "left") && (
          <Typography sx={{ fontSize: iconSize / 1.5, fontWeight: 600, fontStyle: "italic", color: "text.secondary", mr: 1 }}>
            {"Copy"}
          </Typography>
        )}
        <Iconify icon="uiw:copy" width={iconSize} />
        {(label && labelPosition === "right") && (
          <Typography sx={{ fontSize: iconSize / 1.5, fontWeight: 600, fontStyle: "italic", color: "text.secondary", ml: 1 }}>
            {"Copy"}
          </Typography>
        )}
      </IconButton>
    </Tooltip>
  );
}



export { ClipboardCopyButton };