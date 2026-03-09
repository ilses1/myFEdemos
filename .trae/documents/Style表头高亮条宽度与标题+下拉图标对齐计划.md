## 目标

- 将 [index.less:L229-L239](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/Style/index.less#L229-L239) 的表头高亮条宽度，从“按 th 的百分比裁剪”改为“与该列表头内容（列名 + 下拉筛选图标按钮）实际占用宽度一致”，并保持在 th 内水平居中。

## 现状确认（只读检查）

- 当前高亮条画在 `th.metricHeaderCellActive::after` 上，宽度通过 `left/right` 百分比估算（`26% / 20%`），当列名长度或图标间距变化时会失真。

- 该页面已将表头内容布局调整为：

  - `:global(.ant-table-filter-column)`（容器）

  - `:global(.ant-table-column-title)`（列名）

  - `:global(.ant-table-filter-trigger)`（下拉图标按钮）

  - 见 [index.less:L86-L113](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/Style/index.less#L86-L113)

## 实施方案（核心思路）

- 不再让高亮条跟随 `th` 的宽度，而是让高亮条跟随“能包住列名+图标的那层容器”的宽度。

- 由于纯 CSS 无法让 `th::after` 自动取子元素宽度，改为把 `::after` 挂到表头内容容器（优先使用 `.ant-table-filter-column`）上：

  - 让该容器“收缩到内容宽度”（shrink-to-fit）

  - 同时用 `margin: 0 auto` 保持容器在 `th` 内居中

  - 高亮条 `left: 0; right: 0;` 即可与内容同宽

  - 通过负 `top` 抵消 `th` 的 `padding-top`，把条顶到单元格顶部

## 具体改动步骤

1. DOM 结构确认（浏览器 DevTools）

   - 打开 Style 页面表格，检查某个指标列的表头 `th` 内部结构，确认“列名 + 下拉图标”是否同在 `.ant-table-filter-column` 容器内。

   - 若 Antd 版本/结构差异导致不在同一容器内，则记录实际父容器类名（常见备选：`.ant-table-column-sorters` 或其他 header 容器），后续第 3 步按实际容器替换选择器。

2. 调整高亮条挂载点（修改 less）

   - 在 `.styleTable` 作用域内：

     - 保留 `th.metricHeaderCellActive` 的 `position: relative`（如后续需要叠层控制）。

     - 移除/废弃当前 `th.metricHeaderCellActive::after` 的百分比宽度方案。

   - 新增规则：当 `th` 处于 `.metricHeaderCellActive` 时，给其内部的表头内容容器设置：

     - `position: relative;`

     - `width: fit-content;`

     - `margin: 0 auto;`

   - 新增规则：在该容器上添加 `::after`：

     - `content: ''`

     - `position: absolute; left: 0; right: 0;`

     - `top: -10px;`（对应当前 th 的 `padding-top: 10px`，见 [index.less:L118-L123](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/Style/index.less#L118-L123)）

     - `height: 4px; background: rgba(191, 0, 8, 0.3);`

     - `z-index: 1; pointer-events: none;`

3. 兼容性与细节处理

   - 若发现 `fit-content` 在目标浏览器环境表现异常，则改为更稳的 shrink-to-fit 写法之一：

     - `display: inline-flex;` + 让上层居中（`text-align: center` 或保持现有 align 机制）

     - 或 `display: inline-block;`（视容器需要而定）

   - 若列名与图标之间存在额外 padding/margin 导致条宽略大/略小，则以“列名+图标整体视觉宽度”为准，微调容器的 gap/margin（优先不改高亮条本身）。

4. 验证点（手动验收）

   - 触发任意指标列的筛选或排序，使 `headerActive` 为 true（见 [index.tsx:L338-L352](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/Style/index.tsx#L338-L352)），确认：

     - 高亮条宽度与该列“列名 + 下拉图标按钮”整体宽度一致

     - 高亮条水平居中且贴在 th 顶部

     - 不影响非 active 的列、不影响表格 hover、固定列等样式

## 影响范围

- 仅作用于 Style 页面表格的 `.styleTable` 作用域（[index.less](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/Style/index.less)），且仅在 `th` 带 `.metricHeaderCellActive` 时生效。
