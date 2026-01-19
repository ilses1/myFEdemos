# Update Animation Collection Page

I will update the animation collection page to remove the click-to-preview feature on the card, and enhance the code viewing experience with copy functionality and syntax highlighting.

## 1. Remove Click-to-Preview
*   **File**: `src/pages/AnimationCollection/index.tsx`
*   **Action**: Remove the `onClick` handler and `cursor: 'pointer'` style from the `.previewArea` div.
*   **Result**: Clicking the animation preview will no longer open the modal. Only the "Eye" button will do so.

## 2. Enhance Code Drawer
*   **File**: `src/pages/AnimationCollection/index.tsx`
*   **Action**:
    *   Add a `handleCopy` function using `navigator.clipboard.writeText` and `message.success` from `antd`.
    *   Update the drawer content to include a "Copy" button for both HTML and CSS sections.
    *   Since no external syntax highlighting library is currently installed (checked `package.json`), and installing one might be overkill or require user approval for dependencies, I will implement a **lightweight syntax highlighting component** using regex and `dangerouslySetInnerHTML`.
        *   This component (`SyntaxHighlighter`) will take `code` and `language` as props.
        *   It will wrap keywords, strings, and attributes in `<span>` tags with inline styles or classes to simulate highlighting.
        *   This avoids new dependencies while fulfilling the user's request for "@code highlighting".

## 3. Implementation Details for Syntax Highlighting
*   **CSS Highlighting**: Regex to match selectors, properties (e.g., `color:`), values (e.g., `#fff`, `10px`), and comments.
*   **HTML Highlighting**: Regex to match tags (e.g., `<div>`, `class=`), attribute names, and values.
*   **UI**: The code blocks will have a header with the language name and a "Copy" button on the right.

## 4. Next Steps
1.  Modify `src/pages/AnimationCollection/index.tsx` to remove the click handler.
2.  Add the `SyntaxHighlighter` helper function/component within the same file (or a separate util if preferred, but same file is simpler for now).
3.  Update the `Drawer` content to use this highlighter and add the copy buttons.
