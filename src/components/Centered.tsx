import { forwardRef, Ref } from "react";
import { Stack, StackProps } from "@mui/material";



function CenteredComponent({ children, sx, ...stackProps }: StackProps, ref: Ref<HTMLDivElement>) {
  return (
    <Stack
      ref={ref}
      sx={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
        , ...sx
      }}
      {...stackProps}
    >
      {children}
    </Stack>
  );
}



/**
 * A reusable MUI component that centers its children both horizontally and vertically
 * using a flexbox-based `<Stack>`.
 *
 * This component is essentially a shorthand for:
 * ```tsx
 * <Stack sx={{ flexDirection:"row", alignItems:"center", justifyContent:"center" }} />
 * ```
 * but allows you to pass any additional `StackProps` and forwards the ref to the underlying `<div>`.
 *
 * @component
 * @param {StackProps} props - All standard MUI `Stack` props are supported.
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the root `<Stack>` element.
 *
 * @example
 * ```tsx
 * import { Centered } from "@ffilip/mui-react-utils";
 * 
 * export default function Example() {
 *   return (
 *     <Centered sx={{ height: 300 }}>
 *       <Box>Centered content</Box>
 *       <Box>Centered content2</Box>
 *     </Centered>
 *   );
 * }
 * ```
 */
export const Centered = forwardRef<HTMLDivElement, StackProps>(CenteredComponent);