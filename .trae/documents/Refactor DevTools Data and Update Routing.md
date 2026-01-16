I will optimize the "Development Tools" page and routing as follows:

1. **Extract Configuration Data** (`src/pages/DevTools/data.ts`)

   * Create a new file `src/pages/DevTools/data.ts`.

   * Move the `ToolItem` and `Category` type definitions there.

   * Define the `toolsData` array in this file with the new tools added (Vercel, Docker, Cloudflare, Electron, ECharts, Node.js, Tailwind) and organized into logical categories (e.g., "Deployment & Cloud", "Backend & Runtime", "CSS & UI", "Visualization").

2. **Refactor Page Component** (`src/pages/DevTools/index.tsx`)

   * Import `toolsData` from the newly created `data.ts` file.

   * Remove the hardcoded data from the component file to keep it clean.

3. **Update Routing** (`config/routes.ts`)

   * Move the `开发工具` (Development Tools) route to the top of the list, immediately after the root redirect, so it appears first in the menu.

**Verification:**

* I will verify that the "Development Tools" menu item is now the first item in the sidebar.

* I will verify that the page loads correctly with the new data and categories.

* I will check that the new tools (Vercel, Docker, etc.) are present and their links work.

