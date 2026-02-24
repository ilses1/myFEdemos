# Tasks

- [x] Task 1: 梳理“最后一天”取值规则并补齐边界用例
  - [x] 明确 lastIndex 取值优先级：可视区间末尾 > 全量最后一条
  - [x] 明确 dateRange 末尾为非交易日时的对齐策略（取不大于 end 的最近交易日，或取下一交易日）
- [x] Task 2: 在 KChart 增加鼠标移出恢复逻辑
  - [x] 为 ECharts 实例增加 globalout（或等价）事件监听，触发 setCurrentInfo(lastInfo)
  - [x] 必要时增加 DOM mouseleave 兜底，避免某些情况下事件不触发
  - [x] 保证不会与 dataZoom 的联动更新形成循环或抖动
- [x] Task 3: 自测与回归验证
  - [x] hover 任意日期后移出图表，顶部恢复最后一天
  - [x] 切换均线选择后上述逻辑仍生效
  - [x] 修改日期范围（含非交易日）后移出图表恢复为区间末尾

# Task Dependencies

- Task 2 depends on Task 1
- Task 3 depends on Task 2
