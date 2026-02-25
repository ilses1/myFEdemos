## 目标

- 在不改变现有交互与视觉表现的前提下，简化 [index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/kChart/index.tsx) 的结构与重复逻辑，提升可读性与可维护性。
- 约束：不改样式类名、不改接口数据结构、不调整 ECharts 行为（缩放、hover、globalout、RangePicker 同步等保持一致）。

## 当前代码主要职责梳理

- 数据准备：对 `response.klineValueList` 按 `marketDate` 升序排序；默认选中全部 MA；初始化 `currentInfo` 与默认日期范围（最近一年）。
- 图表生命周期：初始化 ECharts 实例；ResizeObserver/resize 监听；卸载时 dispose。
- 图表渲染：根据 `dateRange`、`selectedMAs` 组装 `series`、计算 `dataZoom` start/end、`setOption`；注册 updateAxisPointer / globalout / dataZoom 事件以驱动顶部信息与时间范围联动。
- UI：顶部信息展示（OHLC + MA 值）+ RangePicker 预设时间 + MA 多选。

## 重构策略（保持功能不变）

### 1) 去掉冗余派生与“就地组装大块逻辑”

- 合并 `rawData` 与 `chartData`：当前 `chartData` 只是 `rawData` 的别名，可直接使用 `rawData` 作为唯一数据源，减少心智负担。
- 将 effect 内部的“组装数据”拆为多个小的 `useMemo/useCallback`：
  - `dates`、`klineValues`：从 `rawData` 派生，避免每次渲染在 effect 内重复 map。
  - `eventData`（散点/事件文本数据）：从 `response.messageList` 与 `rawData` 派生，抽成独立函数，减少嵌套与 `null` 过滤的噪音。
  - `maSeries`：从 `selectedMAs` 与 `rawData` 派生，抽出 `toNumberOrNull` 工具，统一处理 `'-' | undefined | null`。
  - `zoomRange`：提取 `calcZoomRange(dates, dateRange)`，统一处理“指定范围”和“默认最近一年”两条分支。
  - `chartOption`：由以上 memo 拼装成 `echarts.EChartsOption`，effect 只负责 `setOption` 与事件绑定。

### 2) 事件绑定与回调稳定性（减少重复 off/on）

- 将 `restoreToLastVisible` 保持为稳定的 `useCallback`（现有已是）。
- 将 `onUpdateAxisPointer`、`onDataZoom` 抽成 `useCallback`，并在 effect 中复用，减少 inline function 造成的重复注册风险。
- 保持当前行为：仍然在更新 option 后执行一次 `off` 再 `on`，但代码结构更清晰；同时移除 `// eslint-disable-next-line eqeqeq`，改为显式判空（`dataIndex !== null && dataIndex !== undefined`）。

### 3) 顶部 OHLC/MA 展示去重复

- 抽出：
  - `getUpDownClass(a, b)`：统一四处“涨跌色”判断逻辑，避免重复三元表达式。
  - `formatFixed(value, digits=2)` / `formatLocaleNumber(value)`：统一 `toFixed` 与 `toLocaleString` 的空值处理。
- 维持 DOM 结构与 className 不变，只替换重复表达式为函数调用，保证样式与布局不变。

### 4) 时间预设与日期校正逻辑收敛

- 将 `handlePresetClick` 的 switch 改为映射表（`preset -> (d) => d.subtract(...)` / `startOf('year')`），行为不变但更短更易扩展。
- 将 `adjustDate` 抽为纯函数（基于 `rawData`），并在 `handleDateChange` 中复用；保持“开始日期选择非交易日 -> 显示后面第一个交易日”的现有策略不变。
- `disabledDate` 中先缓存 `firstDate/lastDate`（useMemo）减少重复 `dayjs(...)` 创建。

### 5) 类型小幅增强（不改运行时）

- 为 K 线数据项补一个轻量类型（只声明本组件用到的字段），替换 `currentInfo: any`，减少后续维护误用。
- 为 `eventData` 结构加类型，避免 `filter(Boolean)` 带来的 `any[]` 扩散。

## 实施步骤（按风险从低到高）

1. 提取纯函数工具：数值转换、格式化、涨跌色 class 判断、zoom 计算（先保持旧逻辑逐行迁移）。
2. 用 `useMemo` 拆出 `dates/klineValues/eventData/maSeries/zoomRange/chartOption`，让渲染 effect 只做 `setOption + 事件绑定`。
3. 简化 header 渲染：OHLC 与 MA 显示改用工具函数，保证输出一致。
4. 简化日期预设与 RangePicker 逻辑：switch -> map；抽 `adjustDate`；确保交互一致。
5. 做一次整体回归检查与小范围修正（例如边界索引、空数据场景）。

## 验证清单（不做打包/代码检查）

- 初始进入：顶部默认显示最新一条数据；RangePicker 默认最近一年；图表默认显示最近一年范围。
- hover K 线：顶部日期与 OHLC/MA 同步变化。
- 鼠标移出图表区域：顶部回到“当前可视范围最后一个点”的数据（与现有一致）。
- 缩放/拖拽 dataZoom：RangePicker 的时间范围跟随变化；再次 hover/移出行为正常。
- 切换 MA 多选：线条显隐正确；顶部 MA 列表与值显示一致。
- 预设时间（今年以来/近三月等）：图表显示范围变化正确；日期范围不早于第一条数据。
- 手动选择日期：开始日期为非交易日时自动对齐到后面第一个交易日（现有规则保持）。
