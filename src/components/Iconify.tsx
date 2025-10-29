import { forwardRef, Ref } from "react";
import { Box, BoxProps } from "@mui/material";
import { Icon, IconifyIcon } from "@iconify/react";

interface IProps extends BoxProps {
  icon?: IconifyIcon | string;
}

// flaticon.com
// https://icon-sets.iconify.design/?category=General



function IconifyComponent({ icon, width = 20, sx, ...other }: IProps, ref: Ref<SVGElement>) {
  return (
    <Box
      ref={ref}
      component={Icon}
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  );
}



/**
 * A wrapper component around MUI's `Box` and Iconify's `Icon` component.
 * 
 * `Iconify` allows you to easily render icons from the [Iconify](https://icon-sets.iconify.design) library
 * while keeping MUI's styling system (`sx`, responsive props, etc.).
 *
 * @component
 * @param {IProps} props - Component props extending MUI's `BoxProps`.
 * @param {IconifyIcon | string} [props.icon] - The Iconify icon definition or string key (e.g. `'mdi:home'`).
 * @param {number} [props.width=20] - Icon size in pixels (height will match the width).
 * @param {SxProps} [props.sx] - Custom MUI `sx` style overrides.
 * @param {React.Ref<SVGElement>} ref - Forwarded ref to the rendered SVG element.
 *
 * @returns {JSX.Element} The rendered Iconify icon wrapped in a MUI `Box`.
 *
 * @example
 * ```tsx
 * import Iconify from "@ffilip/mui-react-utils/Iconify";
 *
 * export default function Example() {
 *   return (
 *     <Iconify icon="mdi:account" width={24} sx={{ color: "primary.main" }} />
 *   );
 * }
 * ```
 */
export const Iconify = forwardRef<SVGElement, IProps>(IconifyComponent);