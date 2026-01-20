I have analyzed the project structure and identified the causes for the performance issues. Here is the plan to optimize the Animation webpage and the First Screen loading.

### **Problem Analysis**

1.  **Animation Webpage Slow Loading (`src/pages/AnimationCollection`)**:
    *   **Cause**: The page imports `react-syntax-highlighter` synchronously. This is a very large library that is bundled into the page's JavaScript file, causing a delay when the page loads, even though the code viewer is initially hidden.
    *   **Optimization**: Implement **Lazy Loading** for the code viewer component so the heavy library is only downloaded when you actually click "View Code".

2.  **First Screen Loading Slow**:
    *   **Cause**: The current `config/config.ts` lacks production optimizations. The bundle size is likely larger than necessary because code minification and granular code splitting are not explicitly configured.
    *   **Optimization**: Update the Umi configuration to enable `jsMinifier` (Terser), `cssMinifier` (CSSNano), and optimize the code splitting strategy to break down large files into smaller chunks.

---

### **Implementation Plan**

#### **Step 1: Optimize Animation Collection Page**
*   **File**: `src/pages/AnimationCollection/index.tsx`
*   **Action**:
    *   Remove the static import of `react-syntax-highlighter`.
    *   Create a wrapper component for the syntax highlighter using `React.lazy` and `Suspense`.
    *   Load the library only when the Drawer is visible.

#### **Step 2: Optimize Global Build Configuration**
*   **File**: `config/config.ts`
*   **Action**:
    *   Enable `jsMinifier: 'terser'` for better JavaScript compression.
    *   Enable `cssMinifier: 'cssnano'` for CSS compression.
    *   Configure `codeSplitting: { jsStrategy: 'granularChunks' }` to optimize how vendor libraries are bundled, preventing large libraries (like ECharts or SyntaxHighlighter) from polluting the main entry bundle.

#### **Step 3: Verify ECharts Usage (Optional but Recommended)**
*   **File**: `src/pages/Chart/LineChart/index.tsx`
*   **Action**: The current import `import * as echarts from 'echarts'` pulls in the entire library. While Umi lazy loads pages, explicit modular imports (importing only used charts) would be better, but **Code Splitting** in Step 2 will ensure this doesn't affect the *First Screen* of other pages. For now, Step 2 is sufficient to protect the First Screen.

I will proceed with these changes to solve both issues.
