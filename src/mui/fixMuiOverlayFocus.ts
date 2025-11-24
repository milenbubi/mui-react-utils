/**
 * Fixes focus-related accessibility warnings emitted by Chrome when closing
 * MUI overlay components (Popover, Menu, Dialog, Drawer, Autocomplete, etc).
 *
 * Chrome produces the warning:
 *   "Blocked aria-hidden on an element because its descendant retained focus"
 * when a focused element inside a MUI overlay remains focused at the moment
 * the overlay applies `aria-hidden="true"` to its siblings during closing.
 *
 * This function removes focus from any active element that resides inside a
 * MUI overlay **just before** MUI's aria-hidden logic runs. It handles both:
 *   - click-based closing (synchronous)
 *   - keyboard-based closing, including TAB navigation (asynchronous)
 *
 * ⚠️ IMPORTANT USAGE:
 * Call this function **immediately after** triggering a state update that closes
 * the MUI overlay. Example:
 *
 *   onClose={() => {
 *     setAnchorEl(null);      // schedule overlay closing
 *     fixMuiOverlayFocus();   // MUST be called right after the state change
 *   }}
 *
 * Do NOT call this function before setState or inside async handlers that run later.
 * It must run in the same event loop tick in which the MUI overlay is closing.
 */
export function fixMuiOverlayFocus() {
  // Microtask: catches click-based closing
  Promise.resolve().then(() => {
    // Next animation frame: catches TAB-based focus transitions
    requestAnimationFrame(() => {
      const active = document.activeElement as HTMLElement | null;
      if (!active) {
        return;
      }


      // Known MUI overlay selectors where a focused element can produce a warning
      const overlaySelectors = [
        ".MuiPopover-root",
        ".MuiMenu-root",
        ".MuiModal-root",
        ".MuiDialog-root",
        ".MuiDrawer-root",
        ".MuiAutocomplete-popper",
        ".MuiSnackbar-root",
        ".MuiTooltip-popper"
      ];


      // If the active element is inside ANY overlay, blur it
      for (const selector of overlaySelectors) {
        if (active.closest(selector)) {
          active.blur();
          return;
        }
      }
    });
  });
}