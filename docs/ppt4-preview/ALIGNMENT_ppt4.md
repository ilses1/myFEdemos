# ALIGNMENT_ppt4

## 项目和任务特性规范

- **项目名称**: myFEdemos
- **技术栈**: UmiJS Max (v4), React 18, Ant Design 5, TypeScript
- **任务目标**: 新建 PPT 预览页面 `ppt4`，使用 `pptx-svg` 库实现预览功能。

## 原始需求

- 用户希望在现有项目中新增一个 PPT 预览功能（命名为 ppt4）。
- 指定使用 `pptx-svg` 库（已安装）。

## 边界确认

- **范围**: 仅限 `ppt4` 的实现，包括组件开发、页面创建和路由配置。
- **排除**: 不涉及其他文件类型的预览逻辑修改，除非是为了集成 `ppt4`。

## 需求理解

- 现有项目已经有多个 PPT 预览版本（Ppt, Ppt2, Ppt3），分别使用了不同的库。
- `ppt4` 将作为第四种预览方式，展示 `pptx-svg` 的效果。
- 需要遵循现有的 `DocumentUploadPreview` 模式，提供上传和预览一体化的体验。

## 疑问澄清

- **Q**: `pptx-svg` 的具体用法是什么？
- **A**: `pptx-svg` 通常将 PPTX 文件的每一页转换为 SVG 字符串。我们需要处理文件读取并将生成的 SVG 渲染到页面上。
- **Q**: 页面布局是否需要与其他 PPT 预览页面一致？
- **A**: 是的，为了保持一致性，应复用 `DocumentUploadPreview` 组件。
