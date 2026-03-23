# DESIGN - upload-doc-preview

## 整体架构图

```mermaid
flowchart TD
  R[Umi Route /upload/*] --> P1[PDF Page]
  R --> P2[Word Page]
  R --> P3[PPT Page]
  P1 --> C[DocumentUploadPreview]
  P2 --> C
  P3 --> C
  C --> V[Object URL Preview Layer]
  C --> S[mockUploadDocument Service]
  S --> U[Upload Result Card]
```

## 分层设计

- 路由层：`config/routes.ts`
- 页面层：`src/pages/Upload/Pdf|Word|Ppt/index.tsx`
- 组件层：`src/pages/Upload/components/DocumentUploadPreview.tsx`
- 服务层：`src/services/uploadDocument.ts`

## 模块依赖关系

```mermaid
graph LR
  Route --> Page
  Page --> Component
  Component --> Service
```

## 接口契约

### DocumentUploadPreviewProps

- `title: string`
- `description: string`
- `accept: string`
- `allowedExtensions: string[]`
- `kind: 'pdf' | 'word' | 'ppt'`

### UploadDocumentResult

- `taskId: string`
- `fileName: string`
- `size: number`
- `uploadedAt: string`
- `kind: 'pdf' | 'word' | 'ppt'`

## 数据流

```mermaid
sequenceDiagram
  participant U as User
  participant C as DocumentUploadPreview
  participant S as mockUploadDocument
  U->>C: 选择/拖拽文件
  C->>C: 校验扩展名 + 生成对象URL
  C->>S: 触发模拟上传
  S-->>C: 上传结果
  C-->>U: 预览区 + 结果卡片
```

## 异常处理策略

- 扩展名不合法：拦截上传并提示
- 上传失败：展示 message.error，保留预览态
- 组件卸载/重复上传：释放旧对象 URL，避免内存泄漏
