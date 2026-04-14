import { CameraOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import * as echarts from 'echarts';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { LeafProps } from '../types';
import styles from './YieldValuation.less';

type AssetType = 'all' | 'reit' | 'stock';
type SampleRange = 'rolling1y' | 'rolling3y' | 'full';

const buildDailyDates = (start: Date, days: number) => {
  const out: string[] = [];
  const d = new Date(start);
  for (let i = 0; i < days; i++) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    out.push(`${yyyy}-${mm}-${dd}`);
    d.setDate(d.getDate() + 1);
  }
  return out;
};

const YieldValuation: React.FC<LeafProps> = ({ title }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [assetType, setAssetType] = useState<AssetType>('all');
  const [sampleRange, setSampleRange] = useState<SampleRange>('rolling1y');

  const { dates, pnAv, quantile, mean, plus1, plus2, minus1, minus2 } =
    useMemo(() => {
      const dates = buildDailyDates(new Date('2025-01-02'), 338);
      const scale =
        assetType === 'all' ? 1 : assetType === 'reit' ? 1.03 : 0.95;
      const vol =
        sampleRange === 'rolling1y'
          ? 1
          : sampleRange === 'rolling3y'
          ? 1.15
          : 0.9;
      const sampleStart = 88;

      const mean = dates.map((_, i) => {
        const base = 1.0 + Math.sin(i / 42) * 0.05;
        return Number((base * scale).toFixed(3));
      });
      const plus1 = dates.map((_, i) =>
        Number((mean[i] + 0.11 + Math.cos(i / 51) * 0.015 * vol).toFixed(3)),
      );
      const plus2 = dates.map((_, i) =>
        Number((mean[i] + 0.26 + Math.cos(i / 47) * 0.02 * vol).toFixed(3)),
      );
      const minus1 = dates.map((_, i) =>
        Number((mean[i] - 0.11 + Math.sin(i / 46) * 0.015 * vol).toFixed(3)),
      );
      const minus2 = dates.map((_, i) =>
        Number((mean[i] - 0.24 + Math.sin(i / 44) * 0.02 * vol).toFixed(3)),
      );

      const quantile = dates.map((_, i) => {
        const q = 57 + Math.sin(i / 34) * 15 + Math.cos(i / 19) * 11;
        return Number(Math.max(6, Math.min(92, q)).toFixed(1));
      });

      const pnAv = dates.map((_, i) => {
        if (i < sampleStart) {
          const early = 0.92 + i * 0.0029 + Math.sin(i / 7.5) * 0.05;
          return Number((early * scale).toFixed(3));
        }
        const late = 1.17 + Math.sin(i / 23) * 0.03 + Math.cos(i / 11) * 0.016;
        return Number((late * scale).toFixed(3));
      });

      return { dates, pnAv, quantile, mean, plus1, plus2, minus1, minus2 };
    }, [assetType, sampleRange]);

  const option = useMemo((): echarts.EChartsOption => {
    const lineWidth = 2;
    return {
      grid: {
        show: true,
        backgroundColor: '#F6F8FC',
        borderWidth: 0,
        top: 52,
        left: 46,
        right: 52,
        bottom: 40,
      },
      tooltip: {
        trigger: 'axis',
        confine: true,
        axisPointer: { type: 'line' },
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        textStyle: { color: '#111827', fontSize: 12 },
        valueFormatter: (value: any) =>
          typeof value === 'number' ? value.toFixed(2) : `${value}`,
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisTick: { show: false },
        axisLine: { lineStyle: { color: '#DFE5F2' } },
        axisLabel: {
          color: '#7B8492',
          interval: 20,
          rotate: 28,
          margin: 12,
        },
        splitLine: { show: true, lineStyle: { color: '#E4EAF6' } },
      },
      yAxis: [
        {
          type: 'value',
          name: 'P/NAV',
          min: 0.7,
          max: 1.5,
          interval: 0.1,
          axisLabel: { color: '#7B8492' },
          axisLine: { show: true, lineStyle: { color: '#DCE3F1' } },
          splitLine: { show: true, lineStyle: { color: '#E4EAF6' } },
        },
        {
          type: 'value',
          name: '分位数',
          min: 0,
          max: 100,
          interval: 20,
          axisLabel: { color: '#7B8492', formatter: '{value}%' },
          axisLine: { show: true, lineStyle: { color: '#DCE3F1' } },
          splitLine: { show: false },
        },
      ],
      legend: {
        show: false,
      },
      series: [
        {
          name: '分位数(右轴)',
          type: 'line',
          yAxisIndex: 1,
          data: quantile,
          showSymbol: false,
          lineStyle: { color: '#4F79BE', width: lineWidth },
        },
        {
          name: '全市场REITs资产P/NAV(市值加权)',
          type: 'line',
          yAxisIndex: 0,
          data: pnAv,
          showSymbol: false,
          lineStyle: { color: '#F07E83', width: lineWidth },
        },
        {
          name: '均值',
          type: 'line',
          yAxisIndex: 0,
          data: mean,
          showSymbol: false,
          lineStyle: { color: '#E8B75B', width: 1.8, type: 'dashed' },
        },
        {
          name: '均值-2倍标准差',
          type: 'line',
          yAxisIndex: 0,
          data: minus2,
          showSymbol: false,
          lineStyle: { color: '#87C7A4', width: 1.8, type: 'dashed' },
        },
        {
          name: '均值-1倍标准差',
          type: 'line',
          yAxisIndex: 0,
          data: minus1,
          showSymbol: false,
          lineStyle: { color: '#B69CD8', width: 1.8, type: 'dashed' },
        },
        {
          name: '均值+1倍标准差',
          type: 'line',
          yAxisIndex: 0,
          data: plus1,
          showSymbol: false,
          lineStyle: { color: '#E8A3CF', width: 1.8, type: 'dashed' },
        },
        {
          name: '均值+2倍标准差',
          type: 'line',
          yAxisIndex: 0,
          data: plus2,
          showSymbol: false,
          lineStyle: { color: '#75A8D8', width: 1.8, type: 'dashed' },
        },
      ],
    };
  }, [dates, mean, minus1, minus2, plus1, plus2, pnAv, quantile]);

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

    const exportWidth = 1600;
    const currentWidth = container.clientWidth || exportWidth;
    const currentHeight = container.clientHeight || 340;
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

    await new Promise<void>((resolve) => window.setTimeout(resolve, 220));

    const link = document.createElement('a');
    link.href = exportChart.getDataURL({
      type: 'png',
      pixelRatio: 2,
      backgroundColor: '#fff',
    });
    link.download = `yield-valuation-${Date.now()}.png`;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();

    exportChart.dispose();
    exportDom.remove();
  };

  const legendItems = [
    { name: '分位数(右轴)', color: '#4F79BE' },
    { name: '全市场REITs资产P/NAV(市值加权)', color: '#F07E83' },
    { name: '均值', color: '#E8B75B' },
    { name: '均值-2倍标准差', color: '#87C7A4' },
    { name: '均值-1倍标准差', color: '#B69CD8' },
    { name: '均值+1倍标准差', color: '#E8A3CF' },
    { name: '均值+2倍标准差', color: '#75A8D8' },
  ];

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerDot} />
        <span className={styles.headerTitle}>{title || '估值'}</span>
      </div>

      <div className={styles.controlsRow}>
        <div className={styles.controlItem}>
          <span className={styles.controlLabel}>资产类型</span>
          <Select
            value={assetType}
            onChange={(v) => setAssetType(v as AssetType)}
            className={styles.assetSelect}
            options={[
              { value: 'all', label: '全市场' },
              { value: 'reit', label: 'REITs' },
              { value: 'stock', label: '股票' },
            ]}
          />
        </div>
        <div className={styles.controlItem}>
          <span className={styles.controlLabel}>分位数样本区间</span>
          <Select
            value={sampleRange}
            onChange={(v) => setSampleRange(v as SampleRange)}
            className={styles.rangeSelect}
            options={[
              { value: 'rolling1y', label: '滚动1年' },
              { value: 'rolling3y', label: '滚动3年' },
              { value: 'full', label: '全样本' },
            ]}
          />
        </div>
      </div>

      <div className={styles.descriptionRow}>
        <span className={styles.metricTitle}>REITs资产P/NAV</span>
        <span className={styles.quoteIcon}>“</span>
        <span className={styles.descriptionText}>
          类似股票PB估值，底层资产NAV采用DCF估值法得到。P/NAV在1附近运行，采用中证发布的PV乘数作为P/NAV指标，现金流贴现法得到底层资产估值，联动得到ABS估值。资产维度采用全市场已上市REITs通过市值加权后得出。
        </span>
        <span className={styles.quoteIcon}>”</span>
      </div>

      <div className={styles.legendRow}>
        {legendItems.map((item) => (
          <span key={item.name} className={styles.legendItem}>
            <span
              className={styles.legendDot}
              style={{ background: item.color }}
            />
            {item.name}
          </span>
        ))}
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
        <div ref={chartRef} className={styles.chart} />
      </div>
    </div>
  );
};

export default YieldValuation;
