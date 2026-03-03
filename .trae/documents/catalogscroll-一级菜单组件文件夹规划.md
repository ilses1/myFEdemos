## 目标

根据 `menuStructure` 的 5 个一级菜单（overview / yield / volatility / correlation / compare），在 `components` 目录下建立对应的组件文件夹，并将现有叶子组件按归属整理到这些文件夹中，保证页面行为与渲染结果不变。

目标文件与参考：

- `menuStructure`：`src/pages/FrontendCard/CatalogScroll/index.tsx#L26-L68`
- 现有叶子组件与注册表：`src/pages/FrontendCard/CatalogScroll/components/contents/*`、`src/pages/FrontendCard/CatalogScroll/components/registry.tsx`

## 约定与命名

- 目录位置：`src/pages/FrontendCard/CatalogScroll/components/`
- 文件夹名：使用与一级 key 对应的 PascalCase
  - overview → `Overview`
  - yield → `Yield`
  - volatility → `Volatility`
  - correlation → `Correlation`
  - compare → `Compare`
- 每个一级文件夹内放该一级下的叶子组件（当前项目里都属于“内容区块组件”）。
- `DefaultLeaf` 作为通用兜底组件保持在原位置（或后续需要再单独抽 `Common` 目录），本次以最小改动为主。

## 实施步骤

1. 创建 5 个一级目录

   - 在 `components` 下新增：`Overview/`、`Yield/`、`Volatility/`、`Correlation/`、`Compare/`。
   - 为避免空目录在某些环境中不易保留，每个目录添加一个 `index.ts`，先仅做导出占位（后续步骤会逐步补齐导出）。

2. 迁移并归类现有叶子组件文件

   - `components/contents/Overview.tsx` → `components/Overview/Overview.tsx`
   - `components/contents/YieldDividend.tsx` → `components/Yield/YieldDividend.tsx`
   - `components/contents/VolHist.tsx` → `components/Volatility/VolHist.tsx`
   - `components/contents/CompareStock.tsx` → `components/Compare/CompareStock.tsx`
   - `components/contents/DefaultLeaf.tsx` 保持不动
   - 同步修正被迁移文件内部对 `LeafLayout` / `PanelCard` 的相对路径引用（因为目录层级变化会导致 `../` 路径不同）。

3. 调整组件导出（便于 registry 使用）

   - 在每个一级目录的 `index.ts` 中导出该目录下的叶子组件默认导出，例如：
     - `Overview/index.ts` 导出 `Overview`
     - `Yield/index.ts` 导出 `YieldDividend`
     - `Volatility/index.ts` 导出 `VolHist`
     - `Compare/index.ts` 导出 `CompareStock`
   - `Correlation/index.ts` 先保留空导出或导出一个占位组件（如果需要），不影响现有 registry。

4. 更新 `registry.tsx` 的 import 路径与映射

   - 将原来的 `./contents/*` 引用替换为新目录：
     - `overview` → `./Overview/Overview`（或 `./Overview`）
     - `yield-dividend` → `./Yield/YieldDividend`（或 `./Yield`）
     - `vol-hist` → `./Volatility/VolHist`（或 `./Volatility`）
     - `compare-stock` → `./Compare/CompareStock`（或 `./Compare`）
   - `DefaultLeaf` 继续使用 `./contents/DefaultLeaf`，保持逻辑不变。

5. 校验与回归
   - TypeScript 诊断应为 0。
   - 运行页面后验证：
     - 点击目录叶子项仍能滚动到正确位置并高亮
     - 滚动内容区高亮与展开逻辑仍正常
     - 已存在的 4 个 leaf key（overview / yield-dividend / vol-hist / compare-stock）渲染与样式不变

## 回滚策略

- 若出现路径引用错误或渲染异常，可将迁移的组件文件移回 `components/contents/` 并恢复 `registry.tsx` 的原 import，即可快速回滚到当前状态。
