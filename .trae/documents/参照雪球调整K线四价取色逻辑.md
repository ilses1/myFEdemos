## 目标

把 K 线头部信息区的「收盘 / 开盘 / 最高 / 最低」四个价格的颜色与取色逻辑改成与雪球（https://xueqiu.com/S/CSI932047）一致。

当前实现位于：[index.tsx:L589-636](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/kChart/index.tsx#L589-L636)。

## 现状梳理（只读结论）

- 目前四价颜色通过 `getUpDownClass(a, b, geIsUp)` 决定，比较基准是「同一根 K 线内部字段」：
  - 收盘：close vs open
  - 开盘：open vs close（并用 geIsUp=false 做了反转）
  - 最高/最低：high/low vs close
- 样式颜色在 [index.less](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/kChart/index.less) 的 `.value.up/.value.down`：
  - up：`#ef5350`
  - down：`#26a69a`
- K 线蜡烛图本体也用同一套红/绿：`series[0].itemStyle.color/color0`。

## 目标行为（对齐雪球的假设与落地规则）

由于雪球页面动态渲染且难以稳定抓取其 CSS/DOM，这里按雪球行情页的常见规则对齐（后续若你指出雪球的精确规则不同，再微调即可）：

1. **比较基准统一为“昨收（上一交易日收盘价）”**
   - 收盘：close vs prevClose
   - 开盘：open vs prevClose
   - 最高：high vs prevClose
   - 最低：low vs prevClose
2. **涨/跌/平三态**
   - value > base：up（红）
   - value < base：down（绿）
   - value == base：flat（中性灰/黑）
3. **首日/无昨收兜底**
   - 当找不到 prevClose（例如序列第一个点）时，四价都展示为 flat（中性）。
4. **颜色取值（对齐雪球的视觉风格）**
   - up：改为更“中式行情红”，优先复用项目其它图表已有色值：`#bf0008`（当前 LineChart 使用）
   - down：`#008c54`（当前 LineChart 使用）
   - flat：`#333` 或 `#666`（以你页面整体视觉为准，默认 `#333`）

## 实施方案（改动点）

### 1) 计算 prevClose（昨收）

- 在渲染头部四价前，通过 `rawData.indexOf(currentInfo)` 计算当前索引：
  - `idx = rawData.indexOf(currentInfo)`
  - `prevClose = idx > 0 ? rawData[idx - 1].closeValue : null`
- 这样无需改动 `currentInfo` 结构，也不引入额外 state。

### 2) 替换取色函数：二元比较 → 三态比较

- 新增一个更直观的函数，例如 `getCompareClass(value, base)`：
  - base 为空：返回 `styles.flat`
  - 支持 epsilon（如 `1e-8`）避免浮点误差导致“假涨跌”
  - 返回 `styles.up / styles.down / styles.flat`
- 逐个替换 [index.tsx:L589-636](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/kChart/index.tsx#L589-L636) 中四价的 `getUpDownClass(...)` 调用，使其都基于 `prevClose`。
