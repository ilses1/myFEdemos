import { CameraOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import * as echarts from 'echarts';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { LeafProps } from '../types';
import styles from './YieldDividend.less';

type AssetType = 'all' | 'reit' | 'stock' | 'bond';

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

const seededWave = (len: number, seed = 0.42) => {
  const out: number[] = [];
  let v = seed;
  for (let i = 0; i < len; i++) {
    const drift = Math.sin(i / 11) * 0.08 + Math.cos(i / 23) * 0.05;
    v += drift + (Math.sin(i / 7) * 0.02 - 0.01);
    v = Math.max(4.6, Math.min(11.2, v));
    out.push(Number(v.toFixed(2)));
  }
  return out;
};

const YieldDividend: React.FC<LeafProps> = ({ title }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [assetType, setAssetType] = useState<AssetType>('all');

  const { dates, values, legendName } = useMemo(() => {
    const dates = buildDailyDates(new Date('2025-01-02'), 338);
    const base =
      assetType === 'reit'
        ? 6.2
        : assetType === 'stock'
        ? 2.1
        : assetType === 'bond'
        ? 3.4
        : 6.0;
    const wave = seededWave(dates.length, base);
    const values = wave.map((x, idx) =>
      assetType === 'all'
        ? x + Math.sin(idx / 19) * 0.15
        : x + Math.sin(idx / 29) * 0.12,
    );
    const legendName = '全市场REITs派息率(TTM)';
    return { dates, values, legendName };
  }, [assetType]);

  const option = useMemo((): echarts.EChartsOption => {
    const lineColor = '#7AA6FF';
    return {
      grid: {
        show: true,
        backgroundColor: '#F6F8FC',
        borderWidth: 0,
        top: 62,
        left: 44,
        right: 44,
        bottom: 38,
      },
      legend: {
        top: 16,
        left: 'center',
        icon: 'rect',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: { color: '#6B7686', fontSize: 12 },
        data: [legendName],
      },
      tooltip: {
        confine: true,
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          lineStyle: {
            type: 'dashed',
            width: 1,
            color: '#A1A5B2',
          },
          label: {
            backgroundColor: '#AEB5BF',
            borderRadius: 2,
            fontSize: 12,
            lineHeight: 18,
            color: '#FFFFFF',
            padding: [4, 6],
          },
        },
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: [10, 12],
        textStyle: { color: '#111827', fontSize: 12 },
        formatter: (params: any) => {
          const p = Array.isArray(params) ? params[0] : params;
          const date = p?.axisValue ?? '-';
          const val =
            p?.value === null || p?.value === undefined
              ? '-'
              : `${Number(p.value).toFixed(2)}%`;
          return `<div style="min-width:170px;">
            <div style="font-weight:600;margin-bottom:6px;">${date}</div>
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${lineColor};"></span>
              <span style="color:#374151;">${legendName}</span>
              <span style="margin-left:auto;font-weight:700;color:#111827;">${val}</span>
            </div>
          </div>`;
        },
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisTick: { show: false },
        axisLine: { lineStyle: { color: '#DFE5F2' } },
        axisLabel: {
          color: '#777E8C',
          fontSize: 12,
          interval: 30,
          margin: 12,
        },
        splitLine: { show: true, lineStyle: { color: '#DFE5F2' } },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#777E8C', fontSize: 12, formatter: '{value}%' },
        axisLine: { lineStyle: { color: '#DFE5F2' } },
        axisTick: { show: false },
        splitLine: { show: true, lineStyle: { color: '#DFE5F2' } },
      },
      series: [
        {
          name: legendName,
          type: 'line',
          data: values,
          smooth: false,
          showSymbol: false,
          symbol: 'circle',
          symbolSize: 7,
          lineStyle: { width: 2, color: lineColor },
          itemStyle: {
            color: '#FFFFFF',
            borderColor: lineColor,
            borderWidth: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(122, 166, 255, 0.26)' },
              { offset: 1, color: 'rgba(122, 166, 255, 0.02)' },
            ]),
          },
        },
      ],
    };
  }, [dates, legendName, values]);

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
    const currentHeight = container.clientHeight || 280;
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

    const originalOption = instance.getOption() as any;
    const exportOption = {
      ...originalOption,
      animation: false,
      series: Array.isArray(originalOption?.series)
        ? originalOption.series.map((s: any) => ({
            ...s,
            animation: false,
            animationDuration: 0,
            animationDurationUpdate: 0,
          }))
        : originalOption?.series,
    };
    exportChart.setOption(exportOption, {
      notMerge: true,
      lazyUpdate: false,
      silent: true,
    } as any);

    await new Promise<void>((resolve) => {
      let done = false;
      const cleanup = () => {
        if (done) return;
        done = true;
        exportChart.off('finished', onFinished);
        resolve();
      };
      const onFinished = () => cleanup();
      exportChart.on('finished', onFinished);
      window.setTimeout(cleanup, 260);
    });

    const hiResDataUrl = exportChart.getDataURL({
      type: 'png',
      pixelRatio: 2,
      backgroundColor: '#fff',
    });

    const link = document.createElement('a');
    link.href = hiResDataUrl;
    link.download = `yield-dividend-${exportWidth}w-${Date.now()}.png`;
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
        <span className={styles.headerTitle}>{title || '分红'}</span>
      </div>

      <div className={styles.controlsRow}>
        <div className={styles.controlItem}>
          <span className={styles.controlLabel}>资产类型</span>
          <Select
            size="middle"
            value={assetType}
            onChange={(v) => setAssetType(v as AssetType)}
            className={styles.assetSelect}
            options={[
              { value: 'all', label: '全市场' },
              { value: 'reit', label: 'REITs' },
              { value: 'stock', label: '股票' },
              { value: 'bond', label: '债券' },
            ]}
          />
        </div>
      </div>

      <div className={styles.metricRow}>
        <div className={styles.metricLeft}>
          <span className={styles.metricName}>REITs派息率(TTM)</span>
          <span className={styles.metricPill}>
            REITs派息率(TTM)：近1年可供分配金额/当日市值
          </span>
        </div>
      </div>

      <div className={styles.chartWrap}>
        <div className={styles.chartToolbar}>
          <Button
            className={styles.screenshotButton}
            size="small"
            icon={<CameraOutlined />}
            onClick={handleScreenshot}
          >
            截图
          </Button>
        </div>
        <div ref={chartRef} className={styles.chart} />
      </div>
    </div>
  );
};

export default YieldDividend;
