# 隐藏 messageTitle 显示（Plan）

## 目标

- 临时隐藏 K 线图上“事件”标注的 messageTitle 文本显示，并保留原逻辑便于后续恢复。

## 改动范围

- 仅改动 [index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/kChart/index.tsx) 中 `series` 里 `id: 'event'` 的 `renderItem` 渲染逻辑。

## 实施步骤

- 定位 `chartOption` → `series` → `id: 'event'` → `renderItem` 的 `return { type: 'text', ... }` 区块（当前通过 `style.text: dataItem.name` 显示 messageTitle）。
- 将该文本渲染块整体注释起来，并在注释前增加 `return;`（或 `return null;`）让 `renderItem` 不再返回图形元素，从而不再显示 messageTitle。
- 保持 `eventData`、`series` 结构与依赖不变，避免引入“未使用变量/依赖”问题，且后续取消注释即可恢复显示。

## 验证方式

- 刷新页面并观察图表：原先出现在 K 线图上的“事件标题气泡/文字”不再出现；K 线与均线正常显示、交互不受影响。

## 回滚方式

- 删除新增的 `return;`（或 `return null;`）并取消注释 `return { type: 'text', ... }` 区块即可恢复 messageTitle 显示。
