I will modify `src/pages/FrontendCard/Table/index.less` to override the conflicting standard CSS scrollbar styles.

**Changes:**

1.  **Override `scrollbar-color`:** Add `scrollbar-color: #C5CDDB transparent;` to both `.ant-table` and `.ant-table-body` to override the Ant Design default.
2.  **Set `scrollbar-width`:** Add `scrollbar-width: thin;` to support Firefox and modern browsers (though it may not be exactly 4px, it's the closest standard value).
3.  **Maintain Webkit Styles:** Keep the existing `::-webkit-scrollbar` rules which allow for precise 4px width in Webkit/Blink browsers.

**File to Modify:**

- `src/pages/FrontendCard/Table/index.less`

**Code Changes:**

```less
.fcTableCustomTable {
  :global {
    // ...
    .ant-table {
      scrollbar-color: #c5cddb transparent !important;
      scrollbar-width: thin;
    }

    .ant-table-body {
      scrollbar-color: #c5cddb transparent !important;
      scrollbar-width: thin;
      // ... existing webkit styles ...
    }
  }
}
```
