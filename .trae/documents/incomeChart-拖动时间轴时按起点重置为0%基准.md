## 现状定位

- 当前收益率是由 getProcessedData() 在过滤后用 filtered\[0] 作为 baseValue 计算 percentage（即只跟随「日期范围」的起点），见 [index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/incomeChart/index.tsx#L163-L189) 。

- dataZoom 只是显示/裁剪区间，没有监听拖动事件，所以拖动时间轴不会触发“新起点=0%”的重新基准。

## 目标行为

- 多条指数/叠加线在任意时刻都以“当前可视区间的起点”为 0%，后续点展示相对该起点的涨跌百分比。

- 当拖动 dataZoom 的左侧起点时，基准随之变化并立即重算全部系列。

## 实现方案

### 1) 把“原始值”保留下来，按基准索引实时算百分比

- getProcessedData() 继续负责按 dateRange 过滤，但返回每个点的 date + value（可保留现有 percentage 但后续不再依赖它做最终展示）。

- 新增一个基于“基准下标 baseIdx”的计算函数：

  - baseValue = values\[baseIdx]

  - percent\[i] = ((value\[i] - baseValue) / baseValue) \* 100（baseValue=0 时做保护，统一返回 0 或改用差值）。

- 主线（line1/line2）直接用 value 重算百分比；叠加线（当前是用 line2.percentage 造的模拟数据）为了保持演示一致，可用“减去基准点值”方式强制基准点归零：rebased\[i] = raw\[i] - raw\[baseIdx]。

### 2) 监听 dataZoom 事件，计算当前起点索引

- 在 setOption 之后给 chart 绑定 datazoom 事件（并在 effect cleanup 时解绑，避免重复绑定）。

- 从事件参数里优先取 batch\[0].startValue：

  - number → 直接当索引

  - string（日期）→ 用 dates.indexOf(startValue)

  - 否则退化为 start 百分比换算：Math.floor((start/100) \* (dates.length - 1))

- 得到 baseIdx 后，重算各 series.data 并调用 setOption 仅更新 series（给每条线加稳定 id，确保 merge 更新不重置 dataZoom）。

### 3) 交互与显示一致性

- tooltip 继续直接展示 param.value 的百分比即可（已是重算后的数据）。

- dateRange 改变时：重置 dataZoom 到 0\~100，并把基准索引回到 0（保证“范围起点=0%”）。

##
