# CONSENSUS_ppt5

## 验收标准

1. 在“文件上传”菜单下新增“PPT 预览 5”选项。
2. 用户可以上传 `.pptx` 文件。
3. 上传后，页面能通过 `pptx-to-pdf` 库将 PPT 转换为 PDF。
4. 转换后的 PDF 能通过 `@react-pdf-viewer` 插件正常预览。
5. 提供转换进度的 Loading 提示。

## 技术实现方案

1. **类型扩展**: 在 `src/services/uploadDocument.ts` 中增加 `ppt5` 类型。
2. **核心组件**: 新建 `src/pages/Upload/components/Ppt5Viewer.tsx`。
   - 内部使用 `pptx-to-pdf` 的 `convert` 函数。
   - 获取 PDF Buffer 后转为 Blob URL。
   - 复用 `@react-pdf-viewer/core` 进行展示。
3. **集成**: 修改 `src/pages/Upload/components/DocumentUploadPreview.tsx`，在 `kind === 'ppt5'` 时调用 `Ppt5Viewer`。
4. **页面创建**: 新建 `src/pages/Upload/Ppt5/index.tsx`。
5. **路由配置**: 在 `config/routes.ts` 中添加 `/upload/ppt5` 路由。

## 技术约束

- 必须使用 `pptx-to-pdf`。
- 依赖 `@react-pdf-viewer/core` 和 PDF worker 资源。

## 任务边界

- 不修改其他 PPT 预览页面。
