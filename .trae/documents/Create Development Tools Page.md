I will implement the "Development Tools" page as follows:

1.  **Create the Page Component** (`src/pages/DevTools/index.tsx`)
    *   Use `PageContainer` from `@ant-design/pro-components` for the layout.
    *   Define a data structure for tool categories and items (name, icon, link, description).
    *   Use `antd`'s `Card` and `List` (or `Grid`) to display the tools grouped by category.
    *   Implement click handlers to open the tool's official website in a new tab.

2.  **Configure Routing** (`config/routes.ts`)
    *   Add a new route entry:
        ```typescript
        {
          name: '开发工具',
          path: '/dev-tools',
          component: './DevTools',
        },
        ```

3.  **Initial Content**
    *   I will populate the page with some common development tools (e.g., React, Vue, Ant Design, MDN) as examples so you can see the effect immediately.

**Verification:**
*   I will verify that the new menu item appears in the sidebar.
*   I will verify that the page loads correctly and displays the tools.
*   I will verify that clicking a tool opens the correct URL.
