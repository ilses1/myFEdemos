## Summary

- 目标：支持“一个行业下多个跟踪指数”的展示效果：行业列合并单元格，行业下按多行展示不同跟踪指数及其基金列表。
- TopN 以“行业”为单位；排序以“行业”为单位（行业按最大暴露权重排序，行业内按暴露权重排序）。

## Current State Analysis

- 页面文件：[index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/Industry/index.tsx)
- 现状数据模型：`MOCK_GROUPS` 每条数据同时包含 `industryLabel + exposureWeight + indexCode + funds`，本质是一行一跟踪指数，行业重复时会形成多行。
- 现状表格：行业列不做合并；“暴露权重”列通过 `weightSortOrder` 在前端手动排序；TopN 当前按“行数”截断。
- 参考实现：项目内已有 rowSpan 合并单元格示例（Theme 页面），可复用其“按当前分页数据计算 rowSpan”写法。

## Proposed Changes

### 1) 调整数据模型以表达“行业 -> 多跟踪指数”

- 文件：[index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/Industry/index.tsx)
- 修改点：
  - 将 `IndustryGroup` 改为包含 `indices`（或同等命名）的数组：每个元素代表一个“跟踪指数行”（含 `exposureWeight/indexCode/funds`）。
  - 同步改造 `MOCK_GROUPS`：把相同行业的多条 mock 数据聚合到同一 `IndustryGroup` 下的多个指数项，避免重复行业数据。
- 目的：数据语义与 UI（行业下多指数）一致，后续排序/TopN/过滤按行业维度实现更可靠。

### 2) 过滤逻辑升级为“行业维度 + 指数维度”

- 文件：[index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/Industry/index.tsx)
- 修改点：
  - 行业关键字 `industryKeyword`：
    - 若命中 `industryLabel`：保留该行业全部指数项；
    - 否则仅保留该行业中 `indexCode` 命中的指数项。
  - 基金关键字 `fundKeyword`：在每个指数项的 `funds` 内过滤并按规模降序；基金过滤后为空的指数项剔除。
  - 行业过滤：若行业下无任何剩余指数项，则剔除该行业。

### 3) 排序与 TopN 按“行业”为单位

- 文件：[index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/Industry/index.tsx)
- 修改点：
  - 行业排序：以该行业“最大暴露权重”作为排序键，受 `weightSortOrder` 控制（ascend/descend）。
  - 行业内排序：指数项按 `exposureWeight` 降序（保持展示稳定、易读）。
  - TopN：`topN > 0` 时截断“行业数量”，保留前 N 个行业；`topN === 0` 表示全部。

### 4) 表格行构造与“行业列合并单元格”

- 文件：[index.tsx](file:///c:/Users/wusan/Desktop/myFEdemos/src/pages/FrontendCard/Industry/index.tsx)
- 修改点：
  - 将“行业 -> 多指数”结构 flatten 为 Table `dataSource`：每个指数项为一行，带上 `industryLabel`。
  - 计算 `currentPageRows`（基于 `allRows/page/pageSize` 的 slice）并实现 `getRowSpanForIndustry(index)`：
    - 当前行的 `industryLabel` 与上一行相同则 `rowSpan=0`；
    - 否则向下统计连续相同行业的行数作为 `rowSpan`。
  - 在“申万 1 级行业指数简称”列的 `render` 返回 `{ children, props: { rowSpan } }`，实现截图所示的行业合并效果；其他列保持逐行展示（暴露权重、指数代码、基金列表各自对应指数项）。

## Assumptions & Decisions

- 已确认：
  - TopN 表示“前 N 个行业”。
  - 排序以“行业”为单位：行业按最大暴露权重排序，行业内按暴露权重排序。
- 分页保持 AntD 的行分页：当某行业指数项数量较多导致跨页时，每页独立计算 rowSpan（跨页不合并）。

## Verification

- 启动本地开发环境后手动验证：
  - 同一行业下多条跟踪指数时，第一列行业名称正确合并（rowSpan 生效）。
  - 行业关键字：输入行业简称命中时展示该行业全部指数项；输入某指数代码时仅展示匹配指数项。
  - 基金关键字：仅保留包含关键字的基金；若某指数项下基金为空则该指数项行消失；行业下无指数项则行业整体消失。
  - TopN：选择 N 后仅展示前 N 个行业；选择“全部”恢复。
  - 排序：切换暴露权重排序后，行业整体顺序按最大暴露权重变化，行业内指数项仍按暴露权重降序。
