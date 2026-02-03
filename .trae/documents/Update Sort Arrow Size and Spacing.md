I will modify `src/pages/FrontendCard/Table/index.less` to adjust the sort arrow size and spacing.

**Changes:**

1.  **Arrow Width:** Increase the sort arrow size to `8px` (updating the previous 6px).
2.  **Arrow Spacing:** Add `margin-bottom: 4px` to the up-arrow to create a 4px gap between the up and down arrows.

**File to Modify:**

- `src/pages/FrontendCard/Table/index.less`

**Code Changes:**

```less
.fcTableCustomTable {
  :global {
    // ...
    .ant-table-column-sorter-inner {
      .anticon {
        font-size: 8px !important; // Update size to 8px
      }

      .ant-table-column-sorter-up {
        margin-bottom: 4px; // Add 4px spacing
      }
    }
    // ...
  }
}
```
