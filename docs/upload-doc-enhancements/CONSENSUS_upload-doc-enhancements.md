# CONSENSUS - upload-doc-enhancements

## 明确需求

在现有上传预览模块上实现 Word(docx) 与 PPT(pptx) 的深度预览能力，并增加上传策略能力（大小限制、进度、失败重试）。

## 技术实现共识

- Word：`docx-preview` 渲染 ArrayBuffer 到指定容器
- PPT：`@jvmr/pptx-to-html` 将 pptx 转为 HTML 并展示
- 上传策略：组件内统一实现，适配 PDF/Word/PPT

## 技术约束

- 不依赖后端转码服务
- 新增依赖必须在 package.json 中声明
- 保持现有 Upload 模块交互风格

## 验收标准（共识版）

- Word/PPT 上传后可在页面内完成可视化预览
- 上传前校验大小，超限直接拦截
- 上传过程有进度反馈
- 上传失败后可以一键重试
