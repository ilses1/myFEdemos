I will modify `src/pages/FrontendCard/LineChart/index.tsx` to update the chart configuration as follows:

1.  **Legend Icon**:

    - Update `legend` property to set `icon: 'rect'`, `itemWidth: 10`, and `itemHeight: 10`.

2.  **Bar Gap**:

    - In the second bar series ("流通市值(亿)"), add `barGap: '40%'`.
    - _Calculation_: The `barWidth` is 10px. A 4px gap corresponds to 40% of the bar width.

3.  **Line Chart Symbol**:
    - In the line series ("上市数量(右轴)"), change `symbol` from `'circle'` to `'emptyCircle'`.
