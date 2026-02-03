import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import * as echarts from 'echarts';
import React, { useEffect, useMemo, useRef } from 'react';
import { fullMarketListingScale } from './const';
import styles from './index.less';

const formatYi = (value: number, maximumFractionDigits = 2) => {
  const yi = value / 1e8;
  return yi.toLocaleString('zh-CN', {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  });
};

const LineChartPage: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  const { categories, totalYi, circulationYi, listedNumbers, overview } =
    useMemo(() => {
      const categories = fullMarketListingScale.projectList.map(
        (item) => item.projectName,
      );
      const totalYi = fullMarketListingScale.projectList.map((item) =>
        Number((item.projectTotalMarketValue / 1e8).toFixed(2)),
      );
      const circulationYi = fullMarketListingScale.projectList.map((item) =>
        Number((item.projectCirculationMarketValue / 1e8).toFixed(2)),
      );
      const listedNumbers = fullMarketListingScale.projectList.map(
        (item) => item.projectListedNumber,
      );

      return {
        categories,
        totalYi,
        circulationYi,
        listedNumbers,
        overview: {
          listedNumber: fullMarketListingScale.listedNumber,
          totalMarketValueYi: formatYi(fullMarketListingScale.totalMarketValue),
          circulationMarketValueYi: formatYi(
            fullMarketListingScale.circulationMarketValue,
            1,
          ),
        },
      };
    }, []);

  const option = useMemo((): echarts.EChartsOption => {
    const leftMaxRaw = Math.max(...totalYi, ...circulationYi);
    const leftMax = Math.ceil(leftMaxRaw / 100) * 100;
    const rightMaxRaw = Math.max(...listedNumbers);
    const rightMax = Math.ceil(rightMaxRaw / 5) * 5;

    return {
      grid: {
        show: true,
        backgroundColor: '#F2F5FA',
        borderWidth: 0,
        top: 56,
        left: 52,
        right: 52,
        bottom: 52,
        containLabel: false,
      },
      legend: {
        top: 14,
        left: 'center',
        icon: 'rect',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: '#6B7280',
          fontSize: 12,
        },
        data: ['总市值(亿)', '流通市值(亿)', '上市数量(右轴)'],
      },
      tooltip: {
        confine: true,
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(255,255,255,0.98)',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        textStyle: { color: '#111827', fontSize: 12 },
        formatter: (params: any) => {
          const items = Array.isArray(params) ? params : [params];
          const title =
            items?.[0]?.axisValue !== null
              ? `<div style="font-weight:600;margin-bottom:6px;">${items[0].axisValue}</div>`
              : '';
          const lines = items
            .map((p: any) => {
              const isCount = p.seriesName.includes('上市数量');
              let color = p.color;
              if (typeof color === 'object') {
                if (p.seriesName.includes('总市值')) {
                  color = '#486EBD';
                } else if (p.seriesName.includes('流通市值')) {
                  color = '#FF7D7D';
                }
              }

              const val =
                p.value === null
                  ? '-'
                  : isCount
                  ? `${p.value}只`
                  : `${Number(p.value).toFixed(2)}亿`;
              return `<div style="display:flex;align-items:center;gap:8px;margin:4px 0;">
                <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${color};"></span>
                <span style="color:#374151;">${p.seriesName}</span>
                <span style="margin-left:auto;font-weight:600;color:#111827;">${val}</span>
              </div>`;
            })
            .join('');
          return `<div style="min-width:180px;">${title}${lines}</div>`;
        },
      },
      xAxis: {
        type: 'category',
        data: categories,
        axisTick: { show: false },
        axisLine: { lineStyle: { color: '#DFE5F2' } },
        axisLabel: {
          color: '#777E8C',
          fontSize: 12,
          interval: 0,
          rotate: 28,
          margin: 12,
          overflow: 'truncate',
          width: 90,
        },
        splitLine: { show: true, lineStyle: { color: '#DFE5F2' } },
      },
      yAxis: [
        {
          type: 'value',
          min: 0,
          max: leftMax || 100,
          splitNumber: 5,
          axisLabel: { color: '#777E8C', fontSize: 12 },
          axisLine: { lineStyle: { color: '#DFE5F2' } },
          axisTick: { show: false },
          splitLine: { show: true, lineStyle: { color: '#DFE5F2' } },
        },
        {
          type: 'value',
          min: 0,
          max: rightMax || 5,
          splitNumber: 5,
          axisLabel: { color: '#777E8C', fontSize: 12 },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
        },
      ],
      series: [
        {
          name: '总市值(亿)',
          type: 'bar',
          data: totalYi,
          barWidth: 10,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#486EBD' },
                { offset: 1, color: '#88A2DF' },
              ],
            },
            borderRadius: [2, 2, 0, 0],
          },
        },
        {
          name: '流通市值(亿)',
          type: 'bar',
          data: circulationYi,
          barWidth: 10,
          barGap: '40%',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#FF7D7D' },
                { offset: 1, color: '#FFA3A3' },
              ],
            },
            borderRadius: [2, 2, 0, 0],
          },
        },
        {
          name: '上市数量(右轴)',
          type: 'line',
          yAxisIndex: 1,
          data: listedNumbers,
          smooth: false,
          symbol: 'emptyCircle',
          symbolSize: 6,
          lineStyle: { width: 2, color: '#F7BC63' },
          itemStyle: { color: '#F7BC63' },
        },
      ],
    };
  }, [categories, circulationYi, listedNumbers, totalYi]);

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

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Card
          className={styles.card}
          bordered={false}
          bodyStyle={{ padding: 0 }}
        >
          <div className={styles.header}>
            <div className={styles.title}>全市场上市规模</div>
            <div className={styles.metrics}>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>上市数量：</span>
                <span className={styles.metricValue}>
                  {overview.listedNumber}只
                </span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>总市值：</span>
                <span className={styles.metricValue}>
                  {overview.totalMarketValueYi}亿
                </span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>流通市值：</span>
                <span className={styles.metricValue}>
                  {overview.circulationMarketValueYi}亿
                </span>
              </div>
            </div>
          </div>
          <div className={styles.chartArea}>
            <div ref={chartRef} className={styles.chartContainer} />
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default LineChartPage;
