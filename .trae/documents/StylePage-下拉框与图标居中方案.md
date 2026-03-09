# StylePage 下拉弹出框与图标左右居中：实施方案

## 目标

1. 表格指标列（beta 等）的筛选下拉弹出框在触发点下方左右居中展示（而不是偏左/偏右）。

## 影响范围

- 代码：StylePage 指标列的 `filterDropdownProps / filterDropdown` 配置

  - 文件：[index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/Style/index.tsx#L326-L534)

- 样式：下拉面板与按钮内容布局

  - 文件：[index.less](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/Style/index.less)

## 实施步骤

### 1) 调整下拉弹出框“定位方式”为居中

- 在 `buildMetricColumn` 的 `filterDropdownProps` 中保留现有 `onOpenChange` 逻辑不变。

- 追加 Dropdown 定位相关配置（以 antd Dropdown 的 props 为准）：

  - `placement: 'bottomCenter'`（让弹层相对触发点左右居中）

  - `overlayClassName: styles.metricDropdownOverlay`（为弹层容器加可控类名，便于补充对齐/样式兜底）

- 若项目 antd 版本不支持 `bottomCenter` 或 `overlayClassName`：

  - 回退方案：使用 `placement: 'bottomLeft'` + CSS 通过 `overlayClassName` 做水平偏移；

  - 或使用 `align`（rc-trigger）做 `offset` 微调（以类型提示为准）。

##

## 验收标准

1. 点击任一指标列筛选图标后，下拉弹出框相对触发点左右居中（肉眼可见居中，不再明显偏左/偏右）。

## 回归检查点

- 打开/关闭下拉框时草稿态（draft）同步逻辑仍正常（不影响现有 `onOpenChange`）。

- “确认/重置”后过滤与排序状态联动行为不变。
