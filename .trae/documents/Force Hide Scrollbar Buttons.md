I will modify `src/pages/FrontendCard/Table/index.less` to forcefully hide the scrollbar buttons by adding zero dimensions and `!important` flags, as `display: none` alone might not be sufficient in all rendering contexts.

**Changes:**

1.  **Force Hide Buttons:** Update the `::-webkit-scrollbar-button` rule to include `width: 0`, `height: 0`, and `background: transparent` with `!important` to ensure they are completely removed.

**File to Modify:**

- `src/pages/FrontendCard/Table/index.less`

**Code Changes:**

```less
.fcTableCustomTable {
  :global {
    // ...
    .ant-table-body {
      // ...
      &::-webkit-scrollbar-button {
        display: none !important;
        height: 0 !important;
        width: 0 !important;
        background: transparent !important;
      }
    }
  }
}
```
