import { InfoCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Tag,
  Tooltip,
  Typography,
  message,
} from 'antd';
import React from 'react';

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

const MultiFilterPage: React.FC = () => {
  const [form] = Form.useForm<FormValues>();

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

    message.success('已提交筛选条件');
  };

  const handleReset = () => {
    form.setFieldsValue(INITIAL_VALUES);
  };

  return (
    <PageContainer ghost>
      <Card
        bodyStyle={{
          padding: 12,
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
                <Tag
                  color="#A06637"
                  style={{ marginInlineEnd: 0, borderRadius: 4 }}
                >
                  领先
                </Tag>
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
                <Tag
                  color="#2C66D5"
                  style={{ marginInlineEnd: 0, borderRadius: 4 }}
                >
                  两融
                </Tag>
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
                <Tag
                  color="red"
                  style={{ marginInlineEnd: 0, borderRadius: 4 }}
                >
                  最低
                </Tag>
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
                <Tag
                  color="#005E91"
                  style={{ marginInlineEnd: 0, borderRadius: 4 }}
                >
                  ±20%
                </Tag>
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
                <Tag
                  color="#BF0008"
                  style={{ marginInlineEnd: 0, borderRadius: 4 }}
                >
                  特色
                </Tag>
                <Typography.Text
                  style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.65)' }}
                >
                  指数为一线ETF
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
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button onClick={handleReset}>重置</Button>
              </div>
            </div>
          </div>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default MultiFilterPage;
