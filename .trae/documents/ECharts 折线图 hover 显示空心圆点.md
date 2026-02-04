## 目标

- 鼠标移动到折线图（tooltip 触发轴）时，在对应折线的当前 x 点位显示“空心圆点”，平时不显示散点。

## 现状定位

- 该页使用 ECharts，折线 series 目前都设置了 `symbol: 'none'`，导致 hover 时也不会出现点。

- 相关代码位于 [index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/incomeChart/index.tsx) 的 `overlaySeries`、`mainLine1Series`、`mainLine2Series`。

## 改动方案

1. **替换折线 series 的 symbol 配置**

   - 将 `symbol: 'none'` 改为 `symbol: 'emptyCircle'`（ECharts 内置空心圆）。

   - 新增 `showSymbol: false`（平时不画点，避免满屏圆点）。

   - 新增 `symbolSize`（例如 6\~8）用于 hover 时的点尺寸基准。

2. **让 hover 时强制显示点**

   - 在每条折线的 `emphasis` 中增加 `showSymbol: true`，并可适当调大 `emphasis.symbolSize`。

   - 保留已有 `emphasis: { focus: 'series' }` 行为。

3. **提升“移动到折线图就能稳定出现点”的手感（可选，但建议）**

   - 在 `tooltip` 增加 `axisPointer: { type: 'line', snap: true }`，让指示器吸附到数据点，减少必须“精准命中点”的情况。

##

- 仅调整该页面折线 series 的交互表现，不改变数据计算、legend/tooltip 文案与样式。
