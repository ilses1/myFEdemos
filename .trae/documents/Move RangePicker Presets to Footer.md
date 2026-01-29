I will move the date range preset buttons into the `RangePicker` footer as requested.

**Implementation Steps:**

1.  **Modify `src/pages/Chart/kChart/index.tsx`**:

    - Define a `renderFooter` function inside the `KChart` component.
    - This function will return a container div with the `DATE_PRESETS` mapped to clickable elements, reusing the `handlePresetClick` logic.
    - Add the `renderExtraFooter={renderFooter}` prop to the `RangePicker` component.
    - Remove the original `div` with `className={styles.presets}` that is currently next to the `RangePicker`.

2.  **Modify `src/pages/Chart/kChart/index.less`** (if needed):
    - I will verify if the `presetLink` style needs adjustment for the footer context (e.g., ensuring proper spacing). I will likely add a small wrapper style for the footer content to ensure it matches the layout in the image (horizontal row with spacing).

**Outcome:** The "Year to Date" through "Last 10 Years" buttons will appear inside the `RangePicker` dropdown panel at the bottom, matching the design layout.
