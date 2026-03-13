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

type IndexExposure = {
  exposureWeight: number;
  indexCode: string;
  funds: FundItem[];
};

type IndustryGroup = {
  industryLabel: string;
  indices: IndexExposure[];
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
    indices: [
      {
        exposureWeight: 95.861,
        indexCode: '000811.CSI',
        funds: [
          { name: '有色金属ETF基金', code: '516650.SH', scaleYi: 719.72 },
          { name: '黄金股ETF', code: '159937.SZ', scaleYi: 719.72 },
          { name: '现金流500ETF', code: '563210.SH', scaleYi: 719.72 },
          { name: '500ETF', code: '510500.SH', scaleYi: 719.72 },
        ],
      },
      {
        exposureWeight: 65.031,
        indexCode: '930705.CSI',
        funds: [
          { name: '有色金属ETF基金', code: '516650.SH', scaleYi: 719.72 },
          { name: '黄金股ETF', code: '159937.SZ', scaleYi: 719.72 },
          { name: '现金流500ETF', code: '563210.SH', scaleYi: 719.72 },
        ],
      },
    ],
  },
  {
    industryLabel: '魔法',
    indices: [
      {
        exposureWeight: 18.054,
        indexCode: '000811.CSI',
        funds: [
          { name: '有色金属ETF基金', code: '516650.SH', scaleYi: 719.72 },
          { name: '现金流500ETF', code: '563210.SH', scaleYi: 719.72 },
        ],
      },
      {
        exposureWeight: 12.6,
        indexCode: '931477.CSI',
        funds: [{ name: '现金流500ETF', code: '563210.SH', scaleYi: 719.72 }],
      },
    ],
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

const getIndustryMaxExposureWeight = (industry: IndustryGroup) =>
  industry.indices.reduce((max, item) => Math.max(max, item.exposureWeight), 0);

const IndustryPage: React.FC = () => {
  const [form] = Form.useForm<FilterFormValues>();

  const [industryKeyword, setIndustryKeyword] = useState('');
  const [fundKeyword, setFundKeyword] = useState('');
  const [topN, setTopN] = useState<number>(0);
  const [fundScrollbarWidth, setFundScrollbarWidth] = useState(0);
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

  const filteredIndustries = useMemo(() => {
    const industryKw = industryKeyword.trim();
    const fundKw = fundKeyword.trim();

    const prepared = MOCK_GROUPS.map((industry) => {
      const isLabelMatched = industryKw
        ? industry.industryLabel.includes(industryKw)
        : true;

      const indices = industry.indices
        .filter((item) => {
          if (!industryKw) return true;
          if (isLabelMatched) return true;
          return item.indexCode.includes(industryKw);
        })
        .map((item) => {
          const funds = fundKw
            ? item.funds.filter(
                (f) => f.name.includes(fundKw) || f.code.includes(fundKw),
              )
            : item.funds;

          const sortedFunds = [...funds].sort((a, b) => b.scaleYi - a.scaleYi);
          return { ...item, funds: sortedFunds };
        })
        .filter((item) => item.funds.length > 0)
        .sort((a, b) => b.exposureWeight - a.exposureWeight);

      return { ...industry, indices };
    }).filter((industry) => industry.indices.length > 0);

    const sorted = [...prepared].sort((a, b) => {
      const aMax = getIndustryMaxExposureWeight(a);
      const bMax = getIndustryMaxExposureWeight(b);
      return weightSortOrder === 'ascend' ? aMax - bMax : bMax - aMax;
    });

    return topN > 0 ? sorted.slice(0, topN) : sorted;
  }, [fundKeyword, industryKeyword, topN, weightSortOrder]);

  const allRows = useMemo<TableRow[]>(
    () =>
      filteredIndustries.flatMap((industry) =>
        industry.indices.map((item, idx) => ({
          key: `${industry.industryLabel}__${item.indexCode}__${item.exposureWeight}__${idx}`,
          industryLabel: industry.industryLabel,
          exposureWeight: item.exposureWeight,
          indexCode: item.indexCode,
          funds: item.funds,
        })),
      ),
    [filteredIndustries],
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

    const prev = currentPageRows[index - 1];
    if (prev && prev.industryLabel === row.industryLabel) return 0;

    let span = 1;
    for (let i = index + 1; i < currentPageRows.length; i += 1) {
      const next = currentPageRows[i];
      if (next.industryLabel !== row.industryLabel) break;
      span += 1;
    }
    return span;
  };

  // 计算基金跟踪指数基金列表区域的滚动条宽度
  useEffect(() => {
    const el = document.createElement('div');
    el.className = styles.fundAreaScroller;
    el.style.position = 'absolute';
    el.style.top = '-9999px';
    el.style.left = '0';
    el.style.width = '100px';
    el.style.height = '100px';
    el.style.overflowY = 'scroll';
    el.style.overflowX = 'hidden';
    el.style.paddingRight = '0px';
    document.body.appendChild(el);
    const sbw = Math.max(0, el.offsetWidth - el.clientWidth);
    document.body.removeChild(el);
    setFundScrollbarWidth(sbw);
  }, []);

  const columns: ColumnsType<TableRow> = useMemo(
    () => [
      {
        title: '申万1级行业指数简称',
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
        width: 160,
        render: (text) => <span className={styles.indexCodeText}>{text}</span>,
      },
      {
        title: (
          <div
            className={styles.fundHeader}
            style={
              {
                ['--fund-scrollbar-width' as any]: `${fundScrollbarWidth}px`,
              } as React.CSSProperties
            }
          >
            <div className={styles.fundHeaderInner}>
              <div className={styles.fundHeaderName}>基金简称</div>
              <div className={styles.fundHeaderCode}>基金代码</div>
              <div className={styles.fundHeaderScale}>基金规模</div>
            </div>
          </div>
        ),
        dataIndex: 'funds',
        key: 'funds',
        width: 520,
        align: 'center',
        onHeaderCell: () => ({ className: styles.fundHeaderCell }),
        onCell: () => ({ className: styles.fundAreaCell }),
        render: (funds: FundItem[]) => (
          <div
            className={styles.fundArea}
            style={
              {
                ['--fund-scrollbar-width' as any]: `${fundScrollbarWidth}px`,
              } as React.CSSProperties
            }
          >
            <div
              className={`${styles.fundAreaScroller} ${
                funds.length <= 3 ? styles.fundAreaScrollerNoScroll : ''
              }`}
            >
              <div className={styles.fundAreaInner}>
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
          </div>
        ),
      },
    ],
    [currentPageRows, fundScrollbarWidth, sortIcon],
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
