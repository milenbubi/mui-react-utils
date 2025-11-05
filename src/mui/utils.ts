/**
 * Centralized z-index map for Chan180 UI layers.
 *
 * Provides centralized z-index values for Chan180 UI components
 * (e.g., headers, sidebars, modals, tooltips, and other overlay elements).
 *
 * @example
 * ```tsx
 * <Box sx={{ zIndex: C180ZIndex.popper }}>
 *   ...
 * </Box>
 * ```
 */
export const C180ZIndex = {
  header: 9995,
  sidebar: 10000,
  backdrop: 10005,
  popper: 10010,
  copyButton: 10100
}