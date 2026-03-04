# CatalogScroll 目录代码简化计划（不改功能）

目标：在不改变现有页面展示、交互与滚动联动行为的前提下，降低 `src/pages/FrontendCard/CatalogScroll` 目录的重复代码与耦合度，提升可读性与可维护性。

范围（仅此目录内）：  
`src/pages/FrontendCard/CatalogScroll/**`

不做的事（明确约束）：

- 不新增/变更业务功能与交互逻辑（目录点击、滚动联动、展开/收起、现有内容渲染保持一致）。
- 不引入新第三方依赖。
- 不做全项目打包与全量代码检查（只做必要的本页自测/IDE TS 报错确认）。

---

## 1. 现状梳理（读代码得到的结论）

- 页面入口在 `index.tsx`：同时包含目录树数据、派生数据计算（sections/祖先映射/defaultOpenKeys）、Menu items 构造、滚动联动、内容区递归渲染等多职责逻辑。
- `components/registry.tsx`：维护 key -> 内容组件映射，叶子组件 props 形态高度一致（基本都是 `{ title: string }`）。
- `index.css` 与 `index.less` 内容重复，但页面实际使用的是 `index.less`（通过 CSS Modules 引入）。
- 多处存在 `[].filter(Boolean).join(' ')` 的 className 拼接样板代码。
- 少数文件存在明显复制粘贴命名问题（例如 Volatility 组件内部仍叫 Yield）。

---

## 2. 具体改动步骤（按可回滚、低风险顺序）

### Step A：删除未被引用的重复样式文件

1. 确认 `CatalogScroll/index.tsx` 仅引入 `./index.less`（不引入 `./index.css`）。
2. 删除以下文件（不影响运行时行为）：

- `src/pages/FrontendCard/CatalogScroll/index.css`
- `src/pages/FrontendCard/CatalogScroll/components/Overview/index.css`（若该目录实际只通过 `index.less` 引入样式）

验收点：页面样式无变化，TS/构建无报错（只需确认本目录没有 import 指向已删文件）。

---

### Step B：抽出通用 className 拼接工具

1. 新增 `src/pages/FrontendCard/CatalogScroll/components/cx.ts`：  
   导出 `cx(...xs)`，返回 `xs.filter(Boolean).join(' ')` 的结果。
2. 替换以下文件中的重复拼接代码为 `cx(...)`：

- `index.tsx`（目录容器 className）
- `components/CatalogSection.tsx`
- `components/PanelCard.tsx`  
  （如果其他文件也存在同样模式，一并替换）

验收点：className 字符串结果与原先一致（只是写法变了）。

---

### Step C：精简 CatalogSection 的 props（删除无用字段）

1. 在 `components/CatalogSection.tsx` 中：

- 移除 `CatalogSectionProps.title`（该字段不参与渲染/逻辑）。
- 组件参数解构移除 `title`。
- 维持 DOM 结构与 className 计算逻辑不变（只是写法更清晰）。

2. 在 `index.tsx` 渲染 `CatalogSection` 时移除 `title={node.title}` 传参。

验收点：内容区渲染结构不变、滚动联动依旧依赖 `id/ref`，行为一致。

---

### Step D：统一叶子节点组件的 props 类型，并修复明显命名误拷贝

1. 新增 `components/types.ts`：  
   导出 `export type LeafProps = { title: string }`。
2. 将所有内容组件（yield/volatility/correlation/compare/default 等）改为复用 `LeafProps`：

- 仅修改类型声明与 import，不改 JSX 返回内容。

3. 修复 `components/Volatility/Volatility.tsx` 中的误命名：

- 将 `YieldProps`/`Yield` 更名为 `VolatilityProps`/`Volatility`（或直接使用 `LeafProps` + `Volatility`）。
- `export default` 的组件名与文件语义对齐。

4. 更新 `components/registry.tsx`：

- 用 `LeafProps` 替代 `React.FC<{ title: string }>`。
- 合并重复的 Context 类型（保留一个即可），并保持 `renderNodeContent` 的入参/返回行为不变。

验收点：内容注册表映射不变、每个 key 渲染的组件不变、props 传递仍为 title。

---

### Step E：拆分 index.tsx 中的“纯数据/纯函数”，降低组件内复杂度

1. 新增 `menu.ts`：

- 迁移 `MenuNode` 类型与 `menuStructure` 常量（保持结构与文案完全一致）。

2. 新增 `menuUtils.ts`：

- 提供 `buildMenuDerived(menuStructure)`：产出 `sections / keyToAncestorKeys / defaultOpenKeys`，实现逻辑与当前 `useMemo` 中的 walk 完全一致。

3. 可选（若类型维护成本可控）：新增 `menuItems.tsx`：

- 提供 `toMenuItems(menuStructure, handlers)`，保持当前 `onTitleClick / expandIcon` 行为与阻止冒泡逻辑一致，仍返回 `MenuProps['items']`。

4. `index.tsx`：

- 只保留状态、effect（滚动联动）、事件处理与渲染；从上述模块引入数据与工具。

验收点：目录树顺序、默认展开项、点击节点滚动、滚动高亮同步均保持一致。

---

## 3. 验证方式（不做全量打包/检查）

- IDE TypeScript 报错为 0（至少本目录无类型错误）。
- 本地启动后手动验证 4 项：
  1. 点击左侧目录任意节点，内容区平滑滚动到对应 section；
  2. 内容区滚动时左侧高亮跟随变化；
  3. 子目录展开/收起图标点击仍可控制 openKeys；
  4. 收起/展开目录按钮（中间细长按钮）行为与样式一致。

---

## 4. 预期产出（可量化）

- 删除重复/未引用样式文件 1~2 个。
- 将 10+ 个叶子组件的 props 类型统一为单一来源，减少重复声明。
- `index.tsx` 体积下降（目录数据/纯函数外移），可读性提升。
- className 拼接逻辑集中到一个小工具函数，减少样板代码。
