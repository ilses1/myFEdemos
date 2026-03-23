# DESIGN - upload-doc-enhancements

## 架构图

```mermaid
flowchart TD
  Page[PDF/Word/PPT 页面] --> C[DocumentUploadPreview]
  C --> W[docx-preview 渲染]
  C --> P[@jvmr/pptx-to-html 渲染]
  C --> U[mockUploadDocument]
```

## 设计说明

- DocumentUploadPreview 统一处理：
  - 文件大小校验
  - 上传进度与重试
  - 文件元信息展示
  - 预览区渲染入口
- Word 分支：ArrayBuffer -> docx-preview -> DOM
- PPT 分支：ArrayBuffer -> pptx-to-html -> innerHTML

## 接口契约调整

### DocumentUploadPreviewProps

- 新增 `maxSizeMB?: number` 默认 20

## 异常处理

- 解析失败：展示错误提示 + 保留下载入口
- 进度异常：重置为 0 并提示失败
