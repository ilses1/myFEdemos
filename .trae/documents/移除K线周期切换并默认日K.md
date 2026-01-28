## 目标

- 在 [index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/kChart/index.tsx) 中移除“日 K/周 K/月 K”切换控件。
- 图表数据固定按“日 K”展示（保持当前默认行为：日 K）。

## 代码调整

- 删除 `Period` 类型与 `period`/`setPeriod` 状态。
- 简化 `chartData`：直接使用 `rawData`（保留当前日 K 的 MA 数据来源与显示逻辑）。
- 移除周 K/月 K 聚合相关代码：聚合 useMemo 分支与 `calculateMA`（因不再需要）。
- 清理依赖与导入：移除 `Radio` 引入；更新相关 `useEffect`/`useMemo` 的依赖数组，去掉 `period`。

## UI 调整

- 删除 Toolbar 中的 `Radio.Group`（日 K/周 K/月 K 按钮）；其余控件（均线选择、日期范围、快捷区间）保持不变。

## 自检点

- 页面可正常渲染；K 线与均线正常显示。
- 图表缩放/时间范围联动逻辑不受影响。
- 工程内不再存在 `period` 相关引用与无用导入。
