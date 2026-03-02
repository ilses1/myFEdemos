## 目标

将 [index.tsx:L250-259](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/CatalogScroll/index.tsx#L250-L259) 处“收起目录 / 展开目录”的交互控件，替换为你提供截图中的窄竖向把手样式（带方向箭头 + 竖排文案），并保持点击切换目录展开/收起的行为不变。

## 设计假设（便于先落地，后续可微调）

- 把手为 1 个可点击的竖向胶囊按钮：上方/中部显示箭头（收起时向左、展开时向右），其下显示竖排文字“收起目录 / 展开目录”。
- 使用现有的 `RightOutlined / LeftOutlined` 图标，样式主要由 `index.less` 控制，实现与截图接近的浅蓝渐变、描边、阴影、高光效果。

## 实施步骤

1. **梳理现状**

   - 阅读 `CatalogScroll/index.tsx` 中目录区域与把手区域的布局关系（`catalog`、`catalogCollapsed`、`collapseHandle`）。
   - 阅读 `CatalogScroll/index.less` 里现有 `.collapseHandle` / `.collapseButton` 的样式，确认哪些可复用、哪些需要替换为新样式。

2. **替换交互控件结构**

   - 将当前 Antd `Button` 替换为更可控的原生 `<button type="button">`（或保留 `Button` 但改为自定义内容），在按钮内部增加：
     - 图标容器（显示左右箭头）
     - 文案容器（显示“收起目录 / 展开目录”，按竖排展示）
   - 保留现有 `aria-label` 文案与 `onClick={() => setIsCatalogCollapsed(...)}` 逻辑不变，确保键盘可用（Enter/Space 触发）。

3. **实现截图样式（核心）**

   - 更新 `index.less`：
     - 调整 `.collapseHandle` 的对齐与间距，使把手在目录与内容间位置贴合。
     - 重做按钮样式（可继续沿用 `.collapseButton` 类名，避免额外改动）：宽度更窄、圆角更大、浅蓝渐变背景、描边与阴影。
     - 使用 `::before/::after` 做高光/投影/分割线效果，贴近截图的层次感。
     - 增加 `:hover / :active / :focus-visible` 状态（仅视觉，不引入额外逻辑），保证可访问性与可用性。
     - 竖排文字实现：`writing-mode: vertical-rl; text-orientation: mixed;` 并微调字距/对齐。

4. **联调与验证**
   - 在当前页面验证两种状态：
     - 目录展开：按钮显示“收起目录”，箭头向左。
     - 目录收起：按钮显示“展开目录”，箭头向右。
   - 检查点击热区、hover/focus、以及目录收起时 `.catalogCollapsed` 不影响把手点击。
   - 如截图存在更精确的尺寸/颜色要求，再按反馈微调 `index.less` 的 token（宽高、圆角、渐变、描边色、阴影强度）。

## 预计改动文件

- [index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/CatalogScroll/index.tsx)
- [index.less](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/CatalogScroll/index.less)
