# CatalogScroll 目录滚动修复计划

目标：

1. 左侧目录（侧边栏）高度占满容器高度，并且目录项可在侧边栏内滚动。
2. 点击目录项后，右侧内容滚动定位准确，章节标题完整可见。

## 现状梳理

- 页面为左右布局，整体容器使用 `height: calc(100vh - 64px)`。
- 侧边目录 `.catalog` 目前 `height: calc(100% - 24px)` 且 `position: sticky; top: 12px; overflow: hidden;`，导致视觉上无法“占满高度”，同时目录内容超出时也无法滚动查看。
- 右侧滚动容器为 `.contentBody`（`overflow: auto`），点击目录时通过 `container.scrollTo({ top: el.offsetTop })` 定位。该方式不考虑 `scroll-margin-top` 等偏移，易出现“标题贴边/被遮挡一点”的体验问题。

## 实施步骤

### 1) 侧边目录占满高度

- 调整 [index.less](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/CatalogScroll/index.less)：
  - 将 `.catalog` 的高度改为跟随父容器占满（例如 `height: 100%`），并让其在 flex 纵向布局下可承载可滚动区域（例如 `display: flex; flex-direction: column;`）。
  - 将目录滚动能力放到 `.menuWrapper`（或目录内部容器）上：设置 `flex: 1; overflow: auto;`，确保目录项超过高度时可以在侧边栏内部滚动。
  - 保留/微调 `sticky` 的策略：如果仍需在页面外层滚动时保持可见，保留 `position: sticky`；如需严格“与右侧卡片同高”，则将 sticky/top 相关改为常规布局（根据当前页面滚动方式选择其一）。

验收点：

- 侧边目录背景卡片与右侧内容卡片高度一致（或在同一视口规则下可视上占满）。
- 目录项较多时，鼠标滚轮在目录区域可以滚动目录列表。

### 2) 点击目录滚动定位准确

- 调整 [index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/CatalogScroll/index.tsx) 中 `scrollToSection` 的计算方式：
  - 用 `getBoundingClientRect` 计算元素相对滚动容器的真实距离：  
    `targetTop = container.scrollTop + (elRect.top - containerRect.top) - offset`
  - `offset` 使用一个固定值（优先复用现有 `stickyOffset = 12`），保证章节标题不会贴边或被遮挡。
  - 继续使用 `behavior: 'smooth'` 保持平滑滚动体验。

（可选增强）

- 将 `.section` 的 `scroll-margin-top` 与上述 `offset` 保持一致，统一视觉间距。

验收点：

- 点击任何目录项，右侧会滚动到对应章节，章节标题完整显示且距离顶部有一致的留白。
- 快速连续点击不同目录项，滚动与高亮状态保持正确（不会跳到相邻章节）。

### 3) 手动回归验证

- 验证桌面端/窄屏断点（`max-width: 768px`）：
  - 桌面端：侧边栏占满高度 + 目录可滚动 + 点击定位准确。
  - 移动端：目录变为顶部区域后，布局无溢出，点击定位仍正确。

## 变更范围

- 仅修改两个文件：
  - [index.less](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/CatalogScroll/index.less)
  - [index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/CatalogScroll/index.tsx)
