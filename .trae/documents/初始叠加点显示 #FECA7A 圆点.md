## 现状定位

- 叠加点系列在 [incomeChart/index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/incomeChart/index.tsx#L242-L253) 定义：`id: 'overlay-point'`，颜色已是 `#FECA7A`，但 `data: []`，所以初始不会渲染任何点。
- 图表初次渲染时 `series: buildSeries(0)`（基准点 index=0）见 [incomeChart/index.tsx:L462-L466](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/incomeChart/index.tsx#L462-L466)。dataZoom 改变基准点时会重新 `setOption({ series: buildSeries(nextBaseIndex) })`，见 [incomeChart/index.tsx:L468-L491](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/incomeChart/index.tsx#L468-L491)。

## 目标行为

- 初始就显示一个颜色为 `#FECA7A` 的圆点，位置在当前基准点（初始 baseIndex=0，对应首日，y=0%）。
- 当基准点随 dataZoom 变化时，该圆点同步移动到新的基准点（仍然 y=0%）。

## 实施方案（推荐）

- 把“叠加点”从 `type: 'line'` 改成 `type: 'scatter'`，用单点数据绘制：`data: [[dates[baseIndex], 0]]`。
- 在 `buildSeries(baseIndex)` 里动态创建该 series（而不是外面固定 `data: []`），确保每次基准点变化都能更新位置。
- 为避免干扰 tooltip/legend：给该 scatter series 加 `tooltip: { show: false }`；并把 `legend.data` 显式设置为主线 + 叠加线（不包含叠加点）。

## 备选方案（不改 series 类型）

- 继续用 `type: 'line'`，但在 `buildSeries(baseIndex)` 里把 `data` 生成为与 dates 同长度数组：只有 `baseIndex` 位置是 `0`，其余是 `null`，这样只会渲染一个点不连线（必要时加 `connectNulls: false`）。

## 变更点（文件）

- [incomeChart/index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/incomeChart/index.tsx)
  - 重构 `overlayPointSeries` 为工厂函数/在 `buildSeries` 内生成。 -（若采用推荐方案）补充 `legend.data` 的生成，排除叠加点。

## 验证方式（不做打包/代码检查）

- 打开页面观察：初始就能看到一个 `#FECA7A` 圆点。
- 拖动 dataZoom 左侧起点：圆点随基准日变化而移动，并始终落在 0% 位置。
