import { DownloadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Grid,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  Tooltip,
  Typography,
  message,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import styles from './index.less';

type FormValues = {
  enableEtfSearch: boolean;
  etfSearch: string;

  enableCategoryTrack: boolean;
  category: string;
  track: string;

  enableLatestScaleGt: boolean;
  latestScaleGt: number;

  enableScaleRankTop: boolean;
  scaleRankTop: number;

  enableDailyAvgAmountGt: boolean;
  dailyAvgAmountGt: number;

  enableTradeRankTop: boolean;
  tradeRankTop: number;

  lead: boolean;
  margin: boolean;
  lowFee: boolean;
  top20: boolean;
  featured: boolean;
};

const INITIAL_VALUES: FormValues = {
  enableEtfSearch: false,
  etfSearch: '',

  enableCategoryTrack: false,
  category: 'all',
  track: 'all',

  enableLatestScaleGt: false,
  latestScaleGt: 0.0,

  enableScaleRankTop: false,
  scaleRankTop: 1,

  enableDailyAvgAmountGt: false,
  dailyAvgAmountGt: 0.0,

  enableTradeRankTop: false,
  tradeRankTop: 1,

  lead: false,
  margin: false,
  lowFee: false,
  top20: false,
  featured: false,
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  lineHeight: '22px',
  color: 'rgba(0, 0, 0, 0.88)',
  whiteSpace: 'nowrap',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  columnGap: 22,
  rowGap: 10,
};

const itemWrapStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
};

type HighlightKey = 'lead' | 'margin' | 'lowFee' | 'top20' | 'featured';

type EtfRecord = {
  id: string;
  category: string;
  track: string;
  name: string;
  code: string;
  highlights: HighlightKey[];
  latestScale: number;
  dailyAvgAmount: number;
  linkedCodes: string[];
  desc: string;
};

const highlightLabelMap: Record<HighlightKey, string> = {
  lead: '领先',
  margin: '两融',
  lowFee: '最低',
  top20: '±20%',
  featured: '特色',
};

const highlightClassMap: Record<HighlightKey, string> = {
  lead: styles.leadTag,
  margin: styles.marginTag,
  lowFee: styles.lowFeeTag,
  top20: styles.top20Tag,
  featured: styles.featureTag,
};

const MOCK_DATA: EtfRecord[] = Array.from({ length: 35 }).map((_, i) => {
  const mod = i % 10;
  const highlights: HighlightKey[] =
    mod === 0
      ? ['featured', 'margin']
      : mod === 1
      ? ['lowFee', 'top20']
      : mod === 2
      ? ['lead', 'margin']
      : mod === 3
      ? ['lead']
      : mod === 4
      ? ['margin']
      : mod === 5
      ? ['featured']
      : mod === 6
      ? ['top20']
      : mod === 7
      ? ['lowFee']
      : ['lead', 'featured'];
  return {
    id: String(i + 1),
    category: '宽基',
    track: '科创板',
    name: '科创50ETF',
    code: '588000',
    highlights,
    latestScale: 677.76,
    dailyAvgAmount: 677.76,
    linkedCodes: ['022945', '011612', '011613'],
    desc: '文本占位文本占位文本占位文本占位文本占位文本占位…',
  };
});

const MultiFilterPage: React.FC = () => {
  const [form] = Form.useForm<FormValues>();
  const screens = Grid.useBreakpoint();
  const [activeView, setActiveView] = React.useState<'card' | 'list'>('list');

  const handleFinish = (values: FormValues) => {
    const filters: Record<string, unknown> = {};

    if (values.enableEtfSearch && values.etfSearch.trim())
      filters.etfSearch = values.etfSearch.trim();
    if (values.enableCategoryTrack) {
      filters.category = values.category;
      filters.track = values.track;
    }
    if (values.enableLatestScaleGt)
      filters.latestScaleGt = values.latestScaleGt;
    if (values.enableScaleRankTop) filters.scaleRankTop = values.scaleRankTop;
    if (values.enableDailyAvgAmountGt)
      filters.dailyAvgAmountGt = values.dailyAvgAmountGt;
    if (values.enableTradeRankTop) filters.tradeRankTop = values.tradeRankTop;

    if (values.lead) filters.lead = true;
    if (values.margin) filters.margin = true;
    if (values.lowFee) filters.lowFee = true;
    if (values.top20) filters.top20 = true;
    if (values.featured) filters.featured = true;
    console.log({ ...filters });

    message.success('已提交筛选条件');
  };

  const handleReset = () => {
    form.setFieldsValue(INITIAL_VALUES);
  };

  const handleExport = () => {
    message.success('已导出数据');
  };

  const columns: ColumnsType<EtfRecord> = [
    {
      title: '类型',
      dataIndex: 'category',
      key: 'category',
      width: 80,
    },
    {
      title: '赛道',
      dataIndex: 'track',
      key: 'track',
      width: 90,
    },
    {
      title: '简称',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      render: (text: string) => (
        <Typography.Link className={styles.linkText}>{text}</Typography.Link>
      ),
    },
    {
      title: '代码',
      dataIndex: 'code',
      key: 'code',
      width: 90,
      render: (text: string) => (
        <Typography.Link className={styles.linkText}>{text}</Typography.Link>
      ),
    },
    {
      title: '产品亮点',
      dataIndex: 'highlights',
      key: 'highlights',
      width: 160,
      render: (keys: HighlightKey[]) => (
        <Space size={6} wrap>
          {keys.map((k) => (
            <span key={k} className={highlightClassMap[k]}>
              {highlightLabelMap[k]}
            </span>
          ))}
        </Space>
      ),
    },
    {
      title: '最新规模（亿元）',
      dataIndex: 'latestScale',
      key: 'latestScale',
      width: 140,
      align: 'right',
      sorter: (a, b) => a.latestScale - b.latestScale,
      render: (v: number) => v.toFixed(2),
    },
    {
      title: '月日均成交金额（万元）',
      dataIndex: 'dailyAvgAmount',
      key: 'dailyAvgAmount',
      width: 180,
      align: 'right',
      sorter: (a, b) => a.dailyAvgAmount - b.dailyAvgAmount,
      render: (v: number) => v.toFixed(2),
    },
    {
      title: '联接基金代码',
      dataIndex: 'linkedCodes',
      key: 'linkedCodes',
      width: 170,
      render: (codes: string[]) => (
        <Space size={10} wrap>
          {codes.map((c) => (
            <Typography.Link key={c} className={styles.codeLink}>
              {c}
            </Typography.Link>
          ))}
        </Space>
      ),
    },
    {
      title: '说明',
      dataIndex: 'desc',
      key: 'desc',
      render: (text: string) => (
        <Tooltip title={text}>
          <Typography.Text className={styles.descText} ellipsis>
            {text}
          </Typography.Text>
        </Tooltip>
      ),
    },
  ];

  const cardCols = screens.xl ? 6 : screens.lg ? 8 : screens.md ? 12 : 24;

  return (
    <PageContainer ghost>
      <div
        style={{
          padding: 20,
          backgroundColor: '#fff',
        }}
      >
        <Form<FormValues>
          form={form}
          initialValues={INITIAL_VALUES}
          onFinish={handleFinish}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={rowStyle}>
              <div style={itemWrapStyle}>
                <Form.Item
                  name="enableEtfSearch"
                  valuePropName="checked"
                  noStyle
                >
                  <Checkbox />
                </Form.Item>
                <Typography.Text style={labelStyle}>ETF搜索</Typography.Text>
                <Form.Item name="etfSearch" style={{ margin: 0 }}>
                  <Input
                    allowClear
                    placeholder="请输入基金名称或代码检索"
                    style={{ width: 280 }}
                  />
                </Form.Item>
              </div>
            </div>

            <div style={rowStyle}>
              <div style={itemWrapStyle}>
                <Form.Item
                  name="enableCategoryTrack"
                  valuePropName="checked"
                  noStyle
                >
                  <Checkbox />
                </Form.Item>
                <Typography.Text style={labelStyle}>类型/赛道</Typography.Text>
                <Space size={8}>
                  <Form.Item name="category" style={{ margin: 0 }}>
                    <Select
                      style={{ width: 120 }}
                      options={[
                        { label: '全部类型', value: 'all' },
                        { label: '股票型', value: 'stock' },
                        { label: '债券型', value: 'bond' },
                        { label: '商品型', value: 'commodity' },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item name="track" style={{ margin: 0 }}>
                    <Select
                      style={{ width: 120 }}
                      options={[
                        { label: '全部赛道', value: 'all' },
                        { label: '宽基', value: 'broad' },
                        { label: '行业', value: 'industry' },
                        { label: '主题', value: 'theme' },
                      ]}
                    />
                  </Form.Item>
                </Space>
              </div>

              <div style={itemWrapStyle}>
                <Form.Item
                  name="enableLatestScaleGt"
                  valuePropName="checked"
                  noStyle
                >
                  <Checkbox />
                </Form.Item>
                <Typography.Text style={labelStyle}>
                  最新规模 &gt;
                </Typography.Text>
                <Form.Item name="latestScaleGt" style={{ margin: 0 }}>
                  <InputNumber
                    min={0}
                    precision={1}
                    step={0.1}
                    controls={false}
                    formatter={(val) => {
                      if (val === null || val === undefined || val === '')
                        return '';
                      const n = typeof val === 'number' ? val : Number(val);
                      if (Number.isNaN(n)) return '';
                      return n.toFixed(1);
                    }}
                    parser={(val) => {
                      const s = (val ?? '').toString().replace(/[^\d.-]/g, '');
                      const n = Number(s);
                      if (Number.isNaN(n)) return 0;
                      return n;
                    }}
                    style={{ width: 84 }}
                  />
                </Form.Item>
                <Typography.Text
                  style={{ ...labelStyle, color: 'rgba(0, 0, 0, 0.45)' }}
                >
                  亿
                </Typography.Text>
                <Tooltip title="截至上一日，ETF基金规模(不含联接基金)，单位亿元">
                  <InfoCircleOutlined />
                </Tooltip>
              </div>

              <div style={itemWrapStyle}>
                <Form.Item
                  name="enableScaleRankTop"
                  valuePropName="checked"
                  noStyle
                >
                  <Checkbox />
                </Form.Item>
                <Typography.Text style={labelStyle}>规模排名</Typography.Text>
                <Typography.Text style={labelStyle}>前</Typography.Text>
                <Form.Item name="scaleRankTop" style={{ margin: 0 }}>
                  <Select
                    style={{ width: 72 }}
                    options={[1, 3, 5, 10, 20, 50, 100].map((n) => ({
                      label: String(n),
                      value: n,
                    }))}
                  />
                </Form.Item>
              </div>

              <div style={itemWrapStyle}>
                <Form.Item
                  name="enableDailyAvgAmountGt"
                  valuePropName="checked"
                  noStyle
                >
                  <Checkbox />
                </Form.Item>
                <Typography.Text style={labelStyle}>
                  月日均成交金额 &gt;
                </Typography.Text>
                <Form.Item name="dailyAvgAmountGt" style={{ margin: 0 }}>
                  <InputNumber
                    min={0}
                    precision={1}
                    step={0.1}
                    controls={false}
                    formatter={(val) => {
                      if (val === null || val === undefined || val === '')
                        return '';
                      const n = typeof val === 'number' ? val : Number(val);
                      if (Number.isNaN(n)) return '';
                      return n.toFixed(1);
                    }}
                    parser={(val) => {
                      const s = (val ?? '').toString().replace(/[^\d.-]/g, '');
                      const n = Number(s);
                      if (Number.isNaN(n)) return 0;
                      return n;
                    }}
                    style={{ width: 84 }}
                  />
                </Form.Item>
                <Typography.Text
                  style={{ ...labelStyle, color: 'rgba(0, 0, 0, 0.45)' }}
                >
                  万
                </Typography.Text>
                <Tooltip title="截至上一日，ETF基金规模(不含联接基金)，单位亿元">
                  <InfoCircleOutlined />
                </Tooltip>
              </div>

              <div style={itemWrapStyle}>
                <Form.Item
                  name="enableTradeRankTop"
                  valuePropName="checked"
                  noStyle
                >
                  <Checkbox />
                </Form.Item>
                <Typography.Text style={labelStyle}>成交排名</Typography.Text>
                <Typography.Text style={labelStyle}>前</Typography.Text>
                <Form.Item name="tradeRankTop" style={{ margin: 0 }}>
                  <Select
                    style={{ width: 72 }}
                    options={[1, 3, 5, 10, 20, 50, 100].map((n) => ({
                      label: String(n),
                      value: n,
                    }))}
                  />
                </Form.Item>
              </div>
            </div>

            <div style={{ ...rowStyle, columnGap: 14 }}>
              <div
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <Form.Item name="lead" valuePropName="checked" noStyle>
                  <Checkbox />
                </Form.Item>
                <div className={styles.leadTag}>领先</div>
                <Typography.Text
                  style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.65)' }}
                >
                  规模或流动性领先
                </Typography.Text>
                <Tooltip title="截至上一日，ETF基金规模(不含联接基金)，单位亿元">
                  <InfoCircleOutlined />
                </Tooltip>
              </div>

              <div
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <Form.Item name="margin" valuePropName="checked" noStyle>
                  <Checkbox />
                </Form.Item>
                <div className={styles.marginTag}>两融</div>
                <Typography.Text
                  style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.65)' }}
                >
                  是否两融标的
                </Typography.Text>
              </div>

              <div
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <Form.Item name="lowFee" valuePropName="checked" noStyle>
                  <Checkbox />
                </Form.Item>
                <div className={styles.lowFeeTag}>最低</div>
                <Typography.Text
                  style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.65)' }}
                >
                  费率低于阈值：管理费0.15%
                </Typography.Text>
              </div>

              <div
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <Form.Item name="top20" valuePropName="checked" noStyle>
                  <Checkbox />
                </Form.Item>
                <div className={styles.top20Tag}>±20%</div>
                <Typography.Text
                  style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.65)' }}
                >
                  涨跌幅位居前20%
                </Typography.Text>
              </div>

              <div
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <Form.Item name="featured" valuePropName="checked" noStyle>
                  <Checkbox />
                </Form.Item>
                <div className={styles.featureTag}>特色</div>
                <Typography.Text
                  style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.65)' }}
                >
                  指数唯一挂钩ETF
                </Typography.Text>
              </div>

              <div
                style={{
                  marginLeft: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <Button onClick={handleReset}>重置</Button>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
              </div>
            </div>
          </div>
        </Form>

        <div className={styles.resultSection}>
          <div className={styles.resultHeader}>
            <div className={styles.titleTabs}>
              <Typography.Text className={styles.resultTitle}>
                ETF产品
              </Typography.Text>
              <Tabs
                className={styles.viewTabs}
                activeKey={activeView}
                onChange={(k) => setActiveView(k as 'card' | 'list')}
                items={[
                  { key: 'card', label: '卡片' },
                  { key: 'list', label: '列表' },
                ]}
              />
            </div>
            <Button
              className={styles.exportBtn}
              icon={<DownloadOutlined />}
              onClick={handleExport}
            >
              导出数据
            </Button>
          </div>

          {activeView === 'list' ? (
            <div className={styles.tableWrap}>
              <Table<EtfRecord>
                className={styles.resultTable}
                rowKey="id"
                columns={columns}
                dataSource={MOCK_DATA}
                size="middle"
                pagination={{
                  total: MOCK_DATA.length,
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  pageSizeOptions: [10, 20, 50, 100],
                  showTotal: (total, range) =>
                    `第${range[0]}-${range[1]}条 / 共${total}条`,
                }}
                rowClassName={(_, index) =>
                  index % 2 === 1 ? styles.rowAlt : ''
                }
                scroll={{ x: 1180 }}
              />
            </div>
          ) : (
            <Row gutter={[12, 12]} className={styles.cardGrid}>
              {MOCK_DATA.map((item) => (
                <Col key={item.id} span={cardCols}>
                  <Card className={styles.etfCard} bordered>
                    <div className={styles.cardHeader}>
                      <Typography.Link className={styles.cardName}>
                        {item.name}
                      </Typography.Link>
                      <Typography.Link className={styles.cardCode}>
                        {item.code}
                      </Typography.Link>
                    </div>
                    <div className={styles.cardHighlights}>
                      <Space size={6} wrap>
                        {item.highlights.map((k) => (
                          <span key={k} className={highlightClassMap[k]}>
                            {highlightLabelMap[k]}
                          </span>
                        ))}
                      </Space>
                    </div>
                    <div className={styles.cardMeta}>
                      <div className={styles.metaItem}>
                        <Typography.Text className={styles.metaLabel}>
                          最新规模
                        </Typography.Text>
                        <Typography.Text className={styles.metaValue}>
                          {item.latestScale.toFixed(2)}
                        </Typography.Text>
                        <Typography.Text className={styles.metaUnit}>
                          亿
                        </Typography.Text>
                      </div>
                      <div className={styles.metaItem}>
                        <Typography.Text className={styles.metaLabel}>
                          月日均成交金额
                        </Typography.Text>
                        <Typography.Text className={styles.metaValue}>
                          {item.dailyAvgAmount.toFixed(2)}
                        </Typography.Text>
                        <Typography.Text className={styles.metaUnit}>
                          万
                        </Typography.Text>
                      </div>
                    </div>
                    <div className={styles.cardLinks}>
                      <Typography.Text className={styles.metaLabel}>
                        联接基金代码：
                      </Typography.Text>
                      <Space size={10} wrap>
                        {item.linkedCodes.map((c) => (
                          <Typography.Link key={c} className={styles.codeLink}>
                            {c}
                          </Typography.Link>
                        ))}
                      </Space>
                    </div>
                    <Typography.Text className={styles.cardDesc} ellipsis>
                      {item.desc}
                    </Typography.Text>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default MultiFilterPage;
