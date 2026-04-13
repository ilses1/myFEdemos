import { DoubleRightOutlined, SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React, { useMemo, useRef, useState } from 'react';
import styles from './index.less';

interface FundItem {
  code: string;
  name: string;
}

const ALL_REITS: FundItem[] = [
  { code: '508031', name: '国泰海通城投宽庭保租房REITs' },
  { code: '508036', name: '平安宁波交投REITs' },
  { code: '508001', name: '浙商证券沪杭甬高速REIT' },
  { code: '508006', name: '富国首创水务REIT' },
  { code: '508008', name: '中金普洛斯仓储物流REIT' },
  { code: '508027', name: '东久新经济REIT' },
];

const INITIAL_HISTORY: FundItem[] = [
  { code: '508031', name: '国泰海通城投宽庭保租房REITs' },
  { code: '508036', name: '平安宁波交投REITs' },
];

const FundSearchService: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [focused, setFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [history] = useState<FundItem[]>(INITIAL_HISTORY);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchResults = useMemo(() => {
    if (!searchValue) return [];
    return ALL_REITS.filter(
      (item) =>
        item.code.includes(searchValue) || item.name.includes(searchValue),
    );
  }, [searchValue]);

  const handleExpand = () => {
    setCollapsed(false);
    // 延迟聚焦以等待动画
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const renderListItem = (item: FundItem) => (
    <div key={item.code} className={styles.listItem}>
      <span className={styles.reitsTag}>REITs</span>
      <span className={styles.fundCode}>{item.code}</span>
      <span className={styles.fundName}>{item.name}</span>
    </div>
  );

  return (
    <div className={styles.searchWrapper}>
      {/* 弹出列表：聚焦时显示 */}
      {focused && (
        <div className={styles.popupList}>
          {searchValue ? (
            // 实时搜索结果
            searchResults.length > 0 ? (
              searchResults.map(renderListItem)
            ) : (
              <div
                style={{
                  padding: '12px',
                  color: '#999',
                  textAlign: 'center',
                }}
              >
                暂无匹配数据
              </div>
            )
          ) : (
            // 历史搜索记录
            <>
              <div className={styles.historyHeader}>历史搜索记录</div>
              {history.map(renderListItem)}
            </>
          )}
        </div>
      )}

      {/* 搜索框主体 */}
      <div
        className={classNames(styles.searchBar, {
          [styles.collapsed]: collapsed,
        })}
        onClick={collapsed ? handleExpand : undefined}
      >
        {!collapsed ? (
          <>
            <SearchOutlined className={styles.searchIcon} />
            <input
              ref={inputRef}
              placeholder={focused ? '' : '搜索基金'}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => {
                // 延迟关闭以允许点击列表项
                setTimeout(() => setFocused(false), 200);
              }}
            />
            <DoubleRightOutlined
              className={styles.collapseIcon}
              onClick={(e) => {
                e.stopPropagation();
                setCollapsed(true);
              }}
            />
          </>
        ) : (
          <SearchOutlined className={styles.searchIcon} style={{ margin: 0 }} />
        )}
      </div>
    </div>
  );
};

export default FundSearchService;
