I will modify `src/pages/FrontendCard/Table/index.less` to customize the table scrollbar styles.

**Changes:**

1.  **Scrollbar Width:** Set `width` to `4px` (and `height` for consistency).
2.  **Thumb Color:** Set `background-color` to `#C5CDDB` with a `2px` border-radius for a polished look.
3.  **Target:** Apply these styles to the `.ant-table-body` within `.fcTableCustomTable`.

**File to Modify:**

- `src/pages/FrontendCard/Table/index.less`

**Code Changes:**

```less
.fcTableCustomTable {
  :global {
    // ... existing styles ...

    .ant-table-body {
      &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #c5cddb;
        border-radius: 2px;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
      }
    }

    // ...
  }
}
```
