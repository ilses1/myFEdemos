import { SearchOutlined } from '@ant-design/icons';
import { Col, Input, Radio, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useMemo, useState } from 'react';
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

  // --- Right Card State ---
  const [correlationType, setCorrelationType] = useState<'high' | 'minus'>(
    'high',
  );

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
      render: (text) => <span>{text}</span>, // Plain text in right table based on image
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
      align: 'center',
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
      align: 'center',
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
      align: 'center',
      sorter: (a, b) => a.recent1YCorrelationValue - b.recent1YCorrelationValue,
      render: (value) => (
        <span style={{ color: '#666' }}>{(value || 0).toFixed(2)}</span>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Row gutter={24}>
        {/* Left Card: Price Change */}
        <Col span={10}>
          <div className={styles.card}>
            <div className={styles.header}>
              <div className={`${styles.title} ${styles.red}`}>
                涨跌幅(全市场)
              </div>
              <Radio.Group
                value={marketPeriod}
                onChange={(e) => setMarketPeriod(e.target.value)}
                buttonStyle="solid"
                className={styles.customRadio}
              >
                <Radio.Button value="1w">近一周</Radio.Button>
                <Radio.Button value="1m">近一月</Radio.Button>
              </Radio.Group>
            </div>

            <div className={styles.searchBar}>
              <Input
                placeholder="搜索"
                prefix={<SearchOutlined style={{ color: '#ccc' }} />}
                style={{ width: 120, borderRadius: 4 }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
            </div>

            <Table
              className={styles.customTable}
              dataSource={marketData}
              columns={marketColumns}
              rowKey="securityId"
              pagination={false}
              size="small"
              scroll={{ y: 400 }}
            />
          </div>
        </Col>

        {/* Right Card: Asset Correlation */}
        <Col span={14}>
          <div className={styles.card}>
            <div className={styles.header}>
              <div className={`${styles.title} ${styles.blue}`}>资产相关性</div>
              <Radio.Group
                value={correlationType}
                onChange={(e) => setCorrelationType(e.target.value)}
                buttonStyle="solid"
                className={styles.customRadio}
              >
                <Radio.Button value="high">高相关性</Radio.Button>
                <Radio.Button value="minus">负相关性</Radio.Button>
              </Radio.Group>
            </div>

            <Table
              className={styles.customTable}
              dataSource={correlationData}
              columns={correlationColumns}
              rowKey="assetId"
              pagination={false}
              size="small"
              scroll={{ y: 400 }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TablePage;
