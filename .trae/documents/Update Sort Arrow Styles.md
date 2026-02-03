I will modify `src/pages/FrontendCard/Table/index.less` to customize the table sort icons as requested.

**Changes:**

1.  **Highlight Color:** Set the color of the active sort arrow to `rgba(61, 97, 169, 1)`.
2.  **Arrow Width:** Set the size of the sort arrows to `6px` using `font-size`.

**File to Modify:**

- `src/pages/FrontendCard/Table/index.less`

**Code Changes:**

```less
.fcTableCustomTable {
  :global {
    // ... existing styles ...

    // Highlight active sort arrow
    .ant-table-column-sorter-up.active,
    .ant-table-column-sorter-down.active {
      color: rgba(61, 97, 169, 1) !important;
    }

    // Set sort arrow size
    .ant-table-column-sorter-inner .anticon {
      font-size: 6px !important;
    }
  }
}
```
