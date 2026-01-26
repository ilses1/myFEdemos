## 目标
- 在 [index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/LineChart/index.tsx) 的图表区域右上角增加“截图”图标+文本按钮。
- 点击后将当前 ECharts（chartRef 对应的图表）导出为 PNG 并触发浏览器下载到本地。

## 实现方案
- 复用现有 `chartInstance`（已通过 `useRef` 保存 ECharts 实例）。
- 新增点击处理函数 `handleScreenshot`：调用 `chartInstance.current.getDataURL({ type: 'png', pixelRatio: 2, backgroundColor: '#fff' })` 获取图片 DataURL，然后创建 `<a download>` 触发下载。
- UI 结构调整：用一个 `position: relative` 的包裹容器包住图表 DOM，在右上角 `position: absolute` 放置按钮。
- 按钮使用现有依赖 `@ant-design/icons`（如 `CameraOutlined`）+ antd `Button`，文案为“截图”。

## 代码改动点
- 修改 [index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/LineChart/index.tsx)
  - 引入 `Button`、`CameraOutlined`
  - 增加 `handleScreenshot`
  - 将原来的 `chartContainer` 改为 `chartWrapper` + 右上角按钮 + `chartContainer`
- 修改 [index.less](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/Chart/LineChart/index.less)
  - 新增 `.chartWrapper`、`.screenshotButton` 样式（绝对定位到右上角、z-index、hover 效果、轻背景避免遮挡）

## 校验方式
- 本地点击“截图”后应下载 PNG；打开图片能看到当前图表内容，背景为白色。
- 不影响图表缩放/tooltip 等交互（按钮只占右上角小区域）。