import { SearchOutlined } from '@ant-design/icons';
import { Input, Radio, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { assetCorrelation, riseFallFullMarket } from './const';
import styles from './index.less';

// Helper to format percentage
const formatPercent = (value: number) => {
  return `${(value * 100).toFixed(2)}%`;
};

// Helper to determine color class
const getColorClass = (value: number) => {
  if (value > 0) return styles.textRed;
  if (value < 0) return styles.textGreen;
  return '';
};

const TablePage: React.FC = () => {
  // --- Left Card State ---
  const [marketPeriod, setMarketPeriod] = useState<'1w' | '1m'>('1w');
  const [searchText, setSearchText] = useState('');
  const [marketSorter, setMarketSorter] = useState<{
    columnKey?: string;
    order?: 'ascend' | 'descend';
  }>({
    columnKey: 'percentageChange',
    order: 'descend',
  });

  // --- Right Card State ---
  const [correlationType, setCorrelationType] = useState<'high' | 'minus'>(
    'high',
  );

  const marketTableWrapperRef = useRef<HTMLDivElement>(null);
  const correlationTableWrapperRef = useRef<HTMLDivElement>(null);

  const scrollTableToTop = (wrapper: HTMLDivElement | null) => {
    const body = wrapper?.querySelector<HTMLDivElement>('.ant-table-body');
    if (body) body.scrollTop = 0;
  };

  useEffect(() => {
    scrollTableToTop(marketTableWrapperRef.current);
  }, [marketPeriod]);

  useEffect(() => {
    scrollTableToTop(correlationTableWrapperRef.current);
  }, [correlationType]);

  // --- Left Card Data Processing ---
  const marketData = useMemo(() => {
    let data = riseFallFullMarket.recentList;
    if (searchText) {
      data = data.filter(
        (item) =>
          item.securityName.includes(searchText) ||
          item.securityId.includes(searchText),
      );
    }
    return data;
  }, [searchText]);

  const marketColumns: ColumnsType<any> = [
    {
      title: '', // No title for name column in image, or maybe it's just implicit
      dataIndex: 'securityName',
      key: 'securityName',
      render: (text) => <span className={styles.assetName}>{text}</span>,
      width: '40%',
      ellipsis: true,
    },
    {
      title: '涨跌',
      dataIndex: marketPeriod === '1w' ? 'priceChange1w' : 'priceChange1m',
      key: 'priceChange',
      align: 'right',
      sorter: (a, b) => {
        const field = marketPeriod === '1w' ? 'priceChange1w' : 'priceChange1m';
        return a[field] - b[field];
      },
      sortOrder:
        marketSorter.columnKey === 'priceChange'
          ? marketSorter.order
          : undefined,
      render: (value) => (
        <span className={getColorClass(value)}>{(value || 0).toFixed(2)}</span>
      ),
    },
    {
      title: '涨跌幅',
      dataIndex:
        marketPeriod === '1w' ? 'percentageChange1w' : 'percentageChange1m',
      key: 'percentageChange',
      align: 'right',
      sorter: (a, b) => {
        const field =
          marketPeriod === '1w' ? 'percentageChange1w' : 'percentageChange1m';
        return a[field] - b[field];
      },
      sortOrder:
        marketSorter.columnKey === 'percentageChange'
          ? marketSorter.order
          : undefined,
      render: (value) => (
        <span className={getColorClass(value)}>{formatPercent(value)}</span>
      ),
    },
  ];

  // --- Right Card Data Processing ---
  const correlationData = useMemo(() => {
    return correlationType === 'high'
      ? assetCorrelation.highCorrelationList
      : assetCorrelation.minusCorrelationList;
  }, [correlationType]);

  const correlationColumns: ColumnsType<any> = [
    {
      title: '资产名称',
      dataIndex: 'assetName',
      key: 'assetName',
      ellipsis: true,
      render: (text) => <span className={styles.assetName}>{text}</span>,
    },
    {
      title: (
        <div style={{ textAlign: 'center' }}>
          <div>收益率</div>
          <div style={{ fontSize: '12px', fontWeight: 'normal' }}>今年以来</div>
        </div>
      ),
      dataIndex: 'thisYearReturnRatio',
      key: 'thisYearReturnRatio',
      align: 'right',
      sorter: (a, b) => a.thisYearReturnRatio - b.thisYearReturnRatio,
      render: (value) => (
        <span className={getColorClass(value)}>{formatPercent(value)}</span>
      ),
    },
    {
      title: (
        <div style={{ textAlign: 'center' }}>
          <div>波动率</div>
          <div style={{ fontSize: '12px', fontWeight: 'normal' }}>近一年</div>
        </div>
      ),
      dataIndex: 'recent1YReturnRatioStd',
      key: 'recent1YReturnRatioStd',
      align: 'right',
      sorter: (a, b) => a.recent1YReturnRatioStd - b.recent1YReturnRatioStd,
      render: (value) => (
        <span style={{ color: '#666' }}>{formatPercent(value)}</span>
      ),
    },
    {
      title: (
        <div style={{ textAlign: 'center' }}>
          <div>最新相关性</div>
          <div style={{ fontSize: '12px', fontWeight: 'normal' }}>近一年</div>
        </div>
      ),
      dataIndex: 'recent1YCorrelationValue',
      key: 'recent1YCorrelationValue',
      align: 'right',
      width: 98,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.recent1YCorrelationValue - b.recent1YCorrelationValue,
      render: (value) => (
        <span style={{ color: '#666' }}>{(value || 0).toFixed(2)}</span>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.fcTableMetricsCard}>
        <div className={styles.fcTableMetricsLeft}>
          <div className={styles.fcTableHeader}>
            <div className={`${styles.fcTableTitle} ${styles.fcTableTitleRed}`}>
              涨跌幅(全市场)
            </div>
            <Radio.Group
              value={marketPeriod}
              onChange={(e) => setMarketPeriod(e.target.value)}
              className={styles.fcTableCustomRadio}
            >
              <Radio.Button value="1w">近一周</Radio.Button>
              <Radio.Button value="1m">近一月</Radio.Button>
            </Radio.Group>
          </div>

          <div
            ref={marketTableWrapperRef}
            className={styles.fcTableSearchBContaner}
          >
            <Input
              className={styles.fcTableSearchBar}
              placeholder="搜索"
              prefix={
                <SearchOutlined style={{ color: 'rgba(141, 149, 166, 1)' }} />
              }
              style={{ width: 100, borderRadius: 2 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
            <Table
              className={styles.fcTableCustomTable}
              dataSource={marketData}
              columns={marketColumns}
              rowKey="securityId"
              onChange={(_, __, sorter) => {
                const nextSorter = Array.isArray(sorter) ? sorter[0] : sorter;
                setMarketSorter({
                  columnKey:
                    typeof nextSorter?.columnKey === 'string'
                      ? nextSorter.columnKey
                      : undefined,
                  order:
                    nextSorter?.order === 'ascend' ||
                    nextSorter?.order === 'descend'
                      ? nextSorter.order
                      : undefined,
                });
              }}
              pagination={false}
              size="small"
              scroll={{ y: 400 }}
            />
          </div>
        </div>

        <div className={styles.fcTableSeparator} />

        <div className={styles.fcTableMetricsRight}>
          <div className={styles.fcTableHeader}>
            <div
              className={`${styles.fcTableTitle} ${styles.fcTableTitleBlue}`}
            >
              资产相关性
            </div>
            <Radio.Group
              value={correlationType}
              onChange={(e) => setCorrelationType(e.target.value)}
              className={styles.fcTableCustomRadio}
            >
              <Radio.Button value="high">高相关性</Radio.Button>
              <Radio.Button value="minus">负相关性</Radio.Button>
            </Radio.Group>
          </div>

          <div ref={correlationTableWrapperRef}>
            <Table
              className={styles.fcTableCustomTable}
              dataSource={correlationData}
              columns={correlationColumns}
              rowKey="assetId"
              pagination={false}
              size="small"
              scroll={{ y: 400 }}
              tableLayout="fixed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablePage;
