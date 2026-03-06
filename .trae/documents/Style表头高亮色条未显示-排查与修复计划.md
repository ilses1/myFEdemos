## 目标

当某一列存在「排序」或「区间范围筛选」时，该列表头顶部出现一条红色高亮色条；当前现象为已实现逻辑但页面未显示，需要定位原因并修复。

## 现状梳理（基于代码）

- 激活条件：`filtered(区间)` 或 `sorted(排序)` 任一为真则认为表头应高亮。
- 注入方式：在列配置里通过 `onHeaderCell` 给 `th` 增加 `styles.metricHeaderCellActive`。
- 样式方式：`.metricHeaderCellActive::before` 绝对定位在 `th` 顶部绘制 3px 红条。

## 排查思路

优先判断是「状态没变」还是「样式没生效」。

### 1) 确认是否触发激活状态（状态层）

1. 在页面上对任一指标列执行以下操作之一：
   - 点击表头触发排序；或
   - 打开筛选下拉，输入 min/max 后点击“确认”。
2. 观察对应筛选图标是否变红（如果图标变红通常说明 `filtered` 至少在表格内部已生效）。
3. 如果图标变红但色条不出现：更可能是样式没生效或 class 未挂到 `th`。
4. 如果图标不红且色条也不出现：更可能是状态未写入（例如没有点击“确认”、或排序事件没触发到 `onChange`）。

### 2) 确认 `th` 上是否有激活 class（DOM 层）

用浏览器 DevTools 检查表头 `th`：

- 目标：找到对应列的 `th.ant-table-cell`，确认其 `class` 中是否包含类似 `metricHeaderCellActive__xxxx`（CSS Modules 哈希类名）。
- 分支判断：
  - **A. class 不存在**：说明 `onHeaderCell` 返回的 `className` 没有合并进最终 `th`，需要改注入方式。
  - **B. class 存在但看不到红条**：说明伪元素样式被覆盖或不可见，需要改样式实现方式。

### 3) 样式层验证（CSS 层）

若走到 2B（class 已在 `th` 上）：

- 在 DevTools 的 Styles 面板里确认：
  - `.metricHeaderCellActive` 是否设置了 `position: relative`；
  - `::before` 是否存在、是否有 `height: 3px` 与 `background: #ff4d4f`；
  - 是否被其它选择器覆盖（尤其是 `::before` 被重置、或被更高层遮挡）。

## 修复方案（按优先级）

### 方案 1：确保 class 注入方式必定生效（推荐优先）

如果 2A（class 不存在），将激活 class 改为通过 `column.className` 注入到 cell，并用更精确的全局选择器落在 `th`：

- 在列定义中同时设置：
  - `className: headerActive ? styles.metricHeaderCellActive : ''`
  - （保留或移除 `onHeaderCell`，以最终 DOM 验证为准）
- 样式侧改为命中 `th`：
  - 使用 `:global(.ant-table-thead > tr > th).metricHeaderCellActive::before` 或在 `.styleTable` 作用域下组合选择器，避免 class 落在不渲染伪元素的子节点上。

验收：激活后 `th` 上一定有 class，且红条可见。

### 方案 2：放弃依赖 `th`，改在表头内容内渲染（最稳兜底）

如果 2B（class 存在但伪元素不可见），或者 1/2 均难稳定：

- 将 `title` 从字符串改为一个自定义 ReactNode：
  - 外层包一个 `div`（相对定位）
  - 顶部插入一个 3px 的 `div`（或使用 `::before`）
  - 下面放原始 title 与 filter icon
- 这种方式不依赖 antd 的 `th` 结构，样式更可控。

验收：只要激活状态为真，红条在视觉上必出现。

### 方案 3：仅样式增强（轻量）

如果 2B 且仅是“看不见”：

- 给 `::before` 增加 `z-index: 1; pointer-events: none;`
- 必要时给 `th` 增加 `background-clip: padding-box;`

验收：红条可见且不影响点击/hover。

## 验证清单

- 排序激活：点击任一指标列表头后，出现红条；取消排序后红条消失。
- 区间激活：输入 min/max 点击“确认”后出现红条；点“重置”后消失。
- 多列场景：只高亮被排序列；多列范围筛选时多列各自高亮。
- 固定列与横向滚动：滚动时红条不抖动、不被遮挡。
