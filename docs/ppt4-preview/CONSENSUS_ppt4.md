# CONSENSUS_ppt4

## 验收标准

1. 在“文件上传”菜单下新增“PPT 预览 4”选项。
2. 用户可以上传 `.pptx` 文件。
3. 上传后，页面能通过 `pptx-svg` 库渲染出 PPT 的每一页。
4. 渲染出的 SVG 应能自适应容器宽度，保持清晰。
5. 代码风格与项目现有规范一致（TypeScript, Ant Design 5）。

## 技术实现方案

1. **类型扩展**: 在 `src/services/uploadDocument.ts` 中增加 `ppt4` 类型。
2. **核心组件**: 新建 `src/pages/Upload/components/Ppt4Viewer.tsx`，负责调用 `pptx-svg` API 进行渲染。
3. **集成**: 修改 `src/pages/Upload/components/DocumentUploadPreview.tsx`，在 `kind === 'ppt4'` 时调用 `Ppt4Viewer`。
4. **页面创建**: 新建 `src/pages/Upload/Ppt4/index.tsx`，调用 `DocumentUploadPreview`。
5. **路由配置**: 在 `config/routes.ts` 中添加 `/upload/ppt4` 路由。

## 技术约束

- 必须使用 `pptx-svg`。
- 处理大文件时的性能考虑（异步处理，Loading 状态）。
- 错误处理：渲染失败时显示友好提示。

## 任务边界

- 不修改 `Ppt`, `Ppt2`, `Ppt3` 的现有逻辑。
