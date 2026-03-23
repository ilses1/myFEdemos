# ALIGNMENT - upload-doc-preview

## 原始需求

在「文件上传」父目录下新增 3 个上传预览模块：

- PDF 上传预览页面
- Word 上传预览页面
- PPT 上传预览页面

并为每个模块提供独立路由。

## 项目与任务特性分析

- 项目基于 UmiJS Max + React18 + TypeScript + Ant Design 5。
- 现有上传模块位于 `src/pages/Upload/`，已有：
  - `Excel`：上传 + 本地解析预览 + 模拟上传
  - `Rebalance`：通过弹窗复用 Excel 页面
- 路由集中在 `config/routes.ts`，Upload 为父路由分组。
- 现有代码偏好：
  - 函数组件 + `React.FC`
  - Ant Design `Upload.Dragger` + `Card/Descriptions/Space/Typography`
  - 本地模拟上传服务位于 `src/services/`

## 需求边界

### 范围内

- 新增 3 个页面与 3 条子路由（位于 `/upload/*`）
- 每个页面支持对应格式选择文件、展示基础信息、展示预览区、模拟上传结果
- 复用统一的上传预览 UI 能力，避免重复代码

### 范围外

- 不实现真实后端上传
- 不引入复杂文档解析引擎（如 docx 结构化解析、pptx 幻灯片逐页解析）
- 不改动现有 Excel/Rebalance 功能

## 关键假设与决策

- 采用浏览器对象 URL 进行预览：
  - PDF 使用 iframe 可稳定预览
  - Word/PPT 使用 iframe 尝试内嵌预览；若浏览器环境不支持，则提供下载入口和提示
- Word 支持扩展名：`.doc`, `.docx`
- PPT 支持扩展名：`.ppt`, `.pptx`
- 统一使用模拟上传服务返回任务信息

## 验收标准（对齐版）

- 可访问以下路由并看到对应页面：
  - `/upload/pdf`
  - `/upload/word`
  - `/upload/ppt`
- 上传不匹配扩展名时给出错误提示并拦截
- 上传匹配文件后显示：
  - 文件名/大小/类型/更新时间
  - 预览区域（PDF 稳定可见，Word/PPT 为兼容性预览）
  - 模拟上传结果卡片
