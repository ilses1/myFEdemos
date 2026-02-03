I will modify `src/pages/FrontendCard/Table/index.less` to hide the scrollbar buttons (arrows) at the ends of the scrollbar.

**Changes:**

1.  **Hide Buttons:** Add `display: none` to the `::-webkit-scrollbar-button` pseudo-element within the `.ant-table-body` block.

**File to Modify:**

- `src/pages/FrontendCard/Table/index.less`

**Code Changes:**

```less
.fcTableCustomTable {
  :global {
    // ...
    .ant-table-body {
      // ... existing styles ...
      &::-webkit-scrollbar-button {
        display: none;
      }
    }
  }
}
```
