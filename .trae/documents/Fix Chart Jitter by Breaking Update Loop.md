**Analysis** The "jitter" and "stop zooming" issues are caused by a **circular update loop**:

1. You interact with the chart (Zoom/Drag) -> Triggers `dataZoom` event.
2. Event handler updates React state `dateRange`.
3. React state change triggers `useEffect`.
4. `useEffect` calculates new `dataZoom` options (converting Date -> Percentage) and calls `myChart.setOption`.
5. `setOption` forces the chart to redraw/adjust slightly, conflicting with the user's ongoing interaction (the "jitter").

**Proposed Fix** We need to break this loop by distinguishing between "updates from the Chart" and "updates from the UI (DatePicker)".

1. **Add a Flag**: Create a `useRef` variable `isChartUpdating` to track the source of the change.
2. **Mark Chart Interactions**: In the `dataZoom` event handler, set `isChartUpdating.current = true` before updating the state.
3. **Block Redundant Updates**: In the `useEffect`, check if `isChartUpdating.current` is true. If it is, it means the chart is already in the correct position (because the user just moved it), so we **skip** calling `setOption` and reset the flag.

**Changes to `src/pages/Chart/kChart/index.tsx`**

1. Add `const isChartUpdating = useRef(false);`
2. Update `useEffect` to return early if `isChartUpdating.current` is true.
3. Update `myChart.on('dataZoom', ...)` to set `isChartUpdating.current = true`.
