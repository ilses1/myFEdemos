# TASK - upload-doc-preview

## 原子任务拆分

### T1 新增模拟上传服务

- 输入契约：`File`、`kind`
- 输出契约：`UploadDocumentResult`
- 实现约束：TypeScript 强类型、与现有 `uploadExcel` 风格一致
- 依赖关系：后置 T2/T3

### T2 实现通用上传预览组件

- 输入契约：`DocumentUploadPreviewProps`
- 输出契约：可复用 UI 组件
- 实现约束：仅使用项目现有依赖 + antd
- 依赖关系：依赖 T1，后置 T3

### T3 新增 PDF/Word/PPT 页面

- 输入契约：通用组件
- 输出契约：3 个页面入口
- 实现约束：页面尽量薄，配置化调用组件
- 依赖关系：依赖 T2，后置 T4

### T4 更新 Upload 路由

- 输入契约：页面路径与组件路径
- 输出契约：路由可访问
- 实现约束：保持现有 routes.ts 结构
- 依赖关系：依赖 T3，后置 T5

### T5 验收与文档收敛

- 输入契约：已完成代码
- 输出契约：ACCEPTANCE/FINAL/TODO 文档
- 实现约束：结果与共识验收标准一致

## 任务依赖图

```mermaid
graph TD
  T1 --> T2 --> T3 --> T4 --> T5
```
