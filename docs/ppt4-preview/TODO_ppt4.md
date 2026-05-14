# TODO_ppt4

## 待办事项

1. **WASM 路径配置**: 如果在您的开发环境或生产环境中发现 PPT 预览无法加载（控制台报错 404 获取 `main.wasm`），请执行以下操作：
   - 将 `node_modules/pptx-svg/dist/main.wasm` 复制到项目的 `public/` 目录下。
   - 在 `src/pages/Upload/components/Ppt4Viewer.tsx` 中，将 `await renderer.init()` 改为 `await renderer.init('/main.wasm')`。

## 操作指引

- 运行 `pnpm dev` 启动项目。
- 导航到 `文件上传` -> `PPT 预览 4`。
- 上传一个 `.pptx` 文件进行测试。
