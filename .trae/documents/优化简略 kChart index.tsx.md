## 目标

- 在不改变现有功能与交互的前提下，精简并优化 [index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/kChart/index.tsx) 的代码结构与可读性
- 降低重复计算与重复绑定事件的开销（尤其是事件标注与 ECharts 事件监听）
- 保持现有 UI/样式、默认时间范围（近 1 年）、缩放联动、均线选择、事件标注、顶部信息联动完全一致

## 不做的事（Non-goals）

- 不调整任何视觉样式（包括颜色、字体、布局、交互文案）
- 不引入新依赖、不改动数据源结构（仍使用 `response`）
- 不改动既有行为边界（如 globalout 恢复逻辑、dataZoom 与 RangePicker 的双向联动策略）

## 主要问题点（现状）

- `chartData` 只是 `rawData` 的别名：可移除一层 `useMemo`
- 事件标注 `scatterData` 通过 `chartData.find` 查找，复杂度 O(m\*n)，数据量大时会明显变慢
- 构建 `series/option` 与 ECharts 事件 `off/on` 在同一个 `useEffect` 中，每次依赖变更都会重复解绑/绑定，代码冗长且不必要
- 顶部 OHLC 值样式判断重复，且条件表达式较长
- `handlePresetClick/handleDateChange` 内部包含局部函数与重复逻辑，可抽取为小的纯函数

## 改造方案（保持行为不变）

### 1) 数据准备与派生数据统一用 `useMemo`

- 保留 `rawData` 排序逻辑
- 移除 `chartData` 别名，直接使用 `rawData`
- 新增（不新增文件，仍在本文件内）派生：
  - `dates`：`rawData.map(marketDate)`
  - `values`：K 线四价数组
  - `dateToIndex` / 或 `dateToItem`：用 `Map` 预索引 `marketDate -> item`，用于事件标注与快速定位
  - `scatterData`：用 `Map` 进行 O(m) 组装，避免 O(m\*n)
  - `maSeries`：把 MA 线的 series 生成拆成可复用逻辑（仍输出相同配置）

### 2) 缩放区间计算抽成纯函数

- 把 “根据 `dateRange` 计算 dataZoom 的 start/end” 抽为一个纯函数：
  - 输入：`dates`、`dateRange`
  - 输出：`{ zoomStart, zoomEnd }`
- 逻辑保持完全一致（包含默认近 1 年 fallback），仅减少主 effect 的体积

### 3) ECharts 事件监听只注册一次，避免每次 setOption 重绑

- 在 “初始化图表” 的 effect 中注册一次：
  - `updateAxisPointer`：通过 ref 读取最新 `rawData`，设置 `currentInfo`
  - `globalout`（含 zr）：调用 `restoreToLastVisible`
  - `dataZoom`：读取最新 `dates`，同步更新 `dateRange`（保留 `isChartUpdating` 防回环）
- 为了确保 handler 读到最新数据：
  - 增加 `rawDataRef/datesRef` 等 ref，在数据变更时同步更新
- “渲染/更新 option” 的 effect 只负责 `setOption`，不再承担事件绑定，代码显著缩短且行为更稳定

### 4) 顶部 OHLC/MA 显示逻辑精简

- 抽取一个小函数用于返回涨跌 class：
  - 例如 `getUpDownClass(a, b, upClass, downClass)`（不新增注释）
- 统一 `toFixed`/占位符处理，保持渲染结果一致
- MA 数值格式化逻辑抽为 `formatNumber2` 之类的纯函数（仍返回当前的 `toLocaleString('en-US', { ...2 })` 结果）

### 5) 类型收敛（不影响运行）

- 将 `currentInfo` 从 `any` 收敛到最小必要类型（至少包含本文件实际使用字段）
- 为 preset type 使用字面量联合（来自 `DATE_PRESETS` 的 value），减少魔法字符串分支风险

## 实施步骤（按顺序）

1. 在本文件内新增必要的纯函数与最小类型定义（不拆文件）
2. 重构数据派生：dates/values/map/scatterData/maSeries 用 `useMemo` 统一生成
3. 拆分两个 effect：
   - 图表初始化 + 事件监听注册（只执行一次，含销毁清理）
   - option 更新 effect（依赖 rawData、selectedMAs、dateRange 等）
4. 精简顶部渲染逻辑（OHLC 与 MA 行）
5. 全量走一遍交互点，确保行为一致

## 验证清单（手工验证即可）

- 首次进入：顶部日期范围默认近 1 年，`currentInfo` 默认最后一条
- 鼠标移动：顶部 OHLC 与 MA 随 crosshair 切换
- 鼠标移出（含图表区域/全局）：顶部信息恢复到当前可视范围最后一条（现有 restore 语义）
- 缩放/拖动 dataZoom：RangePicker 日期同步变化，且不出现抖动/死循环
- RangePicker 选择非交易日：起始日期自动对齐到后续第一个交易日（现有逻辑保持）
- 均线多选：勾选/取消立即生效，颜色/线型不变；顶部 MA 数值与显示开关不变
- 事件标注文本仍显示在对应日期 K 线附近，内容一致
