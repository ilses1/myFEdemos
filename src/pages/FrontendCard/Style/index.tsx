import { CaretDownOutlined, ExportOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useMemo, useState } from 'react';
import { ReactComponent as SortDownIcon } from './down.svg';
import styles from './index.less';
import { ReactComponent as SortUpIcon } from './up.svg';

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

type MetricField = keyof Omit<StyleRow, 'key' | 'fundCode' | 'fundName'>;

const StylePage: React.FC = () => {
  const [form] = Form.useForm<FilterValues>();
  const [keyword, setKeyword] = useState('');
  const [sortState, setSortState] = useState<{
    field?: string;
    order: SortOrder;
  }>({ field: undefined, order: null });
  const [metricDropdownOffsetX, setMetricDropdownOffsetX] = useState<
    Partial<Record<MetricField, number>>
  >({});

  const metrics = useMemo(
    () =>
      [
        { field: 'beta', title: 'beta', width: 86 },
        { field: 'momentum', title: '动量', width: 86 },
        { field: 'mktValue', title: '市值', width: 86 },
        { field: 'profitability', title: '盈利', width: 86 },
        { field: 'volatility', title: '波动', width: 86 },
        { field: 'growth', title: '成长', width: 86 },
        { field: 'value', title: '价值', width: 86 },
        { field: 'dividend', title: '红利', width: 86 },
        { field: 'turnover', title: '换手', width: 86 },
        { field: 'eventValue', title: '非线性市值', width: 108 },
      ] as const satisfies readonly {
        field: MetricField;
        title: string;
        width: number;
      }[],
    [],
  );

  const [metricRanges, setMetricRanges] = useState<
    Record<MetricField, { min?: number; max?: number }>
  >({
    beta: {},
    momentum: {},
    mktValue: {},
    profitability: {},
    volatility: {},
    growth: {},
    value: {},
    dividend: {},
    turnover: {},
    eventValue: {},
  });

  const [metricDrafts, setMetricDrafts] = useState<
    Record<MetricField, { min?: number; max?: number; order: SortOrder }>
  >({
    beta: { order: null },
    momentum: { order: null },
    mktValue: { order: null },
    profitability: { order: null },
    volatility: { order: null },
    growth: { order: null },
    value: { order: null },
    dividend: { order: null },
    turnover: { order: null },
    eventValue: { order: null },
  });

  const metricAvailableRanges = useMemo(() => {
    const calc = (field: MetricField) => {
      const values = MOCK_ROWS.map((row) => row[field]).filter(
        (v): v is number => typeof v === 'number' && Number.isFinite(v),
      );
      const min = values.length ? Math.min(...values) : 0;
      const max = values.length ? Math.max(...values) : 0;
      return { min, max };
    };

    return metrics.reduce((acc, item) => {
      acc[item.field] = calc(item.field);
      return acc;
    }, {} as Record<MetricField, { min: number; max: number }>);
  }, [metrics]);

  const dataSource = useMemo(() => {
    const kw = keyword.trim();

    return MOCK_ROWS.filter((row) => {
      if (kw && !row.fundCode.includes(kw) && !row.fundName.includes(kw))
        return false;
      for (const item of metrics) {
        const range = metricRanges[item.field];
        const min = range.min;
        const max = range.max;
        if (
          typeof min === 'number' &&
          Number.isFinite(min) &&
          row[item.field] < min
        )
          return false;
        if (
          typeof max === 'number' &&
          Number.isFinite(max) &&
          row[item.field] > max
        )
          return false;
      }
      return true;
    });
  }, [keyword, metricRanges, metrics]);

  const columns: ColumnsType<StyleRow> = useMemo(() => {
    const buildMetricColumn = (
      field: MetricField,
      title: string,
      width: number,
    ) => {
      const range = metricRanges[field];
      const draft = metricDrafts[field];
      const available = metricAvailableRanges[field];
      const offsetX = metricDropdownOffsetX[field] ?? 0;
      const filtered =
        typeof range.min === 'number' || typeof range.max === 'number';
      const sorted = sortState.field === field && !!sortState.order;
      const headerActive = filtered || sorted;

      return {
        title,
        dataIndex: field,
        key: field,
        width,
        align: 'center' as const,
        className: headerActive
          ? `${styles.metricHeaderCell} ${styles.metricHeaderCellActive}`
          : styles.metricHeaderCell,
        sorter: (a: StyleRow, b: StyleRow) => a[field] - b[field],
        sortOrder: sortState.field === field ? sortState.order : null,
        filterIcon: ({ filtered: isFiltered }: { filtered: boolean }) => (
          <span
            data-metric-field={field}
            onMouseDown={(e) => {
              const trigger = e.currentTarget as HTMLElement;
              const th = trigger.closest('th') as HTMLElement | null;
              if (!th) return;
              const thRect = th.getBoundingClientRect();
              const triggerRect = trigger.getBoundingClientRect();
              const nextOffset = Math.round(
                thRect.left +
                  thRect.width / 2 -
                  (triggerRect.left + triggerRect.width / 2),
              );
              setMetricDropdownOffsetX((prev) =>
                prev[field] === nextOffset
                  ? prev
                  : { ...prev, [field]: nextOffset },
              );
            }}
          >
            <CaretDownOutlined
              className={
                isFiltered
                  ? styles.metricFilterIconActive
                  : styles.metricFilterIcon
              }
            />
          </span>
        ),
        filterDropdownProps: {
          placement: 'bottomCenter',
          align: { offset: [offsetX, 0] },
          overlayClassName: styles.metricDropdownOverlay,
          onOpenChange: (open: boolean) => {
            if (!open) return;
            setMetricDrafts((prev) => ({
              ...prev,
              [field]: {
                min: range.min,
                max: range.max,
                order: sortState.field === field ? sortState.order : null,
              },
            }));
          },
        },
        filtered,
        filterDropdown: ({ close }: { close: () => void }) => (
          <div className={styles.metricDropdown}>
            <div className={styles.metricSortActions}>
              <Button
                type="text"
                size="small"
                className={
                  draft.order === 'ascend'
                    ? styles.metricSortBtnActive
                    : styles.metricSortBtn
                }
                onClick={() =>
                  setMetricDrafts((prev) => ({
                    ...prev,
                    [field]: {
                      ...prev[field],
                      order: prev[field].order === 'ascend' ? null : 'ascend',
                    },
                  }))
                }
              >
                <span className={styles.metricSortBtnContent}>
                  <SortUpIcon className={styles.metricSortBtnIcon} />
                  升序
                </span>
              </Button>
              <span className={styles.metricSortDivider} />
              <Button
                type="text"
                size="small"
                className={
                  draft.order === 'descend'
                    ? styles.metricSortBtnActive
                    : styles.metricSortBtn
                }
                onClick={() =>
                  setMetricDrafts((prev) => ({
                    ...prev,
                    [field]: {
                      ...prev[field],
                      order: prev[field].order === 'descend' ? null : 'descend',
                    },
                  }))
                }
              >
                <span className={styles.metricSortBtnContent}>
                  <SortDownIcon className={styles.metricSortBtnIcon} />
                  降序
                </span>
              </Button>
            </div>

            <div className={styles.metricRangeLabel}>
              <span className={styles.metricRangeLabelText}>
                自定义区间筛选：
              </span>
              <span className={styles.metricRangeLabelMetric}> {title}</span>
            </div>
            <div className={styles.metricRangeInputs}>
              <InputNumber
                value={draft.min}
                placeholder="0"
                controls={false}
                className={styles.metricRangeInput}
                onChange={(value) =>
                  setMetricDrafts((prev) => ({
                    ...prev,
                    [field]: {
                      ...prev[field],
                      min: typeof value === 'number' ? value : undefined,
                    },
                  }))
                }
              />
              <span className={styles.metricRangeSep}>~</span>
              <InputNumber
                value={draft.max}
                placeholder="110"
                controls={false}
                className={styles.metricRangeInput}
                onChange={(value) =>
                  setMetricDrafts((prev) => ({
                    ...prev,
                    [field]: {
                      ...prev[field],
                      max: typeof value === 'number' ? value : undefined,
                    },
                  }))
                }
              />
            </div>
            <div className={styles.metricRangeHint}>
              可选区间：{available.min.toFixed(1)}~{available.max.toFixed(1)}
            </div>

            <div className={styles.metricDropdownActions}>
              <Button
                danger
                size="small"
                className={styles.metricActionBtn}
                onClick={() => {
                  setMetricRanges((prev) => ({ ...prev, [field]: {} }));
                  setMetricDrafts((prev) => ({
                    ...prev,
                    [field]: { order: null },
                  }));
                  if (sortState.field === field) {
                    setSortState({ field: undefined, order: null });
                  }
                  close();
                }}
              >
                重置
              </Button>
              <Button
                type="primary"
                danger
                size="small"
                className={styles.metricActionBtn}
                onClick={() => {
                  const rawMin = draft.min;
                  const rawMax = draft.max;
                  const min =
                    typeof rawMin === 'number' && Number.isFinite(rawMin)
                      ? rawMin
                      : undefined;
                  const max =
                    typeof rawMax === 'number' && Number.isFinite(rawMax)
                      ? rawMax
                      : undefined;

                  let next: { min?: number; max?: number } = {};
                  if (
                    typeof min === 'number' &&
                    typeof max === 'number' &&
                    min > max
                  ) {
                    next = { min: max, max: min };
                  } else {
                    if (typeof min === 'number') next.min = min;
                    if (typeof max === 'number') next.max = max;
                  }
                  setMetricRanges((prev) => ({ ...prev, [field]: next }));

                  if (draft.order) {
                    setSortState({ field, order: draft.order });
                  } else if (sortState.field === field) {
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
      };
    };

    return [
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
      ...metrics.map((m) => buildMetricColumn(m.field, m.title, m.width)),
    ];
  }, [
    metricAvailableRanges,
    metricDrafts,
    metricDropdownOffsetX,
    metricRanges,
    metrics,
    sortState,
  ]);

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
