import { CameraOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import * as echarts from 'echarts';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { LeafProps } from '../types';
import styles from './YieldFundamental.less';

type MetricType = 'ebitda' | 'revenue';
type AxisType = 'ebitdaYoY' | 'roe' | 'occupancy';

type SeriesDatum = {
  name: string;
  color: string;
  values: Array<[number, number]>;
};

const SERIES_DATA: SeriesDatum[] = [
  {
    name: '消费基础设施',
    color: '#4F6FAF',
    values: [
      [-10, 25],
      [32, 38],
      [6, -14],
    ],
  },
  {
    name: '交通基础设施',
    color: '#78AADB',
    values: [
      [2, 6],
      [22, -20],
      [18, -9],
    ],
  },
  {
    name: '仓储物流',
    color: '#A791D3',
    values: [
      [3, -22],
      [16, -22],
      [7, -12],
    ],
  },
  {
    name: '园区基础设施',
    color: '#7BC49F',
    values: [
      [1, -5],
      [7, -10],
      [18, -14],
    ],
  },
  {
    name: '能源基础设施',
    color: '#F0BC69',
    values: [
      [8, -12],
      [34, 3],
    ],
  },
  {
    name: '保障性租赁住房',
    color: '#F4A07D',
    values: [
      [5, -18],
      [36, 3],
    ],
  },
  {
    name: '生态环保',
    color: '#F09396',
    values: [
      [6, 5],
      [45, -14],
      [4, -16],
    ],
  },
];

const X_AXIS_LABEL_MAP: Record<AxisType, string> = {
  ebitdaYoY: '当年EBITDA累计同比',
  roe: '当年ROE同比',
  occupancy: '出租率变化',
};

const METRIC_LABEL_MAP: Record<MetricType, string> = {
  ebitda: 'EBITDA',
  revenue: '营业收入',
};

const YieldFundamental: React.FC<LeafProps> = ({ title }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [metricType, setMetricType] = useState<MetricType>('ebitda');
  const [xAxisType, setXAxisType] = useState<AxisType>('ebitdaYoY');

  const option = useMemo((): echarts.EChartsOption => {
    const metricScale = metricType === 'ebitda' ? 1 : 0.85;
    const xScale =
      xAxisType === 'ebitdaYoY' ? 1 : xAxisType === 'roe' ? 0.9 : 0.8;

    return {
      color: SERIES_DATA.map((item) => item.color),
      grid: {
        top: 44,
        right: 22,
        bottom: 42,
        left: 46,
        backgroundColor: '#F6F8FC',
        show: true,
        borderWidth: 0,
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        textStyle: { color: '#111827', fontSize: 12 },
        formatter: (params: any) => {
          const val = params?.value || [0, 0];
          return `<div style="min-width:140px;">
            <div style="font-weight:600;margin-bottom:6px;">${
              params?.seriesName ?? '-'
            }</div>
            <div>X: ${Number(val[0]).toFixed(1)}%</div>
            <div>Y: ${Number(val[1]).toFixed(1)}%</div>
          </div>`;
        },
      },
      xAxis: {
        type: 'value',
        min: -40,
        max: 80,
        axisLabel: { color: '#7B8492', formatter: '{value}%' },
        axisLine: { lineStyle: { color: '#D9E0EF' } },
        splitLine: { show: true, lineStyle: { color: '#E6ECF8' } },
      },
      yAxis: {
        type: 'value',
        min: -30,
        max: 50,
        axisLabel: { color: '#7B8492', formatter: '{value}%' },
        axisLine: { lineStyle: { color: '#D9E0EF' } },
        splitLine: { show: true, lineStyle: { color: '#E6ECF8' } },
      },
      series: SERIES_DATA.map((item) => ({
        name: item.name,
        type: 'scatter',
        symbol: 'circle',
        symbolSize: 14,
        data: item.values.map(([x, y]) => [x * xScale, y * metricScale]),
        itemStyle: {
          color: item.color,
          opacity: 0.85,
          borderColor: '#FFFFFF',
          borderWidth: 1,
        },
      })),
    };
  }, [metricType, xAxisType]);

  useEffect(() => {
    if (!chartRef.current) return;
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }
    chartInstance.current.setOption(option, true);

    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [option]);

  const handleScreenshot = async () => {
    const instance = chartInstance.current;
    const container = chartRef.current;
    if (!instance || !container) return;

    const exportWidth = 1800;
    const currentWidth = container.clientWidth || exportWidth;
    const currentHeight = container.clientHeight || 320;
    const exportHeight = Math.max(
      1,
      Math.round((exportWidth / currentWidth) * currentHeight),
    );

    const exportDom = document.createElement('div');
    exportDom.style.position = 'fixed';
    exportDom.style.left = '-99999px';
    exportDom.style.top = '0';
    exportDom.style.width = `${exportWidth}px`;
    exportDom.style.height = `${exportHeight}px`;
    exportDom.style.background = '#fff';
    document.body.appendChild(exportDom);

    const exportChart = echarts.init(exportDom, undefined, {
      renderer: 'canvas',
      width: exportWidth,
      height: exportHeight,
    });
    exportChart.setOption(
      { ...(instance.getOption() as any), animation: false },
      true,
    );

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 220);
    });

    const link = document.createElement('a');
    link.href = exportChart.getDataURL({
      type: 'png',
      pixelRatio: 2,
      backgroundColor: '#fff',
    });
    link.download = `yield-fundamental-${Date.now()}.png`;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();

    exportChart.dispose();
    exportDom.remove();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerDot} />
        <span className={styles.headerTitle}>{title || '经营基本面'}</span>
      </div>

      <div className={styles.controlsRow}>
        <div className={styles.toggleGroup}>
          <button
            type="button"
            className={`${styles.toggleBtn} ${
              metricType === 'ebitda' ? styles.active : ''
            }`}
            onClick={() => setMetricType('ebitda')}
          >
            EBITDA <InfoCircleOutlined className={styles.infoIcon} />
          </button>
          <button
            type="button"
            className={`${styles.toggleBtn} ${
              metricType === 'revenue' ? styles.active : ''
            }`}
            onClick={() => setMetricType('revenue')}
          >
            营业收入
          </button>
        </div>

        <div className={styles.selectsRow}>
          <div className={styles.selectItem}>
            <span className={styles.controlLabel}>资产类型</span>
            <Select
              value="all"
              className={styles.assetSelect}
              options={[{ value: 'all', label: '全市场' }]}
            />
          </div>
          <div className={styles.selectItem}>
            <span className={styles.controlLabel}>X轴</span>
            <Select
              value={xAxisType}
              onChange={(v) => setXAxisType(v as AxisType)}
              className={styles.xAxisSelect}
              options={[
                { value: 'ebitdaYoY', label: '当年EBITDA累计同比' },
                { value: 'roe', label: '当年ROE同比' },
                { value: 'occupancy', label: '出租率变化' },
              ]}
            />
          </div>
        </div>
      </div>

      <div className={styles.metricRow}>
        <div className={styles.metricLabel}>
          今年以来相对指数收益(REITs全收益指数)
        </div>
        <div className={styles.legendRow}>
          {SERIES_DATA.map((item) => (
            <span key={item.name} className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{ background: item.color }}
              />
              {item.name}
            </span>
          ))}
        </div>
        <Button
          className={styles.screenshotButton}
          size="small"
          icon={<CameraOutlined />}
          onClick={handleScreenshot}
        >
          截图
        </Button>
      </div>

      <div className={styles.chartWrap}>
        <div className={styles.axisHint}>X轴 {X_AXIS_LABEL_MAP[xAxisType]}</div>
        <div
          ref={chartRef}
          className={styles.chart}
          aria-label={`${METRIC_LABEL_MAP[metricType]}散点图`}
        />
      </div>
    </div>
  );
};

export default YieldFundamental;
