I will update `src\pages\Chart\LineChart\index.tsx` to implement the requested ECharts styling changes.

**Planned Changes:**

1.  **Modify `tooltip` configuration:**
    *   Add `axisPointer` with `type: 'cross'`.
    *   Configure `axisPointer.lineStyle`: dashed, width 1px, color `#A1A5B2`.
    *   Configure `axisPointer.label`: background `#AEB5BF`, border-radius 2px, font `苹方-简`, size 12px, line-height 18px, color `#FFFFFF`.

2.  **Modify `dataZoom` configuration:**
    *   Set `left: '0%'` and `right: '0%'` to ensure the zoom slider and chart content span 100% width.

3.  **Modify `xAxis` configuration:**
    *   Add `lineHeight: 18` to `axisLabel`.

4.  **Modify `series` configuration:**
    *   **Line Series ("指数趋势", "规模趋势"):**
        *   Set `lineStyle.width` to `2`.
        *   Set `symbolSize` to `8`.
        *   Update `itemStyle` to have `color: '#FFFFFF'` (white fill), `borderColor: '#BF0008'` (red border), `borderWidth: 2`.
    *   **Bar Series ("机构持仓", "个人持仓"):**
        *   Set `barWidth` to `32`.

5.  **Modify `yAxis` (Optional/Implicit):**
    *   Ensure the axis pointer behavior aligns with the "Left y-axis shows..." requirement (enabled by default with `cross` type).

I will use `SearchReplace` to apply these updates to the respective sections of the `option` object in `src\pages\Chart\LineChart\index.tsx`.