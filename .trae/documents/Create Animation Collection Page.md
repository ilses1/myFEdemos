# Create "Animation Collection" Page

I will create a new page to display a collection of beautiful CSS animations with "View Detail" and "View Code" features.

## 1. File Structure
*   **`src/pages/AnimationCollection/index.tsx`**: Main component file.
*   **`src/pages/AnimationCollection/data.ts`**: Configuration file storing animation data (Title, Description, HTML, CSS).
*   **`src/pages/AnimationCollection/index.less`**: Page-level styles (layout, card styling).
*   **`config/routes.ts`**: Route configuration update.

## 2. Implementation Details

### Data Structure (`data.ts`)
I will organize the 8+ animations found (Gradient Button, Neon Pulse, Loaders, Toggles, etc.) into a structured array:
```typescript
interface AnimationItem {
  id: string;
  title: string;
  type: 'button' | 'loader' | 'toggle';
  html: string;
  css: string;
}
```

### Page Component (`index.tsx`)
*   **Layout**: Use Ant Design `Row`, `Col`, and `Card` to create a responsive grid.
*   **Preview**: Render the HTML and inject the CSS for each animation directly in the card.
*   **Interactions**:
    *   **Click Card**: Open a `Modal` to show the animation in a larger, centered view.
    *   **Click "Code"**: Open a `Drawer` (or Modal) to display the source HTML and CSS code.

### Routing
*   Add a new route `/animations` with the name "Animation Collection" (动画集锦) in `config/routes.ts`.

## 3. Selected Animations
1.  **Buttons**: Gradient Flow, Neon Pulse, 3D Press.
2.  **Loaders**: Classic Spinner, Bouncing Dots, Wave Loader.
3.  **Toggles**: Smooth Capsule, Sun/Moon Theme Switch.

## 4. Next Steps
1.  Create the `src/pages/AnimationCollection` directory and files.
2.  Populate `data.ts` with the curated animation code.
3.  Implement the UI in `index.tsx`.
4.  Register the route in `config/routes.ts`.
