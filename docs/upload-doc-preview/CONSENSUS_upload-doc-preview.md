# CONSENSUS - upload-doc-preview

## 明确需求

在 Upload 父模块下新增三个独立页面（PDF/Word/PPT），每个页面具备上传、预览、模拟上传结果展示能力，并接入独立路由。

## 技术方案

- 采用一个通用组件 `DocumentUploadPreview` 承载核心能力：
  - 文件格式校验
  - 本地对象 URL 管理（创建与释放）
  - 文件元信息展示
  - 预览面板展示
  - 调用模拟上传服务并展示结果
- 三个页面通过配置化方式复用通用组件：
  - 页面标题
  - accept 与扩展名白名单
  - 预览提示文案
- 新增服务 `uploadDocument.ts` 统一提供模拟上传返回。

## 技术约束与集成方式

- 不新增第三方预览库，保持依赖稳定。
- 保持现有 Umi 路由与 Upload 模块结构一致。
- 与 `Excel` 页面交互模式保持一致（Ant Design Dragger + Card 组合）。

## 边界限制

- Word/PPT 的浏览器预览能力受环境限制，页面内提供降级提示与下载按钮。
- 不处理密码保护文件、损坏文件、超大文件分片上传等高级场景。

## 验收标准（共识版）

- 路由存在且可访问：
  - `/upload/pdf`
  - `/upload/word`
  - `/upload/ppt`
- PDF 上传后可在页面中直接预览。
- Word/PPT 上传后可看到预览容器和降级说明，并可下载原文件。
- 错误扩展名时拦截上传并提示。
- 上传完成后展示包含 taskId/fileName/size/uploadedAt 的结果信息。
