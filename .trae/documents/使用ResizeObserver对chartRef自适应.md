# 使用 ResizeObserver 对 chartRef 自适应（计划）

## 目标

- 用 `ResizeObserver` 监听 `chartRef` 容器尺寸变化，在容器宽高变化时触发 `echartsInstance.resize()`，让图表在布局变化（侧边栏收起、父容器尺寸变化、非 window resize 场景等）下也能自适应。

## 现状定位

- 当前 [incomeChart/index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/incomeChart/index.tsx) 在 `useEffect` 内仅通过 `window.addEventListener('resize', ...)` 调用 `chartInstance.current?.resize()`。
- 这只能覆盖浏览器窗口变化，无法覆盖“父容器尺寸变化但 window 没变”的场景。

## 实施方案

1. 在 `IncomeChart` 当前负责初始化/更新图表的 `useEffect` 中，替换（或补充）现有 `window resize` 逻辑为 `ResizeObserver`：
   - 当 `chartRef.current` 存在时创建 `ResizeObserver`。
   - observer 回调内调用 `chartInstance.current?.resize()`。
   - 用 `requestAnimationFrame` 做一次轻量合并，避免连续 resize 导致抖动/高频调用。
2. 兼容兜底（可选但推荐）：
   - 若运行环境不支持 `ResizeObserver`，保留 `window resize` 监听作为 fallback。
3. 清理与生命周期：
   - 在 `useEffect` cleanup 中 `disconnect()` observer，并取消未执行的 `requestAnimationFrame`。
   - 由于该 `useEffect` 依赖 `[dateRange, overlaySelected]`，每次重跑都确保先清理旧 observer，避免重复监听。

## 变更范围

- 修改 1 个文件：
  - [incomeChart/index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/incomeChart/index.tsx)

## 验证方式

- 本地打开该页面：
  - 缩放浏览器窗口：图表应正常自适应。
  - 触发父容器尺寸变化（例如：页面布局面板/侧边栏展开收起、容器宽度变化）：图表应自动 `resize`，不会出现裁切、空白或错位。
  - 切换日期范围/叠加指数：图表仍正常渲染且 resize 逻辑不重复绑定。

## 说明/假设

- 项目运行环境支持现代浏览器能力；如需兼容更老环境，将启用 `window resize` fallback（无需引入 polyfill）。
