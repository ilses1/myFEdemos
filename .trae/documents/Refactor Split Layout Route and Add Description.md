I will perform the following steps to fulfill your requests:

1.  **Configure Route & Icon**:

    - Modify `config/routes.ts` to update the existing layout route.
    - Change the route `path` from `/layout` to `/split-layout` (putting it on a separate, specific page).
    - Change the route `name` from `'布局'` to `'分栏布局'` (giving it a specific name).
    - Add `icon: 'Layout'` to the route configuration.

2.  **Add Functional Description**:
    - Edit `src/pages/SplitLayout/index.tsx` to replace the placeholder text ("Left Column", "Right Column") with a detailed Chinese description of the component's features.
    - The description will cover:
      - **Resizable Columns**: Drag to adjust width.
      - **Responsive Scaling**: Maintains proportions on window resize.
      - **Boundary Protection**: Minimum width constraints.
      - **Quick Toggle**: Expand/Collapse left column.

**Summary of Changes**:

- `config/routes.ts`: Update route definition.
- `src/pages/SplitLayout/index.tsx`: Update UI text with feature descriptions.
