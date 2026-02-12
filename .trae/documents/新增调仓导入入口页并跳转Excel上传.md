## 目标

- 在 [index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Upload/Excel/index.tsx) 增加“Excel 模板下载”入口。

- 先在没有现成模板文件的情况下可用（前端本地生成并下载）。

- 同时约定后续“真实模板文件”应该放置的位置。

## 方案

- **当前阶段（无模板文件）**：点击“下载模板”时，前端用已引入的 `xlsx` 库动态生成一个工作簿（1 个 Sheet + 1 行表头 + 若干示例行可选），然后用 `Blob + URL.createObjectURL + a[download]` 触发下载。

- **后续阶段（有模板文件）**：把模板文件放到 `public/templates/` 目录下（例如 `public/templates/excel-upload-template.xlsx`），页面按钮改为直接下载静态文件（URL 为 `/templates/excel-upload-template.xlsx`），或保留“生成模板”和“下载静态模板”二选一。

## 具体改动点

- 修改 [index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Upload/Excel/index.tsx)

  - 在上传区域上方（或卡片标题右侧）加入一个按钮：`下载 Excel 模板`。

  - 新增 `downloadTemplate()` 方法：

    - `XLSX.utils.book_new()` 创建 workbook

    - `XLSX.utils.aoa_to_sheet([...])` 生成 sheet（表头例如：`姓名`、`手机号`、`邮箱`、`备注`）

    - `XLSX.utils.book_append_sheet()`

    - `XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })` 得到 ArrayBuffer

    - 生成 `Blob` 并触发浏览器下载，文件名例如 `上传模板.xlsx`

  - 下载失败时用 `message.error` 提示。

## 模板文件放置位置（你问的重点）

- 放在项目根目录的 `public` 下：

  - 推荐：`public/templates/excel-upload-template.xlsx`

  - 页面访问路径：`/templates/excel-upload-template.xlsx`

## 验证方式

- 本地点击“下载 Excel 模板”，确认能下载到 `.xlsx`，且用 Excel/WPS 打开后能看到表头。
