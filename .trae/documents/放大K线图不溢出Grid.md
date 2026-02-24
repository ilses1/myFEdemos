## 目标

- 支持“放大/缩小”K 线图（滚轮缩放、拖拽平移保持可用）。
- 缩放到只剩少量蜡烛时，蜡烛图形不再溢出到 grid 背景区域之外（尤其是左右两端的蜡烛半截跑到 grid 外侧）。

## 背景判断

- 当前使用的是 ECharts candlestick + dataZoom inside。
- 现配置里 `xAxis.boundaryGap: false` 更适合折线图，但对“柱/蜡烛”这类有宽度的图形，在极度放大时两端容易出现半根蜡烛越过 grid 左右边界的视觉溢出。
- `series.clip: true` 已设置，但溢出发生在“蜡烛中心点贴边 + 自身宽度向外扩”的场景时，根因通常是 `boundaryGap` 取值不适配。

## 实施方案

### 1) 调整 xAxis 的 boundaryGap（核心修复）

- 将 `xAxis.boundaryGap` 从 `false` 改为 `true` 或百分比数组（优先百分比数组便于控制留白）。
- 目的：让第一个/最后一个类目在坐标系两侧保留半个（或更多）蜡烛宽度的空间，从源头避免“左右端溢出”。

### 2) 对蜡烛宽度做上限（提升缩放体验，防止过粗）

- 在 candlestick series 上补充 `barMaxWidth`（必要时配 `barMinWidth` / `barWidth`）。
- 目的：当 dataZoom 放大到很少数据点时，蜡烛不会无限变粗，观感更稳定，同时进一步降低贴边溢出的概率。

### 3) 保底：微调 grid 边距与 containLabel（只在仍有溢出时启用）

- 如果依旧有“贴边看起来溢出”的情况，再小幅增大 `grid.left/right`（例如从 `10px` 提到 `20px~40px`），并评估 `containLabel` 的影响。
- 目的：给坐标系留出更充足的内边距，避免任何渲染误差导致的越界观感。

## 验收方式

- 在页面中用鼠标滚轮连续放大到只显示 5~15 根蜡烛，观察左右两端蜡烛是否仍会跑出浅蓝色 grid 背景区域。
- 观察缩放过程中蜡烛宽度是否合理、不会粗到遮挡邻近蜡烛。

## 涉及文件

- `src/pages/Chart/kChart/index.tsx`：调整 ECharts option（xAxis、candlestick series、必要时 grid）。
