## 目标

为 CatalogScroll 页面右侧内容区域实现“三级目录”对应的内容布局与滚动联动：

- 左侧目录仍为 1~3 级树结构，可点击任意节点滚动到右侧锚点
- 右侧内容区域按目录层级渲染（一级/二级为分组标题，三级为实际内容块）
- 三级内容块按截图的“外框 + 内部多块卡片纵向排列”的布局展示
- 保持现有滚动联动：点击目录 -> 右侧容器平滑滚动；滚动右侧 -> 目录高亮与展开状态同步更新
- 允许根据实际目录在 `CatalogScroll/components` 下拆分对应子组件

## 现状梳理（只读结论）

- 页面文件：`src/pages/FrontendCard/CatalogScroll/index.tsx`
- 样式文件：`src/pages/FrontendCard/CatalogScroll/index.less`
- 当前右侧内容为 `sections.map` 的纯文本 demo；锚点为 `section#${key}`，滚动联动逻辑已完成且稳定（`scrollToSection` + `scroll` 监听）

## 关键设计（实施假设）

- “三级目录如图布局”解释为：仅叶子节点（第三级/无 children 节点）承载实际业务内容；父级节点在右侧以标题/分组容器形式出现，用于形成三级层级结构与可滚动锚点。
- 截图中的布局抽象为：三级内容块内部包含 2~N 个纵向卡片区域（默认先实现 2 个：大卡 + 小卡），后续可按不同 key 自定义数量与内容。
- 继续使用现有“容器滚动”方式（`.contentBody`）与锚点 id 计算，不改为 window 滚动。

## 实施步骤

1. **搭建右侧内容的组件化目录**

   - 新增目录：`src/pages/FrontendCard/CatalogScroll/components/`
   - 新增通用容器组件（示例命名，最终以项目风格为准）：
     - `CatalogSection`：渲染统一的 section 锚点、标题区、层级样式（支持 level）
     - `LeafLayout`：实现截图对应的“外框 + 内部卡片纵向布局”
     - `PanelCard`：叶子布局内部的卡片壳（大卡/小卡的尺寸变体）

2. **为实际目录 key 建立可替换的子组件**

   - 在 `components` 下按 key 拆分（例如 `YieldDividend.tsx`、`YieldFundamental.tsx` 等），每个组件返回 `LeafLayout` 的具体内容
   - 建立 `components/registry.ts`（或同等结构）维护 `key -> ReactNode/Component` 映射
   - 提供默认兜底：未配置 key 时仍渲染一个通用占位内容，避免空白

3. **改造 index.tsx 的右侧渲染为“按树递归渲染”**

   - 保留现有：
     - `sections`（扁平序列）用于滚动联动判定顺序
     - `keyToAncestorKeys/openKeys/selectedKey` 的联动逻辑
   - 替换右侧 `sections.map`：
     - 使用 `menuStructure` 递归渲染节点，确保 DOM 顺序与 flatten 的 DFS 顺序一致
     - 每个节点都渲染带 `id={key}` 的锚点容器：
       - 有 children：渲染分组标题 + 子节点容器
       - 无 children：渲染叶子内容（从 registry 取对应子组件）

4. **补齐样式以满足截图布局与层级视觉**

   - 在 `index.less` 内新增：
     - 三级内容块外框样式（边框/圆角/内边距/间距）
     - 内部卡片纵向排列（gap、最小高度、背景、阴影等）
     - 一级/二级/三级标题层级（字号、间距、缩进或分隔线）
   - 保持移动端断点行为不退化（原有 media query 继续生效，必要时为新结构补充样式）

5. **验证清单（手工验证即可）**
   - 点击一级/二级/三级目录：右侧滚动到对应锚点，顶部留白 offset 正常
   - 右侧滚动：目录高亮切换正确；滚动到三级节点时祖先节点自动展开
   - 目录收起/展开把手功能正常；移动端布局仍可用
   - 未配置具体子组件的 key：右侧渲染兜底占位块，不报错

## 交付物（文件级）

- `src/pages/FrontendCard/CatalogScroll/index.tsx`：右侧内容递归渲染 + 子组件 registry 接入
- `src/pages/FrontendCard/CatalogScroll/index.less`：新增三级布局与层级样式
- `src/pages/FrontendCard/CatalogScroll/components/*`：通用布局组件 + 按 key 拆分的内容子组件 + registry
