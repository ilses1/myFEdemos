## 背景

- 需要将收益图的图例（legend）居中显示。
- 对于“中证 REITs 全收益”折线图，折线下方的区域颜色为 rgba(72, 110, 188, 0.1)，且区域填充不以 0% 为界限。

## 改动内容

- Legend 居中：将 option.legend.left 改为 'center'，移除 right 与 align 的左对齐设置。
- 区域填充基准：在“中证 REITs 全收益”系列的 areaStyle 中加入 origin: 'start'，确保填充区域始终向 y 轴最小端（图表底部）填充，而不是以 0 为基准。

## 代码位置

- 图例配置位置：[index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/incomeChart/index.tsx#L317-L331)
- 主线 1 区域填充位置：[index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/incomeChart/index.tsx#L250-L256)
- 主线 2 区域填充位置：[index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/incomeChart/index.tsx#L270-L276)

## 具体修改示例

- Legend：

```ts
legend: {
  show: true,
  type: 'scroll',
  orient: 'horizontal',
  top: 0,
  left: 'center',
  icon: 'rect',
  itemWidth: 12,
  itemHeight: 12,
  pageButtonPosition: 'end',
  pageButtonGap: 8,
  pageIconSize: 12,
},
```

- 系列 areaStyle（两处均需）：

```ts
...(mainLine1Name === '中证REITs全收益'
  ? { areaStyle: { color: 'rgba(72, 110, 188, 0.1)', origin: 'start' } }
  : {}),

...(mainLine2Name === '中证REITs全收益'
  ? { areaStyle: { color: 'rgba(72, 110, 188, 0.1)', origin: 'start' } }
  : {}),
```

## 校验要点

- 图例在图表顶部水平居中；滚动型 legend 仍可分页滚动。
- 当“中证 REITs 全收益”线在 0% 上下波动时，填充区域始终向图表底部填充，不以 0% 作为边界。
- 颜色应显示为 rgba(72, 110, 188, 0.1)。

## 兼容性说明

- ECharts 的 areaStyle.origin 属性在 v5 中可用；设置为 'start' 能满足“非 0% 基准填充”的需求。若后续需要向上填充，可改为 'end'。
