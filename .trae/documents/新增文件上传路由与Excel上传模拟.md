## 目标

- 新增一个“文件上传”父路由，并提供第一个子路由 `excel`。

- 在 `excel` 对应页面实现上传 Excel（.xls/.xlsx），并在前端模拟“调用接口上传”的流程（含进度/成功失败提示）。

## 路由改动

- 在 [routes.ts](file:///c:/Users/wusan/Desktop/myFEdemos/config/routes.ts) 顶层数组新增：

  - 父路由：`/upload`（菜单名：文件上传）

  - 默认跳转：`/upload` → `/upload/excel`

  - 子路由：`/upload/excel`（菜单名：excel），`component: './Upload/Excel'`

- 该父/子路由不加 `devOnly`，保持与现有 `/chart`、`/layout` 一致的嵌套路由结构。

## 页面实现（Excel 上传）

- 新建页面：`src/pages/Upload/Excel/index.tsx`

- UI 结构沿用项目习惯：`PageContainer` + `Card`。

- 使用 `antd` 的 `Upload.Dragger`：

  - `accept=".xls,.xlsx"`

  - `beforeUpload` 校验扩展名/类型，不符合则提示并阻止加入列表

  - `maxCount=1` + 本地 `fileList` 状态，方便重传/清空

  - `customRequest` 自定义上传逻辑：

    - 用 `setTimeout` + `Promise` 模拟接口耗时

    - 用 `onProgress`/本地 `percent` 模拟上传进度

    - 成功：`message.success` + 显示模拟返回（例如 taskId/解析行数等）

    - 失败：`message.error` + 允许重试

## 模拟接口封装

- 新增 `src/services/uploadExcel.ts` 导出 `mockUploadExcel(file)`，页面只负责调用与渲染结果。

#
