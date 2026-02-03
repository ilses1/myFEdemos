I will modify `src/pages/FrontendCard/Table/index.less` to implement the requested UI changes.

**Changes:**

1.  **Remove Sort Background:** Add a rule for `.ant-table-column-sort` to set the background to `transparent`, removing the gray background on sorted columns.
2.  **Remove Header Separators:** Add a rule for `.ant-table-thead > tr > th::before` to set `display: none`, removing the vertical divider lines between table headers.

**File to Modify:**

- `src/pages/FrontendCard/Table/index.less`

**Code Changes:**

```less
.fcTableCustomTable {
  :global {
    .ant-table-thead > tr > th {
      // ... existing styles ...
      &::before {
        display: none !important; /* Remove header separator */
      }
    }

    .ant-table-column-sort {
      background: transparent !important; /* Remove sort background */
    }
    // ...
  }
}
```
