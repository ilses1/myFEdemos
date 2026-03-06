import { ExportOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.less';

type FundItem = {
  name: string;
  code: string;
  scaleYi: number;
};

type IndustryGroup = {
  industryLabel: string;
  exposureWeight: number;
  indexCode: string;
  funds: FundItem[];
};

type TableRow = {
  key: string;
  industryLabel: string;
  exposureWeight: number;
  indexCode: string;
  fundName: string;
  fundCode: string;
  fundScaleYi: number;
};

type FilterFormValues = {
  industryKeyword: string;
  fundKeyword: string;
  topN: number;
};

const SOURCE_NOTE =
  '数据来源:Wind，截至2025-11-18，数据根据ETF基金跟踪指数成分股统计汇总。';

const MOCK_GROUPS: IndustryGroup[] = [
  {
    industryLabel: '有色金属(申万801050.SI)',
    exposureWeight: 95.861,
    indexCode: '000811.CSI',
    funds: [
      { name: '有色金属ETF基金', code: '516650.SH', scaleYi: 719.72 },
      { name: '黄金股ETF', code: '516650.SH', scaleYi: 719.72 },
      { name: '现金流500ETF', code: '516650.SH', scaleYi: 719.72 },
    ],
  },
  {
    industryLabel: '有色金属(申万801050.SI)',
    exposureWeight: 65.031,
    indexCode: '000811.CSI',
    funds: [
      { name: '有色金属ETF基金', code: '516650.SH', scaleYi: 719.72 },
      { name: '黄金股ETF', code: '516650.SH', scaleYi: 719.72 },
      { name: '现金流500ETF', code: '516650.SH', scaleYi: 719.72 },
    ],
  },
  {
    industryLabel: '魔法',
    exposureWeight: 18.054,
    indexCode: '000811.CSI',
    funds: [
      { name: '有色金属ETF基金', code: '516650.SH', scaleYi: 719.72 },
      { name: '现金流500ETF', code: '516650.SH', scaleYi: 719.72 },
    ],
  },
  {
    industryLabel: '魔法',
    exposureWeight: 18.054,
    indexCode: '000811.CSI',
    funds: [{ name: '现金流500ETF', code: '516650.SH', scaleYi: 719.72 }],
  },
];

const TOP_N_OPTIONS = Array.from({ length: 10 }, (_, i) => ({
  value: i + 1,
  label: i + 1,
}));

const getWeightOpacity = (weight: number) => {
  const safe = Number.isFinite(weight) ? weight : 0;
  const clamped = Math.min(100, Math.max(0, safe));
  if (clamped <= 10) return 0.1;
  return Math.min(1, Math.ceil(clamped / 10) / 10);
};

const buildTableRows = (groups: IndustryGroup[]): TableRow[] => {
  return groups.flatMap((group, groupIdx) =>
    group.funds.map((fund, idx) => ({
      key: `${groupIdx}-${group.indexCode}-${fund.code}-${idx}`,
      industryLabel: group.industryLabel,
      exposureWeight: group.exposureWeight,
      indexCode: group.indexCode,
      fundName: fund.name,
      fundCode: fund.code,
      fundScaleYi: fund.scaleYi,
    })),
  );
};

const IndustryPage: React.FC = () => {
  const [form] = Form.useForm<FilterFormValues>();

  const [industryKeyword, setIndustryKeyword] = useState('');
  const [fundKeyword, setFundKeyword] = useState('');
  const [topN, setTopN] = useState<number>(1);

  const pageSize = 5;
  const [page, setPage] = useState(1);

  const filteredGroups = useMemo(() => {
    const prepared = MOCK_GROUPS.filter((g) => {
      const kw = industryKeyword.trim();
      if (!kw) return true;
      return g.industryLabel.includes(kw) || g.indexCode.includes(kw);
    }).map((g) => {
      const kw = fundKeyword.trim();
      const funds = kw
        ? g.funds.filter((f) => f.name.includes(kw) || f.code.includes(kw))
        : g.funds;

      const sortedFunds = [...funds].sort((a, b) => b.scaleYi - a.scaleYi);

      return { ...g, funds: sortedFunds };
    });

    const topCount = Math.max(1, topN || 1);
    return prepared
      .filter((g) => g.funds.length > 0)
      .sort((a, b) => b.exposureWeight - a.exposureWeight)
      .slice(0, topCount);
  }, [fundKeyword, industryKeyword, topN]);

  const allRows = useMemo(
    () => buildTableRows(filteredGroups),
    [filteredGroups],
  );

  const total = allRows.length;

  const currentPageRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return allRows.slice(start, start + pageSize);
  }, [allRows, page, pageSize]);

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(total / pageSize));
    if (page > maxPage) setPage(maxPage);
  }, [page, pageSize, total]);

  const getRowSpanForIndustry = (index: number) => {
    const row = currentPageRows[index];
    if (!row) return 1;

    const groupKey = `${row.industryLabel}__${row.indexCode}`;
    const prev = currentPageRows[index - 1];
    if (prev && `${prev.industryLabel}__${prev.indexCode}` === groupKey)
      return 0;

    let span = 1;
    for (let i = index + 1; i < currentPageRows.length; i += 1) {
      const next = currentPageRows[i];
      if (`${next.industryLabel}__${next.indexCode}` !== groupKey) break;
      span += 1;
    }
    return span;
  };

  const columns: ColumnsType<TableRow> = useMemo(
    () => [
      {
        title: '主题名称',
        dataIndex: 'industryLabel',
        key: 'industryLabel',
        width: 260,
        render: (text, _record, index) => ({
          children: <span className={styles.industryText}>{text}</span>,
          props: { rowSpan: getRowSpanForIndustry(index) },
        }),
      },
      {
        title: (
          <div>
            暴露权重
            <Tooltip title="查询ETF基金跟踪指数与对应行业/主题指数重合的成分股，对上述重合个股在基金跟踪指数中的权重求和。">
              <InfoCircleOutlined />
            </Tooltip>
          </div>
        ),
        dataIndex: 'exposureWeight',
        key: 'exposureWeight',
        sorter: (a, b) => b.exposureWeight - a.exposureWeight,
        width: 120,
        render: (value: number, _record, index) => ({
          children: (
            <span
              className={styles.weightBadge}
              style={{
                backgroundColor: `rgba(234, 134, 139, ${getWeightOpacity(
                  value,
                )})`,
              }}
            >
              {value.toFixed(3)}
            </span>
          ),
          props: { rowSpan: getRowSpanForIndustry(index) },
        }),
      },
      {
        title: '基金跟踪指数代码',
        dataIndex: 'indexCode',
        key: 'indexCode',
        width: 160,
        render: (text, _record, index) => ({
          children: <span className={styles.indexCodeText}>{text}</span>,
          props: { rowSpan: getRowSpanForIndustry(index) },
        }),
      },
      {
        title: '基金简称',
        dataIndex: 'fundName',
        key: 'fundName',
        width: 240,
        render: (text) => <span className={styles.linkText}>{text}</span>,
      },
      {
        title: '基金代码',
        dataIndex: 'fundCode',
        key: 'fundCode',
        width: 140,
        render: (text) => <span className={styles.linkText}>{text}</span>,
      },
      {
        title: '基金规模',
        dataIndex: 'fundScaleYi',
        key: 'fundScaleYi',
        align: 'right',
        width: 140,
        render: (value: number) => (
          <span className={styles.linkText}>{value.toFixed(2)}亿</span>
        ),
      },
    ],
    [currentPageRows],
  );

  return (
    <div className={styles.page}>
      <Form<FilterFormValues>
        form={form}
        initialValues={{ industryKeyword: '', fundKeyword: '', topN: 1 }}
        className={styles.filters}
        onFinish={(values) => {
          setIndustryKeyword(values.industryKeyword || '');
          setFundKeyword(values.fundKeyword || '');
          setTopN(values.topN || 1);
          setPage(1);
        }}
      >
        <div className={styles.filterItem}>
          <div className={styles.filterLabel}>主题名称</div>
          <Form.Item name="industryKeyword" noStyle>
            <Input
              placeholder="请输入主题名称"
              allowClear
              className={styles.filterInput}
            />
          </Form.Item>
        </div>

        <div className={styles.filterItem}>
          <div className={styles.filterLabel}>基金简称/代码</div>
          <Form.Item name="fundKeyword" noStyle>
            <Input
              placeholder="请输入基金简称/代码"
              allowClear
              className={styles.filterInput}
            />
          </Form.Item>
        </div>

        <div className={styles.filterItem}>
          <div className={styles.filterLabel}>暴露权重</div>
          <div className={styles.topNWrapper}>
            <span className={styles.topNText}>前</span>
            <Form.Item name="topN" noStyle>
              <Select<number>
                options={TOP_N_OPTIONS}
                className={styles.topNInput}
              />
            </Form.Item>
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            danger
            className={styles.resetBtn}
            onClick={() => {
              form.resetFields();
              setIndustryKeyword('');
              setFundKeyword('');
              setTopN(1);
              setPage(1);
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
          <div className={styles.titleBlock}>
            <div className={styles.title}>主题</div>
          </div>
          <Button danger className={styles.exportBtn}>
            导出数据
            <ExportOutlined />
          </Button>
        </div>

        <Table<TableRow>
          className={styles.industryTable}
          rowKey="key"
          columns={columns}
          dataSource={allRows}
          pagination={{
            current: page,
            pageSize,
            total,
            showSizeChanger: false,
            showQuickJumper: false,
            onChange: (p) => setPage(p),
            showTotal: (t) => `总共 ${t} 个项目`,
            className: styles.pagination,
          }}
          tableLayout="fixed"
          scroll={{ x: 'max-content' }}
        />

        <div className={styles.footerNote}>{SOURCE_NOTE}</div>
      </div>
    </div>
  );
};

export default IndustryPage;
