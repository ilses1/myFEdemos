## 目标

- 将“超级叠加”弹窗里两处滚动区域的滚动条改为：宽度 4px、滚动条滑块颜色 #C5CDDB。
- 覆盖范围：Select 下拉列表的滚动条 + 已选列表（overlayDraft）面板的滚动条。

## 现状调研

- incomeChart 当前无样式文件，主要用内联样式。
- 项目内已有同类写法：在 [index.less](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/Table/index.less) 里用 `::-webkit-scrollbar` + `scrollbar-width/scrollbar-color` 定制滚动条。

## 实现方案

- 新增样式文件 `src/pages/Chart/incomeChart/index.less`（CSS Modules）。
- 在 `incomeChart/index.tsx` 引入 `styles`。
- overlayDraft 面板滚动容器：保留现有 `maxHeight/overflowY`，新增 `className={styles.overlayDraftScroll}`，在该类上写滚动条样式。
- Select 下拉滚动容器：给 Select 增加 `popupClassName={styles.overlaySelectPopup}`，在 less 中用 `:global` 精准命中下拉内部的 `.rc-virtual-list-holder`（antd Select 的可滚动容器），在其上写滚动条样式。
- 兼容性：
  - Chrome/Edge：`::-webkit-scrollbar` 系列。
  - Firefox：`scrollbar-width: thin; scrollbar-color: #C5CDDB transparent;`。

## 需要改动的文件

- 修改：[index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/incomeChart/index.tsx)
  - 引入 `styles`。
  - 为 Select 增加 `popupClassName`。
  - 为 overlayDraft 的滚动 div 增加 className。
- 新增：`src/pages/Chart/incomeChart/index.less`
  - `.overlayDraftScroll`：设置滚动条宽度与颜色。
  - `.overlaySelectPopup :global(.rc-virtual-list-holder)`：设置下拉滚动条宽度与颜色。

## 验证点

- 打开“超级叠加”弹窗：
  - Select 下拉列表滚动条宽度为 4px，滑块颜色为 #C5CDDB。
  - overlayDraft 已选列表滚动条同样生效。
  - 不影响其他页面（样式通过 popupClassName 和局部 class 限定）。
