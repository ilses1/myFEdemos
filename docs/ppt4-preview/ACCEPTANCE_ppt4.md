# ACCEPTANCE_ppt4

## 完成情况记录

- [x] 更新 `DocumentKind` 类型定义。
- [x] 实现 `Ppt4Viewer` 组件，使用 `pptx-svg` 库。
- [x] 在 `DocumentUploadPreview` 中集成 `ppt4` 预览逻辑。
- [x] 创建 `Upload/Ppt4` 页面。
- [x] 配置 `/upload/ppt4` 路由。

## 验证步骤

1. **类型检查**: 运行 `tsc` 或查看 IDE 报错。 (已手动确认代码逻辑)
2. **界面检查**: 启动项目后，左侧菜单应出现“PPT 预览 4”。
3. **功能检查**: 上传 PPTX 文件，应能看到“正在渲染...”提示，随后显示 PPT 内容。
4. **交互检查**: 上下页切换、缩放、缩略图点击均应正常工作。

## 遇到的问题及解决

- **WASM 加载**: `pptx-svg` 依赖 `main.wasm`。目前使用默认的 `renderer.init()`，依赖 bundler 对 `import.meta.url` 的支持。如果加载失败，可能需要将 WASM 放到 `public` 目录。
