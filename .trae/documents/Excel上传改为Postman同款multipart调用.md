## 目标

- 把当前页面的“模拟上传”改为和 Postman 一样的 `POST /inst-indexboard/securities/constitute/manage/importExcel` + `form-data`，字段名 `excelFile`。

## 现状定位

- 页面目前用 `customRequest` 调 `mockUploadExcel(file)`，不发网络请求：[index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Upload/Excel/index.tsx#L1-L55)
- `mockUploadExcel` 只是 setTimeout 模拟返回：[uploadExcel.ts](file:///c:/Users/wusan/Desktop/myFEdemos/src/services/uploadExcel.ts#L1-L29)
- 项目真实请求入口是 `request`（axios 底层）：[UserController.ts](file:///c:/Users/wusan/Desktop/myFEdemos/src/services/demo/UserController.ts#L1-L96)
- 目前没有 `proxy` / `request` 前缀配置：[config.ts](file:///c:/Users/wusan/Desktop/myFEdemos/config/config.ts#L20-L42)

## 改造方案（按你 Postman 的调用方式）

### 1) 新增真实上传 service（multipart/form-data）

- 在 `src/services/uploadExcel.ts` 增加 `uploadExcel(file: File)`：
  - `const formData = new FormData(); formData.append('excelFile', file);`
  - `return request('/inst-indexboard/securities/constitute/manage/importExcel', { method: 'POST', data: formData })`
  - 不手动设置 `Content-Type`，让浏览器/axios 自动带 boundary。
  - 可选：把 axios 的 `onUploadProgress` 透传出来供页面显示进度。

### 2) 页面改用真实 service（保留 antd Upload 的校验逻辑）

- `index.tsx`：
  - import 替换为 `uploadExcel`（不再使用 mock）。
  - `customRequest` 中用 `uploadExcel(file, { onProgress })`；成功后 `onSuccess`，失败 `onError`。
  - 保持 `beforeUpload` 校验扩展名、`maxCount=1`、`accept` 等。

### 3) 解决 9005 跨域：加开发代理（推荐）

- 在 `config/config.ts` 增加 `proxy`：
  - `'/inst-indexboard': { target: 'http://localhost:9005', changeOrigin: true }`
- 这样前端仍请求相对路径 `/inst-indexboard/...`，开发时由 Umi 代理到 9005，避免浏览器 CORS 问题；生产环境则按部署网关/同域转发处理。

## 验证方式

- 在页面选择一个 `.xls/.xlsx` 文件点击上传：
  - Network 里看到 `POST /inst-indexboard/securities/constitute/manage/importExcel`
  - Request Payload 为 `multipart/form-data`，字段名 `excelFile`
  - 返回 200 后提示“上传成功”，并走 `onSuccess`。

## 兼容点（我会按默认最安全的方式处理）

- 如果后端需要 cookie 会话：可在 request 里加 `withCredentials: true`（先不强制加，避免影响其他接口）。
- 如果后端需要 Token：可在 `headers` 增加 `Authorization`（当前仓库未发现全局鉴权逻辑）。
