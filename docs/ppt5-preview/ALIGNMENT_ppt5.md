# ALIGNMENT_ppt5

## 项目和任务特性规范

- **项目名称**: myFEdemos
- **技术栈**: UmiJS Max (v4), React 18, Ant Design 5, TypeScript
- **任务目标**: 新建 PPT 预览页面 `ppt5`，使用 `pptx-to-pdf` 库实现预览功能。

## 原始需求

- 用户希望在现有项目中新增一个 PPT 预览功能（命名为 ppt5）。
- 指定使用 `pptx-to-pdf` 库（已安装）。

## 边界确认

- **范围**: 仅限 `ppt5` 的实现，包括组件开发、页面创建和路由配置。
- **排除**: 不涉及其他文件类型的预览逻辑修改，除非是为了集成 `ppt5`。

## 需求理解

- 现有项目已经有多个 PPT 预览版本（Ppt, Ppt2, Ppt3, Ppt4），分别使用了不同的库。
- `ppt5` 将作为第五种预览方式，其特点是先将 PPT 转换为 PDF，再使用项目已有的 PDF 预览方案进行展示。
- 需要遵循现有的 `DocumentUploadPreview` 模式。

## 疑问澄清

- **Q**: `pptx-to-pdf` 转换后的 PDF 如何展示？
- **A**: 项目中已有成熟的 PDF 预览方案（`@react-pdf-viewer/core`），我们将转换后的 PDF Buffer 转换为 Blob URL，传递给 PDF 渲染器即可。
- **Q**: 性能如何？
- **A**: 转换过程是在浏览器端完成的，对于复杂或大型 PPT 可能有延迟，需要提供明确的 Loading 提示。
