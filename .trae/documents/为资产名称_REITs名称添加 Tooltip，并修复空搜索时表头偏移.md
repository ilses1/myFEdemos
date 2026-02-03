## 目标

- 给“资产名称”(右表 assetName)和“REITs 名称/标的名称”(左表 securityName)增加悬浮提示，展示完整名称。
- 修复“涨跌幅(全市场)”在搜索结果为空时，“涨跌幅”表头向左偏移的问题。

## 现状定位

- 左表第 1 列为 securityName（当前用 `.assetName` 做省略号）。
- 右表第 1 列为 assetName（同样做省略号）。
- 表头偏移根因：`index.less` 里对表头右侧 padding 使用了 `th:nth-last-child(2)`（用来绕开滚动条占位列）。当搜索结果为空时，Antd 可能不会渲染滚动条占位 `th.ant-table-cell-scrollbar`，导致 `nth-last-child(2)` 命中“倒数第二列”(即“涨跌”)，而不是“最后一列”(即“涨跌幅”)，从而出现表头错位。

## 实施方案

### 1) 增加 Tooltip

- 在 [index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/Table/index.tsx) 引入 `Tooltip`。
- 左表 securityName 的 render：`Tooltip title={text}` 包裹当前的 `<span className={styles.assetName}>`。
- 右表 assetName 的 render：同样用 `Tooltip title={text}` 包裹现有 `<span ... className={styles.assetName}>`。

### 2) 修复空搜索时表头右侧 padding 计算

- 在 [index.less](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/Table/index.less) 的表头样式中：
  - 保留现有 `th:nth-last-child(2)` 的处理（当存在滚动条占位列时仍然生效）。
  - 新增一条兼容空数据场景的规则：
    - `th:last-child:not(.ant-table-cell-scrollbar)` 也补上同样的 `padding-right: 12px`。
  - （可选但更稳）确保 `th.ant-table-cell-scrollbar` 不会被额外 padding 影响。

## 验证点（改完后自测）

- 在左表搜索框输入一个不存在的关键字，使 dataSource 为空：
  - “涨跌幅”表头不再向左偏移，三列对齐稳定。
- 鼠标悬浮在左表/右表第一列名称上：
  - Tooltip 能展示完整名称；省略号样式保持不变。

如果你确认这个方案，我就开始修改 `index.tsx` + `index.less` 并把改动结果贴出来。
