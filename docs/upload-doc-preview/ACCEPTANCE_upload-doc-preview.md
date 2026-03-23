# ACCEPTANCE - upload-doc-preview

## 子任务完成记录

- T1 新增 `src/services/uploadDocument.ts`：已完成
- T2 新增 `src/pages/Upload/components/DocumentUploadPreview.tsx`：已完成
- T3 新增三个页面：
  - `src/pages/Upload/Pdf/index.tsx`
  - `src/pages/Upload/Word/index.tsx`
  - `src/pages/Upload/Ppt/index.tsx`
- T4 更新路由 `config/routes.ts`：已完成
- T5 自测与文档：已完成

## 验收检查

- 路由可访问：
  - `/upload/pdf`
  - `/upload/word`
  - `/upload/ppt`
- 扩展名校验生效：已实现
- 文件信息展示：已实现
- 预览区域与下载入口：已实现
- 模拟上传结果展示：已实现

## 自测结论

- 代码诊断无 TypeScript 报错
- 本地开发服务可启动
- PDF/Word/PPT 路由页面可正常打开
