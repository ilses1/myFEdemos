I will modify `src/pages/FrontendCard/LineChart/index.tsx` to fix the tooltip color indicators.

**Changes:**

1.  **Update Tooltip Formatter**:
    - In the `tooltip.formatter` function, I will add logic to handle the color indicator for "Total Market Value" (总市值) and "Circulation Market Value" (流通市值).
    - Since these series use gradient colors, the default `params.color` might be an object. I will explicitly assign the solid colors (`#486EBD` for Total Market Value and `#FF7D7D` for Circulation Market Value) when generating the tooltip HTML to ensure the color blocks render correctly.
