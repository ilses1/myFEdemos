import { ExportOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Table, Tooltip } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
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
  funds: FundItem[];
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

const TOP_N_OPTIONS = [
  { value: 0, label: '全部' },
  ...Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: i + 1,
  })),
];

const getWeightOpacity = (weight: number) => {
  const safe = Number.isFinite(weight) ? weight : 0;
  const clamped = Math.min(100, Math.max(0, safe));
  if (clamped <= 10) return 0.1;
  return Math.min(1, Math.ceil(clamped / 10) / 10);
};

const IndustryPage: React.FC = () => {
  const [form] = Form.useForm<FilterFormValues>();

  const [industryKeyword, setIndustryKeyword] = useState('');
  const [fundKeyword, setFundKeyword] = useState('');
  const [topN, setTopN] = useState<number>(0);
  const [weightSortOrder, setWeightSortOrder] = useState<
    'ascend' | 'descend' | undefined
  >('descend');

  const pageSize = 5;
  const [page, setPage] = useState(1);

  const sortIcon = ({ sortOrder }: { sortOrder?: 'ascend' | 'descend' }) => (
    <span className={styles.sorterIcon} data-order={sortOrder ?? 'none'}>
      <span className={styles.sorterUp} />
      <span className={styles.sorterDown} />
    </span>
  );

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

    return prepared
      .filter((g) => g.funds.length > 0)
      .sort((a, b) =>
        weightSortOrder === 'ascend'
          ? a.exposureWeight - b.exposureWeight
          : b.exposureWeight - a.exposureWeight,
      )
      .slice(0, topN > 0 ? topN : prepared.length);
  }, [fundKeyword, industryKeyword, topN, weightSortOrder]);

  const allRows = useMemo<TableRow[]>(
    () =>
      filteredGroups.map((g) => ({
        key: `${g.industryLabel}__${g.indexCode}__${g.exposureWeight}`,
        industryLabel: g.industryLabel,
        exposureWeight: g.exposureWeight,
        indexCode: g.indexCode,
        funds: g.funds,
      })),
    [filteredGroups],
  );

  const total = allRows.length;

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(total / pageSize));
    if (page > maxPage) setPage(maxPage);
  }, [page, pageSize, total]);

  const columns: ColumnsType<TableRow> = useMemo(
    () => [
      {
        title: '申万1级行业指数简称',
        dataIndex: 'industryLabel',
        key: 'industryLabel',
        width: 260,
        render: (text) => <span className={styles.industryText}>{text}</span>,
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
        className: 'noColDividerAfter',
        sorter: true,
        sortIcon,
        width: 120,
        render: (value: number) => (
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
      },
      {
        title: '基金跟踪指数代码',
        dataIndex: 'indexCode',
        key: 'indexCode',
        className: 'noColDividerAfter',
        width: 160,
        render: (text) => <span className={styles.indexCodeText}>{text}</span>,
      },
      {
        title: '基金简称',
        dataIndex: 'funds',
        key: 'funds',
        width: 240,
        align: 'center',
        render: (funds: FundItem[]) => ({
          children: (
            <div className={styles.fundArea}>
              <div className={styles.fundAreaScroller}>
                {funds.map((fund, idx) => (
                  <div className={styles.fundRow} key={`${fund.code}-${idx}`}>
                    <div className={styles.fundName}>
                      <span className={styles.linkText}>{fund.name}</span>
                    </div>
                    <div className={styles.fundCode}>
                      <span className={styles.linkText}>{fund.code}</span>
                    </div>
                    <div className={styles.fundScale}>
                      <span className={styles.linkText}>
                        {fund.scaleYi.toFixed(2)}亿
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
          props: { colSpan: 3, className: styles.fundAreaCell },
        }),
      },
      {
        title: '基金代码',
        key: 'fundCode',
        align: 'center',
        width: 140,
        render: () => ({ children: null, props: { colSpan: 0 } }),
      },
      {
        title: '基金规模',
        key: 'fundScaleYi',
        align: 'center',
        width: 140,
        render: () => ({ children: null, props: { colSpan: 0 } }),
      },
    ],
    [sortIcon, weightSortOrder],
  );

  const handleTableChange: TableProps<TableRow>['onChange'] = (
    pagination,
    _filters,
    sorter,
    extra,
  ) => {
    if (extra.action === 'paginate') {
      setPage(pagination.current ?? 1);
      return;
    }

    if (extra.action === 'sort') {
      const nextOrder = Array.isArray(sorter) ? sorter[0]?.order : sorter.order;
      setWeightSortOrder((nextOrder ?? 'descend') as 'ascend' | 'descend');
      setPage(1);
    }
  };

  return (
    <div className={styles.page}>
      <Form<FilterFormValues>
        form={form}
        initialValues={{ industryKeyword: '', fundKeyword: '', topN: 0 }}
        className={styles.filters}
        onFinish={(values) => {
          setIndustryKeyword(values.industryKeyword || '');
          setFundKeyword(values.fundKeyword || '');
          setTopN(values.topN ?? 0);
          setPage(1);
        }}
      >
        <div className={styles.filterItem}>
          <div className={styles.filterLabel}>行业指数简称/代码</div>
          <Form.Item name="industryKeyword" noStyle>
            <Input
              placeholder="请输入简称或代码"
              allowClear
              className={styles.filterInput}
            />
          </Form.Item>
        </div>

        <div className={styles.filterItem}>
          <div className={styles.filterLabel}>基金简称/代码</div>
          <Form.Item name="fundKeyword" noStyle>
            <Input
              placeholder="请输入简称或代码"
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
            className={styles.resetBtn}
            onClick={() => {
              form.resetFields();
              setIndustryKeyword('');
              setFundKeyword('');
              setTopN(0);
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
            <div className={styles.title}>行业</div>
            <div className={styles.subtitle}>
              查询申万行业占比最高的ETF及跟踪指数
            </div>
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
          onChange={handleTableChange}
          pagination={{
            current: page,
            pageSize,
            total,
            showSizeChanger: false,
            showQuickJumper: false,
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
