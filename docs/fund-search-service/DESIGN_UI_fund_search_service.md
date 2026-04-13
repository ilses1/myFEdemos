# DESIGN_ui_fund_search_service

## 组件结构 (FundSearchService)

```tsx
<div className={styles.searchWrapper}>
  {/* 上方弹出层 */}
  {focused && (
    <div className={styles.popupList}>
      {searchValue ? renderSearchResults() : renderHistory()}
    </div>
  )}

  {/* 搜索框主体 */}
  <div className={classNames(styles.searchBar, collapsed && styles.collapsed)}>
    {!collapsed ? (
      <>
        <SearchOutlined className={styles.searchIcon} />
        <input
          placeholder={focused ? '' : '搜索基金'}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <DoubleRightOutlined onClick={() => setCollapsed(true)} />
      </>
    ) : (
      <div className={styles.collapsedIcon} onClick={() => setCollapsed(false)}>
        <SearchOutlined />
      </div>
    )}
  </div>
</div>
```

## 状态管理

- `collapsed`: 控制是否折叠成图标。
- `focused`: 控制是否显示上方列表及占位符隐藏。
- `searchValue`: 实时搜索关键词。

## 样式关键点 (LESS)

- 使用 `transition` 实现折叠动画。
- `.popupList` 使用 `position: absolute; bottom: 100%;` 实现向上弹出。
- 模拟图片中的蓝色系 (#5b7edb) 和红色系 (#f5222d)。
