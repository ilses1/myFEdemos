I will implement the following changes to upgrade the Animation Collection:

1.  **Enhance Code Highlighting**:
    *   Install the popular `react-syntax-highlighter` library to replace the current manual regex-based implementation.
    *   This will provide professional-grade syntax highlighting for the HTML and CSS code previews, matching VS Code's look and feel.

2.  **Add New Animations**:
    *   I will add 4 new modern animation effects to the collection:
        1.  **Glassmorphism Card**: A trendy frosted glass effect card with hover interactions.
        2.  **Typing Text**: A typewriter text reveal animation.
        3.  **Social Share**: An expanding social media share button.
        4.  **Floating Action Button**: A Material Design-style floating menu button.

3.  **Refactor & Fix**:
    *   Refactor `index.tsx` to use the new highlighting library.
    *   Ensure all new and existing animations have uniquely namespaced CSS classes to prevent style conflicts (since all styles are injected into the page).

**Dependencies to install**:
*   `react-syntax-highlighter`
*   `@types/react-syntax-highlighter` (for TypeScript support)