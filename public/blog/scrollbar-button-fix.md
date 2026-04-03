# 滚动条上下按钮隐藏不生效的原因与修复（::-webkit-scrollbar-button）

在做自定义滚动条样式时，经常会遇到一个“看起来写对了但就是不生效”的坑：明明写了 `::-webkit-scrollbar-button { display: none; }`，Chrome / Edge 里滚动条上下按钮还是会出现。

本文记录一次实际排查过程：问题最终不是出在 `::-webkit-scrollbar-button` 本身，而是因为同一个滚动容器上设置了 `scrollbar-width` / `scrollbar-color`，导致 WebKit 系列伪元素样式被影响，从而出现“隐藏按钮不生效”的现象。

## 背景

页面里有一个可滚动区域（示例：基金列表区域），希望：

- 有滚动条（细一点）
- 滑块（thumb）有自定义颜色/圆角
- 去掉滚动条上下按钮（上下箭头）

对应 JSX 大概是：

```tsx
<div className={styles.fundAreaScroller}>{/* ...rows... */}</div>
```

## 现象：写了 `::-webkit-scrollbar-button` 还是有上下按钮

一开始的写法通常是：

```less
.fundAreaScroller {
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c5cddb;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-button {
    display: none !important;
    height: 0 !important;
    width: 0 !important;
    background: transparent !important;
  }
}
```

但在某些情况下（尤其是项目里有统一的滚动条样式、或浏览器对“标准滚动条属性”支持发生变化后），你会发现按钮依旧存在。

## 根因：同一个元素上设置了 `scrollbar-width` / `scrollbar-color`

排查后发现，在该滚动容器（或其命中的更高优先级样式）上存在类似设置：

```less
scrollbar-width: thin;
scrollbar-color: #c5cddb transparent;
```

这两条属于 CSS Scrollbars 标准属性。

在一些 Chromium 版本/配置下，当元素上设置了这些“标准属性”后，浏览器会优先走标准滚动条渲染路径，从而导致 `::-webkit-scrollbar*` 这套私有伪元素的规则部分失效或行为异常，表现出来就是：

- `::-webkit-scrollbar-button` 隐藏不生效
- 或其他 `::-webkit-scrollbar*` 的效果出现“不完整覆盖”

## 修复：把标准属性重置为 `auto`，让 WebKit 伪元素规则正常工作

解决方式很简单：在该滚动容器上把标准属性显式重置为 `auto`（必要时加上 `!important`，确保能覆盖掉上游样式），然后继续使用 `::-webkit-scrollbar*` 去定制。

```less
.fundAreaScroller {
  overflow-y: auto;

  scrollbar-width: auto !important;
  scrollbar-color: auto !important;

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c5cddb;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-button {
    display: none !important;
    height: 0 !important;
    width: 0 !important;
    -webkit-appearance: none;
    background: transparent !important;
    background-image: none !important;
    border: 0 !important;
    box-shadow: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
  }

  &::-webkit-scrollbar-button:increment,
  &::-webkit-scrollbar-button:decrement,
  &::-webkit-scrollbar-button:start:increment,
  &::-webkit-scrollbar-button:start:decrement,
  &::-webkit-scrollbar-button:end:increment,
  &::-webkit-scrollbar-button:end:decrement,
  &::-webkit-scrollbar-button:horizontal:increment,
  &::-webkit-scrollbar-button:horizontal:decrement,
  &::-webkit-scrollbar-button:vertical:increment,
  &::-webkit-scrollbar-button:vertical:decrement {
    display: none !important;
    height: 0 !important;
    width: 0 !important;
    -webkit-appearance: none;
    background: transparent !important;
    background-image: none !important;
    border: 0 !important;
    box-shadow: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
  }
}
```

这样处理后，Chrome / Edge 的上下按钮就能稳定隐藏。

## 小结

- `scrollbar-width` / `scrollbar-color` 是标准属性，主要用于 Firefox，但在部分 Chromium 环境里也可能影响滚动条渲染路径。
- 当你依赖 `::-webkit-scrollbar*` 做深度定制（尤其是隐藏 `::-webkit-scrollbar-button`）时，建议避免在同一个元素上同时设置标准属性；如果项目里已有全局/上游设置，最稳的方式是在目标元素上重置成 `auto`。
