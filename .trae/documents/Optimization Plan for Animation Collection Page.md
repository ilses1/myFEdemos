Based on the codebase analysis and web search results, the main reason for the "slow loading" of the Animation Collection page is likely the **large bundle size** caused by the `react-syntax-highlighter` library, which is currently importing *all* language definitions by default.

Here is the optimization plan:

### 1. Optimize `CodeViewer` Component
Switch from the full `Prism` import to `PrismLight` to reduce bundle size. We will only register the necessary languages (HTML and CSS) instead of loading support for every programming language.

**Changes in `src/pages/AnimationCollection/CodeViewer.tsx`:**
- Import `PrismLight` instead of `Prism`.
- Import only `html` and `css` language definitions.
- Register these languages explicitly.

### 2. Implement Lazy Loading
The `CodeViewer` component is only visible when the user clicks "View Code". We should load it only when needed, rather than bundling it with the initial page load.

**Changes in `src/pages/AnimationCollection/index.tsx`:**
- Change the static import of `CodeViewer` to a dynamic `React.lazy` import.
- This ensures the heavy code highlighting logic is split into a separate chunk and only loaded on demand.

### 3. Verification
- We will verify the changes by checking if the code still compiles and runs correctly.
- You should notice a faster initial load for the Animation page, and a slight loading indicator when opening the code drawer for the first time.
