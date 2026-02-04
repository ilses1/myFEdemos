## 目标

- 收益图（ECharts）legend 单行显示；当 legend 项超过一行时启用滚动，并把“左右切换按钮”固定在 legend 区域的最右侧。

## 现状定位

- 收益图实现位于 [incomeChart/index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/incomeChart/index.tsx)；当前 legend 为静态 legend（无 scroll），配置在 `option.legend`。

## 方案

- 将 `option.legend` 改为滚动 legend：

  - `type: 'scroll'`、`orient: 'horizontal'`、`top: 0`

  - 设置明确边界：`left: 0` + `right: 0`（或按页面右上角控件预留 `right: <px>`），让分页控件布局到右边界

  - 显式指定 `pageButtonPosition: 'end'`，并用 `pageButtonGap`、`pageIconSize` 做轻微微调

  - 保留现有 `icon/itemWidth/itemHeight`，避免视觉变化过大

## 需要改动的文件

- 修改 1 处 legend 配置：`src/pages/Chart/incomeChart/index.tsx`（`option.legend` 区块）。

##
