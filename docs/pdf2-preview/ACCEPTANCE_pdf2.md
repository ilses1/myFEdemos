# ACCEPTANCE - PDF2 预览验收记录

## 1. 完成情况

- [x] 在 `src/services/uploadDocument.ts` 中新增 `pdf2` 类型。
- [x] 修改 `src/pages/Upload/components/DocumentUploadPreview.tsx`：
  - [x] 增加对 `pdf2` 的描述支持。
  - [x] 增加 `<iframe>` 原生 PDF 渲染逻辑。
- [x] 新建 `src/pages/Upload/Pdf2/index.tsx` 页面。
- [x] 在 `config/routes.ts` 中配置路由。

## 2. 验收记录

- **功能点 1: 路由跳转**
  - 侧边栏成功出现 "PDF 预览 2" 菜单。
  - 点击跳转至 `/upload/pdf2` 页面正常。
- **功能点 2: 文件上传**
  - 拖拽或点击上传 PDF 文件，进度条正常显示，模拟上传结果返回正常。
- **功能点 3: 原生预览**
  - 预览区域显示浏览器原生的 PDF 预览界面（含旋转、缩放、打印等原生功能）。
- **功能点 4: 文件下载**
  - 点击 "下载原文件" 链接可正常下载。

## 3. 质量评估

- **代码规范**: 符合项目现有风格，复用了通用组件。
- **集成性**: 与现有上传逻辑无冲突。
- **性能**: 原生 `<iframe>` 渲染性能优秀，无需额外加载 PDF worker (如果只用原生预览的话，虽然 `DocumentUploadPreview` 还是会加载 worker，但 `pdf2` 渲染本身不依赖它)。
