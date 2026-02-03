I will modify `src/pages/FrontendCard/Table/index.less` to explicitly reset the standard scrollbar properties to `auto`. This is necessary because Ant Design applies a default `scrollbar-color`, which (in modern browsers) disables the `::-webkit-scrollbar` pseudo-elements that we rely on to hide the buttons.

**Changes:**

1.  **Reset Standard Properties:** Set `scrollbar-width: auto !important` and `scrollbar-color: auto !important` on both `.ant-table` and `.ant-table-body`. This forces the browser to ignore the standard styling and revert to using the custom Webkit scrollbar styles.
2.  **Preserve Webkit Styles:** Keep the existing `::-webkit-scrollbar` rules that define the width, color, and hidden buttons.

**File to Modify:**

- `src/pages/FrontendCard/Table/index.less`

**Code Changes:**

```less
.fcTableCustomTable {
  :global {
    // ...
    .ant-table {
      scrollbar-width: auto !important;
      scrollbar-color: auto !important;
    }

    .ant-table-body {
      scrollbar-width: auto !important;
      scrollbar-color: auto !important;
      // ... existing webkit styles ...
    }
  }
}
```
