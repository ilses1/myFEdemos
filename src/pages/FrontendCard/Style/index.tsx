import { DownOutlined, ExportOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useMemo, useState } from 'react';
import styles from './index.less';

type StyleRow = {
  key: string;
  fundCode: string;
  fundName: string;
  beta: number;
  momentum: number;
  mktValue: number;
  profitability: number;
  volatility: number;
  growth: number;
  value: number;
  dividend: number;
  turnover: number;
  eventValue: number;
};

type FilterValues = {
  keyword: string;
};

type SortOrder = 'ascend' | 'descend' | null;

const SOURCE_NOTE =
  '数据来源:Wind，截至2025-11-18，数据根据ETF基金跟踪指数成分股财务统计汇总。';

const BASE_ROWS: Omit<StyleRow, 'key'>[] = [
  {
    fundCode: '159381.SZ',
    fundName: '创业板人工智能ETF华夏',
    beta: 2.03,
    momentum: 0.65,
    mktValue: 0.32,
    profitability: -1.01,
    volatility: 0.68,
    growth: 0.77,
    value: -1.27,
    dividend: -0.88,
    turnover: 1.94,
    eventValue: -0.01,
  },
  {
    fundCode: '159381.SZ',
    fundName: '创业板成长ETF',
    beta: 2.0,
    momentum: 1.28,
    mktValue: 0.76,
    profitability: -0.82,
    volatility: 0.44,
    growth: 0.99,
    value: -1.32,
    dividend: -0.62,
    turnover: 1.75,
    eventValue: -0.33,
  },
  {
    fundCode: '159381.SZ',
    fundName: '5G通信ETF',
    beta: 1.96,
    momentum: 1.39,
    mktValue: 0.77,
    profitability: -0.76,
    volatility: 0.71,
    growth: 0.65,
    value: -1.11,
    dividend: -0.61,
    turnover: 1.7,
    eventValue: -0.34,
  },
  {
    fundCode: '159381.SZ',
    fundName: '创业板新能源ETF华夏',
    beta: 1.77,
    momentum: 0.8,
    mktValue: 0.39,
    profitability: -0.63,
    volatility: 0.17,
    growth: 1.1,
    value: -0.93,
    dividend: -0.15,
    turnover: 1.48,
    eventValue: -0.05,
  },
  {
    fundCode: '159381.SZ',
    fundName: '创业板50ETF华夏',
    beta: 1.75,
    momentum: 0.94,
    mktValue: 0.85,
    profitability: -0.71,
    volatility: 0.04,
    growth: 1.03,
    value: -1.14,
    dividend: -0.52,
    turnover: 1.34,
    eventValue: -0.4,
  },
  {
    fundCode: '159381.SZ',
    fundName: '创业板价值ETF华夏',
    beta: 1.71,
    momentum: -1.03,
    mktValue: -0.4,
    profitability: -1.26,
    volatility: -0.49,
    growth: -0.31,
    value: -1.03,
    dividend: -0.76,
    turnover: 1.33,
    eventValue: 0.53,
  },
  {
    fundCode: '159381.SZ',
    fundName: '金融科技ETF华夏',
    beta: 1.62,
    momentum: -0.5,
    mktValue: -0.38,
    profitability: -1.1,
    volatility: -0.52,
    growth: -0.33,
    value: -1.11,
    dividend: -0.87,
    turnover: 1.37,
    eventValue: 0.38,
  },
  {
    fundCode: '159381.SZ',
    fundName: '消费电子ETF',
    beta: 1.61,
    momentum: 0.63,
    mktValue: 0.59,
    profitability: -0.55,
    volatility: -0.03,
    growth: 0.27,
    value: -0.75,
    dividend: -0.13,
    turnover: 1.52,
    eventValue: -0.2,
  },
  {
    fundCode: '159381.SZ',
    fundName: '科创人工智能ETF华夏',
    beta: 1.57,
    momentum: 0.17,
    mktValue: 0.12,
    profitability: -1.2,
    volatility: 0.27,
    growth: 0.5,
    value: -1.27,
    dividend: -1.03,
    turnover: 1.03,
    eventValue: 0.16,
  },
  {
    fundCode: '159381.SZ',
    fundName: '人工智能AIETF',
    beta: 1.57,
    momentum: 0.8,
    mktValue: 0.71,
    profitability: -1.0,
    volatility: 0.37,
    growth: 0.61,
    value: -1.21,
    dividend: 0.83,
    turnover: 1.67,
    eventValue: -0.29,
  },
];

const tweakMetric = (value: number, rowIndex: number, seed: number) => {
  const drift = ((rowIndex % 9) - 4) * 0.03 + ((seed % 5) - 2) * 0.01;
  return Number((value + drift).toFixed(2));
};

const MOCK_ROWS: StyleRow[] = Array.from({ length: 35 }).map((_, i) => {
  const base = BASE_ROWS[i % BASE_ROWS.length];
  return {
    ...base,
    key: String(i + 1),
    beta: tweakMetric(base.beta, i, 1),
    momentum: tweakMetric(base.momentum, i, 2),
    mktValue: tweakMetric(base.mktValue, i, 3),
    profitability: tweakMetric(base.profitability, i, 4),
    volatility: tweakMetric(base.volatility, i, 5),
    growth: tweakMetric(base.growth, i, 6),
    value: tweakMetric(base.value, i, 7),
    dividend: tweakMetric(base.dividend, i, 8),
    turnover: tweakMetric(base.turnover, i, 9),
    eventValue: tweakMetric(base.eventValue, i, 10),
  };
});

const getMetricBadgeStyle = (value: number): React.CSSProperties => {
  const safe = Number.isFinite(value) ? value : 0;
  if (safe === 0)
    return { backgroundColor: 'rgb(255, 255, 255)', color: '#484B59' };

  const clamped = Math.max(-2, Math.min(2, safe));
  const abs = Math.abs(clamped);
  const bucket = Math.min(10, Math.ceil(abs / 0.2));
  const alpha = Number((bucket * 0.1).toFixed(1));

  if (clamped > 0)
    return {
      backgroundColor: `rgba(234, 134, 139, ${alpha})`,
      color: '#484B59',
    };
  return {
    backgroundColor: `rgba(64, 150, 193, ${alpha})`,
    color: '#484B59',
  };
};

const StylePage: React.FC = () => {
  const [form] = Form.useForm<FilterValues>();
  const [keyword, setKeyword] = useState('');
  const [sortState, setSortState] = useState<{
    field?: string;
    order: SortOrder;
  }>({ field: undefined, order: null });
  const [betaRange, setBetaRange] = useState<{ min?: number; max?: number }>(
    {},
  );
  const [betaDraft, setBetaDraft] = useState<{
    min?: number;
    max?: number;
    order: SortOrder;
  }>({ order: null });

  const betaAvailableRange = useMemo(() => {
    const values = MOCK_ROWS.map((row) => row.beta).filter(Number.isFinite);
    const min = values.length ? Math.min(...values) : 0;
    const max = values.length ? Math.max(...values) : 0;
    return { min, max };
  }, []);

  const dataSource = useMemo(() => {
    const kw = keyword.trim();
    const min = betaRange.min;
    const max = betaRange.max;

    return MOCK_ROWS.filter((row) => {
      if (kw && !row.fundCode.includes(kw) && !row.fundName.includes(kw))
        return false;
      if (typeof min === 'number' && Number.isFinite(min) && row.beta < min)
        return false;
      if (typeof max === 'number' && Number.isFinite(max) && row.beta > max)
        return false;
      return true;
    });
  }, [betaRange.max, betaRange.min, keyword]);

  const columns: ColumnsType<StyleRow> = useMemo(
    () => [
      {
        title: '基金代码',
        dataIndex: 'fundCode',
        key: 'fundCode',
        width: 120,
        fixed: 'left',
        render: (text: string) => (
          <span className={styles.linkText}>{text}</span>
        ),
      },
      {
        title: '基金名称',
        dataIndex: 'fundName',
        key: 'fundName',
        width: 230,
        fixed: 'left',
        render: (text: string) => (
          <span className={styles.linkText}>{text}</span>
        ),
      },
      {
        title: 'beta',
        dataIndex: 'beta',
        key: 'beta',
        width: 86,
        sortOrder: sortState.field === 'beta' ? sortState.order : null,
        filterIcon: ({ filtered }) => (
          <DownOutlined
            className={
              filtered ? styles.metricFilterIconActive : styles.metricFilterIcon
            }
          />
        ),
        filterDropdownProps: {
          onOpenChange: (open) => {
            if (!open) return;
            setBetaDraft({
              min: betaRange.min,
              max: betaRange.max,
              order: sortState.field === 'beta' ? sortState.order : null,
            });
          },
        },
        filtered: Object.keys(betaRange).length > 0,
        filterDropdown: ({ close }) => (
          <div className={styles.metricDropdown}>
            <div className={styles.metricSortRow}>
              <button
                type="button"
                className={
                  betaDraft.order === 'ascend'
                    ? styles.metricSortBtnActive
                    : styles.metricSortBtn
                }
                onClick={() =>
                  setBetaDraft((prev) => ({
                    ...prev,
                    order: prev.order === 'ascend' ? null : 'ascend',
                  }))
                }
              >
                升序
              </button>
              <button
                type="button"
                className={
                  betaDraft.order === 'descend'
                    ? styles.metricSortBtnActive
                    : styles.metricSortBtn
                }
                onClick={() =>
                  setBetaDraft((prev) => ({
                    ...prev,
                    order: prev.order === 'descend' ? null : 'descend',
                  }))
                }
              >
                降序
              </button>
            </div>

            <div className={styles.metricRangeLabel}>自定义区间筛选： beta</div>
            <div className={styles.metricRangeInputs}>
              <InputNumber
                value={betaDraft.min}
                placeholder="0"
                controls={false}
                className={styles.metricRangeInput}
                onChange={(value) =>
                  setBetaDraft((prev) => ({
                    ...prev,
                    min: typeof value === 'number' ? value : undefined,
                  }))
                }
              />
              <span className={styles.metricRangeSep}>~</span>
              <InputNumber
                value={betaDraft.max}
                placeholder="110"
                controls={false}
                className={styles.metricRangeInput}
                onChange={(value) =>
                  setBetaDraft((prev) => ({
                    ...prev,
                    max: typeof value === 'number' ? value : undefined,
                  }))
                }
              />
            </div>
            <div className={styles.metricRangeHint}>
              可选区间：{betaAvailableRange.min.toFixed(1)}~
              {betaAvailableRange.max.toFixed(1)}
            </div>

            <div className={styles.metricDropdownActions}>
              <Button
                danger
                className={styles.metricActionBtn}
                onClick={() => {
                  setBetaRange({});
                  setSortState({ field: undefined, order: null });
                  setBetaDraft({ order: null });
                  close();
                }}
              >
                重置
              </Button>
              <Button
                type="primary"
                danger
                className={styles.metricActionBtn}
                onClick={() => {
                  const rawMin = betaDraft.min;
                  const rawMax = betaDraft.max;
                  const min =
                    typeof rawMin === 'number' && Number.isFinite(rawMin)
                      ? rawMin
                      : undefined;
                  const max =
                    typeof rawMax === 'number' && Number.isFinite(rawMax)
                      ? rawMax
                      : undefined;

                  if (
                    typeof min === 'number' &&
                    typeof max === 'number' &&
                    min > max
                  ) {
                    setBetaRange({ min: max, max: min });
                  } else {
                    const next: { min?: number; max?: number } = {};
                    if (typeof min === 'number') next.min = min;
                    if (typeof max === 'number') next.max = max;
                    setBetaRange(next);
                  }

                  if (betaDraft.order) {
                    setSortState({ field: 'beta', order: betaDraft.order });
                  } else if (sortState.field === 'beta') {
                    setSortState({ field: undefined, order: null });
                  }

                  close();
                }}
              >
                确认
              </Button>
            </div>
          </div>
        ),
        render: (v: number) => (
          <span className={styles.metricBadge} style={getMetricBadgeStyle(v)}>
            {v.toFixed(2)}
          </span>
        ),
      },
      {
        title: '动量',
        dataIndex: 'momentum',
        key: 'momentum',
        width: 86,
        sorter: (a, b) => a.momentum - b.momentum,
        render: (v: number) => (
          <span className={styles.metricBadge} style={getMetricBadgeStyle(v)}>
            {v.toFixed(2)}
          </span>
        ),
      },
      {
        title: '市值',
        dataIndex: 'mktValue',
        key: 'mktValue',
        width: 86,
        sorter: (a, b) => a.mktValue - b.mktValue,
        render: (v: number) => (
          <span className={styles.metricBadge} style={getMetricBadgeStyle(v)}>
            {v.toFixed(2)}
          </span>
        ),
      },
      {
        title: '盈利',
        dataIndex: 'profitability',
        key: 'profitability',
        width: 86,
        sorter: (a, b) => a.profitability - b.profitability,
        render: (v: number) => (
          <span className={styles.metricBadge} style={getMetricBadgeStyle(v)}>
            {v.toFixed(2)}
          </span>
        ),
      },
      {
        title: '波动',
        dataIndex: 'volatility',
        key: 'volatility',
        width: 86,
        sorter: (a, b) => a.volatility - b.volatility,
        render: (v: number) => (
          <span className={styles.metricBadge} style={getMetricBadgeStyle(v)}>
            {v.toFixed(2)}
          </span>
        ),
      },
      {
        title: '成长',
        dataIndex: 'growth',
        key: 'growth',
        width: 86,
        sorter: (a, b) => a.growth - b.growth,
        render: (v: number) => (
          <span className={styles.metricBadge} style={getMetricBadgeStyle(v)}>
            {v.toFixed(2)}
          </span>
        ),
      },
      {
        title: '价值',
        dataIndex: 'value',
        key: 'value',
        width: 86,
        sorter: (a, b) => a.value - b.value,
        render: (v: number) => (
          <span className={styles.metricBadge} style={getMetricBadgeStyle(v)}>
            {v.toFixed(2)}
          </span>
        ),
      },
      {
        title: '红利',
        dataIndex: 'dividend',
        key: 'dividend',
        width: 86,
        sorter: (a, b) => a.dividend - b.dividend,
        render: (v: number) => (
          <span className={styles.metricBadge} style={getMetricBadgeStyle(v)}>
            {v.toFixed(2)}
          </span>
        ),
      },
      {
        title: '换手',
        dataIndex: 'turnover',
        key: 'turnover',
        width: 86,
        sorter: (a, b) => a.turnover - b.turnover,
        render: (v: number) => (
          <span className={styles.metricBadge} style={getMetricBadgeStyle(v)}>
            {v.toFixed(2)}
          </span>
        ),
      },
      {
        title: '事件性价比',
        dataIndex: 'eventValue',
        key: 'eventValue',
        width: 108,
        sorter: (a, b) => a.eventValue - b.eventValue,
        render: (v: number) => (
          <span className={styles.metricBadge} style={getMetricBadgeStyle(v)}>
            {v.toFixed(2)}
          </span>
        ),
      },
    ],
    [
      betaAvailableRange.max,
      betaAvailableRange.min,
      betaDraft,
      betaRange,
      sortState,
    ],
  );

  return (
    <div className={styles.page}>
      <Form<FilterValues>
        form={form}
        initialValues={{ keyword: '' }}
        className={styles.filters}
        onFinish={(values) => setKeyword(values.keyword || '')}
      >
        <div className={styles.filterItem}>
          <div className={styles.filterLabel}>ETF名称/代码</div>
          <Form.Item name="keyword" noStyle>
            <Input
              placeholder="请输入ETF名称/代码"
              allowClear
              className={styles.filterInput}
            />
          </Form.Item>
        </div>

        <div className={styles.actions}>
          <Button
            danger
            className={styles.resetBtn}
            onClick={() => {
              form.resetFields();
              setKeyword('');
            }}
          >
            重置
          </Button>
          <Button
            type="primary"
            danger
            className={styles.queryBtn}
            htmlType="submit"
          >
            查询
          </Button>
        </div>
      </Form>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <div className={styles.tableTitle}>风格</div>
          <Button danger className={styles.exportBtn} icon={<ExportOutlined />}>
            导出数据
          </Button>
        </div>

        <div className={styles.tableWrap}>
          <Table<StyleRow>
            className={styles.styleTable}
            rowKey="key"
            columns={columns}
            dataSource={dataSource}
            tableLayout="fixed"
            scroll={{ x: 'max-content' }}
            rowClassName={(_, idx) => (idx % 2 === 1 ? styles.rowAlt : '')}
            onChange={(_, __, sorter) => {
              if (Array.isArray(sorter)) return;
              const order = (sorter.order ?? null) as SortOrder;
              const field =
                typeof sorter.field === 'string' ? sorter.field : '';
              setSortState({ field: field || undefined, order });
            }}
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: [10, 20, 50],
              defaultPageSize: 10,
              showTotal: (total, range) =>
                `第 ${range[0]}-${range[1]} 条 / 共 ${total} 条`,
            }}
          />
        </div>

        <div className={styles.footerNote}>{SOURCE_NOTE}</div>
      </div>
    </div>
  );
};

export default StylePage;
