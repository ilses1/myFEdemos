## 目标

- 在 [index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Upload/Excel/index.tsx) 的现有“模拟上传”基础上，新增“上传 Excel 后本地解析并预览表格”的能力。

## 现状调研结论

- 当前仅调用 [mockUploadExcel](file:///c:/Users/wusan/Desktop/myFEdemos/src/services/uploadExcel.ts#L1-L29) 返回元信息，不读取 Excel 内容。

- 项目依赖中未包含 Excel 解析库（[package.json](file:///c:/Users/wusan/Desktop/myFEdemos/package.json#L13-L36) 无 xlsx/exceljs）。

## 实现方案

- 新增依赖：安装 `xlsx`（SheetJS）用于在浏览器端解析 `.xls/.xlsx`。

- 解析时机：在 `customRequest` 内先解析本地文件，再调用 `mockUploadExcel`（解析失败则提示并中断上传）。

- 解析策略：

  - `File.arrayBuffer()` 读入二进制。

  - `XLSX.read(arrayBuffer, { type: 'array' })` 读取工作簿。

  - 默认预览第一个 Sheet；如果有多个 Sheet，提供下拉切换。

  - 用 `XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' })` 转为二维数组。

  - 仅预览前 N 行、前 M 列（例如 100 行、30 列），并在 UI 上提示“已截断”。

- 表格渲染：

  - 用 antd `Table` 将二维数组映射为 `dataSource`（每行一个对象，带 `key`）。

  - 列名优先取第一行作为表头；为空/重复时自动生成 `列1/列2...` 并保证唯一。

  - `scroll={{ x: 'max-content', y: 420 }}`，`pagination` 关闭或用简易分页（默认关闭）。

## 页面交互与状态

- 增加 `parsing` 状态：解析中按钮 loading、Upload disabled。

- 上传成功后展示：文件名、sheet 名、预览行列数、mock 返回的 taskId/时间等。

- 错误处理：扩展名校验仍保留；解析/上传失败均用 `message.error` 提示并回调 `onError`。

## 需要改动的文件

- [package.json](file:///c:/Users/wusan/Desktop/myFEdemos/package.json)：新增依赖 `xlsx`。

- [index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Upload/Excel/index.tsx)：新增解析逻辑、预览 UI（Table + 可选 Select）。

## 验证方式

- 本地选择一个 `.xlsx`（含表头、多列）验证可预览。

- 选择 `.xls` 验证能解析则预览，不能解析时提示明确错误。

- 上传成功/失败两种路径都能正确提示并恢复按钮状态。
