## 目标

在 [index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/Industry/index.tsx) 基础上，参照截图：

- 调整表格内部线条样式（表头/表体分割线、列分割线）
- 调整“基金区域”背景色与分隔线
- 无任何输入条件时：默认展示所有行业的所有 ETF 暴露数据
- 展示规则：每个行业默认展示 3 只基金，基金区域可局部向下滚动查看全部

## 现状梳理（为什么现在不满足）

- 当前表格按“基金”打平为多行，并用 rowSpan 合并行业/权重/指数列；这会导致“每个行业基金区域局部滚动”无法自然实现（滚动会作用在整表或分页，而不是单个行业的基金区域）。
- 默认 topN=1，初始页面只显示 1 个行业（与“无条件显示全部行业”冲突）。

## 实施方案（核心改造）

### 1) 数据结构从“按基金打平”改为“按行业一行”

- 将表格 dataSource 由 `buildTableRows(filteredGroups)` 改为 `filteredGroups`（每条记录就是一个行业）。
- 调整 TableRow 类型为：
  - 行业维度字段：industryLabel / exposureWeight / indexCode
  - 资金列表字段：funds: FundItem[]

### 2) 基金区域渲染为“单元格内的可滚动列表”

- 将原来的 3 列（基金简称/代码/规模）合并为一个“基金区域”列（单个单元格），在单元格内渲染一个 3 列布局的列表：
  - 每个 fund 作为一行：左（基金简称）中（基金代码）右（基金规模）
  - 列表容器固定高度（约等于 3 行），`overflow-y: auto`，从而实现“默认 3 只基金 + 局部滚动看全部”
- 细节：
  - 固定每行高度（或固定 padding + line-height）以确保“3 行高度”稳定
  - 列表最后一行去掉底部分割线，提升视觉一致性

### 3) “无条件显示全部行业”与 TopN 逻辑

- 将 topN 的语义改为：
  - `0` 表示“全部行业”
  - `1-10` 表示“暴露权重 Top N 行业”
- UI 层：
  - 在下拉选项中新增“全部”（value=0）
  - 将 Form initialValues 与 state 默认 topN 改为 0
- 过滤/排序逻辑层：
  - `topN=0` 时不做 `.slice(0, topCount)`，直接返回全部行业
  - 仍保留按 exposureWeight 的排序（asc/desc）能力

## 样式改造（对齐截图）

在 [index.less](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/Industry/index.less) 增加/调整以下样式块：

- 表格线条：
  - 表头 th 增加 `border-right`，表体 td 增加 `border-right`（最后一列除外）
  - 调整 `border-bottom` 颜色到更接近截图的灰度（保持与现有 `#e6e8eb/#f0f0f0` 体系一致）
- 基金区域背景与线条：
  - 基金区域单元格背景设为浅灰（如 `#f7f8fa` 或截图更接近的值）
  - 基金列表每行使用 `border-bottom` 做行分割
  - 基金列表内部 3 列之间用 `border-right` 做列分割
- hover 行态兼容：
  - antd 行 hover 可能覆盖单元格背景；对基金区域单元格在 hover 下保持背景色不被覆盖（必要时提高选择器优先级）

## 需要修改的文件

- [index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/Industry/index.tsx)
  - 调整类型、数据处理、columns 渲染、topN 默认值与选项
- [index.less](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/Industry/index.less)
  - 新增基金区域样式与表格线条样式

## 验证方式（不做打包与代码检查）

- 直接在本地开发页验证：
  - 初始进入页面：无需点击“查询”，即可看到所有行业（可分页）与对应基金区域
  - 每个行业的基金区域默认只露出 3 行高度，向下滚动可查看剩余基金
  - 表格内部分割线、基金区域背景色与截图一致（或在同一视觉体系内最接近）
  - 暴露权重排序切换后，行业排序正确且分页回到第一页
