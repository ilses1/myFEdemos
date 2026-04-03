---
title: ECharts Legend 图标与文字垂直居中对齐：rich + padding 实战
tags: [ECharts, 前端, 可视化]
---

# ECharts Legend 图标与文字垂直居中对齐：rich + padding 实战

在用 ECharts 画折线/柱状图时，Legend（图例）的**图标**和**文字**经常会出现“看起来不在一条水平线上”的问题：图标像是略微偏上/偏下，尤其在 `icon: 'rect'`、`itemWidth/itemHeight` 比较小，或者字体略大时更明显。

本文用一个项目里的真实配置来讲清楚：**为什么会不齐**、以及如何用 **rich + padding** 做到“视觉居中”。

适用范围：

- ECharts 5.x（其他版本也可参考，细节以实际效果为准）
- Legend 使用默认布局（水平/垂直都可），且 icon 为几何图形（`rect/circle/roundRect` 等）

## 问题本质：baseline 对齐 ≠ 视觉居中

Legend 的文字是按字体的 baseline（基线）排版的，而图标（例如 `rect`）是一个固定高度的图形块。即使它们在同一行布局，**基线对齐**也很容易导致**视觉上上下不齐**：

- 字体的“可视高度”并不等于 `fontSize`（还包含 ascender/descender 等度量）。
- icon 是一个几何矩形，视觉中心很明确。
- 不同字体、不同浏览器渲染、不同字号，偏差会变化。

所以这类问题通常要靠“微调”来解决：要么让文字的行盒（line box）更贴合 icon，要么给文字一个小的位移补偿。

## 方案：legend.textStyle.rich + 负 padding 微调

你可以直接从下面这段开始（先复现，再按需微调）：

```ts
legend: {
  icon: 'rect',
  itemWidth: 12,
  itemHeight: 12,
  textStyle: {
    rich: {
      a: {
        verticalAlign: 'middle',
      },
    },
    padding: [0, 0, -2, 0],
  },
},
```

这段配置的思路是：

- 用 `textStyle.padding` 把文字整体往上（或往下）挪一点点（视觉补偿）：
  - `padding: [top, right, bottom, left]`
  - 这里 `bottom: -2` 等价于给文字一个“向上”的视觉补偿
- 同时预留 `rich` 样式（`a.verticalAlign = 'middle'`），为后续更稳的“行内垂直对齐”打基础

### 关键点：rich 要“用起来”才能生效

`textStyle.rich` 的样式一般需要配合 formatter 输出 rich token 才会真正应用到文字片段上。最稳的做法是在 legend 加上 `formatter`，把 name 包一层 `{a|...}`：

```ts
legend: {
  icon: 'rect',
  itemWidth: 12,
  itemHeight: 12,
  formatter: (name: string) => `{a|${name}}`,
  textStyle: {
    rich: {
      a: {
        verticalAlign: 'middle',
      },
    },
    padding: [0, 0, -2, 0],
  },
},
```

这样 `a.verticalAlign` 才会明确作用于 legend 文本本身；`padding` 继续提供“最后 1~2 像素”的视觉微调空间。

## 参数怎么调：推荐的调参顺序

Legend 对齐的微调属于“视觉问题”，建议按下面顺序调，能更快收敛：

1. **先定 icon 尺寸**：`itemWidth` / `itemHeight`
2. **再定文字行高**（可选，但很有效）：`textStyle.lineHeight` 设为接近 `itemHeight` 或略大一点
3. **最后用 padding 做 1~3px 的微调**：通常改 `padding[2]`（bottom）或 `padding[0]`（top）

示例（更偏“可控”的版本）：

```ts
legend: {
  icon: 'rect',
  itemWidth: 12,
  itemHeight: 12,
  formatter: (name: string) => `{a|${name}}`,
  textStyle: {
    lineHeight: 12,
    rich: {
      a: {
        verticalAlign: 'middle',
      },
    },
    padding: [0, 0, -2, 0],
  },
},
```

如果你发现文字仍然偏下（常见），优先尝试把 `padding` 的 `bottom` 改成 `-1/-2/-3`；如果偏上则把 `bottom` 调回接近 0 或改调 `top`。

## 常见坑

- **只写 rich 不写 formatter**：看起来“写了 rich”，但实际文字没有套用 rich token，效果可能不明显或不稳定。
- **不同字号/字体偏差不同**：`-2` 是视觉经验值，不是通用真理。改成 `-1 / -3` 都很常见。
- **滚动 legend（type: 'scroll'）**：分页按钮、iconSize、itemGap 等也会影响整体视觉密度，但不影响“文字与图标居中”的核心原理。

## 小结

Legend 图标与文字的对齐问题，核心在于文字的 baseline 与图标几何中心不一致。一个实用的工程化做法是：

- 用 `formatter` 把 legend 文本包成 rich token
- 在 `textStyle.rich` 里用 `verticalAlign: 'middle'`
- 最后用 `textStyle.padding` 做 1~2px 的细调（例如 `padding: [0, 0, -2, 0]`）

如果你想把这套对齐方式做成“可复用配置”，也可以把 `itemHeight -> lineHeight -> padding` 这三者绑定成一个小函数，方便在不同图表里快速套用。
