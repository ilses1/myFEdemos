# KChart 鼠标移出后恢复最后一天数据 Spec

## Why

当前在图表内移动鼠标会更新顶部“收盘/开盘/最高/最低”和均线显示；当鼠标移出图表后，信息停留在最后一次 hover 的日期，影响用户查看最新/当前区间末尾数据。

## What Changes

- 在鼠标移出图表绘图区后，顶部 OHLC 与均线显示自动恢复为“最后一天”的数据
- “最后一天”以当前可视区间（dataZoom / dateRange）为准；无法判定时回退为全量数据最后一条

## Impact

- Affected specs: K 线图交互、顶部信息栏展示、均线展示
- Affected code: src/pages/Chart/kChart/index.tsx（ECharts 事件监听与 currentInfo 状态更新）

## ADDED Requirements

### Requirement: 鼠标移出后恢复默认显示

系统 SHALL 在鼠标移出图表区域后，将顶部展示的数据恢复为“最后一天”的数据记录。

#### Scenario: 正常移出

- **WHEN** 用户在图表内 hover 任意日期导致顶部信息变化
- **AND WHEN** 鼠标移出图表区域（不再触发 axisPointer 更新）
- **THEN** 顶部日期、收盘/开盘/最高/最低与已选择的均线值显示为“最后一天”的值

#### Scenario: 选择了自定义时间范围

- **WHEN** 用户通过日期选择器/缩放选择了一个不以全量最后一天结尾的区间
- **AND WHEN** 鼠标移出图表区域
- **THEN** 顶部显示恢复为该区间末尾交易日对应的数据（或最接近的可用交易日）

## MODIFIED Requirements

### Requirement: hover 更新顶部信息

系统 SHALL 在 hover（updateAxisPointer）时更新顶部信息；在移出图表后 SHALL 恢复为默认“最后一天”显示，而不是保留最后一次 hover 的日期。

## REMOVED Requirements

（无）
