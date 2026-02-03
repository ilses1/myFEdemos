I will modify `src/pages/FrontendCard/Table/index.less` to remove `scrollbar-width` and `scrollbar-color` properties. This will force the browser to rely solely on the `::-webkit-scrollbar` pseudo-elements, which provide precise control over dimensions and allow hiding the scrollbar buttons completely.

**Changes:**

1.  **Remove Standard Properties:** Delete `scrollbar-color` and `scrollbar-width` from `.ant-table` and `.ant-table-body` rules.
2.  **Verify Webkit Styles:** Ensure the `::-webkit-scrollbar` and `::-webkit-scrollbar-button` rules remain intact.

**File to Modify:**

- `src/pages/FrontendCard/Table/index.less`

**Code Changes:**

```less
.fcTableCustomTable {
  :global {
    // ...
    .ant-table {
      // Remove scrollbar-color and scrollbar-width
    }

    .ant-table-body {
      // Remove scrollbar-color and scrollbar-width
      &::-webkit-scrollbar {
        // ... existing styles ...
      }
      // ...
    }
  }
}
```
