import * as echarts from 'echarts';
import React, { useEffect, useMemo, useRef } from 'react';
import styles from './percentTrendChart.less';

type Point = {
  date: string;
  value: number;
};

const START_DATE = '2023-01-03';
const END_DATE = '2026-03-17';

const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const formatDisplayDate = (value: string | number) => {
  const date = new Date(value);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
};

const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;

const seededRandom = (seed: number) => {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

const generateData = (): Point[] => {
  const rand = seededRandom(20260609);
  const start = new Date(`${START_DATE}T00:00:00`);
  const end = new Date(`${END_DATE}T00:00:00`);
  const list: Point[] = [];
  let current = 0;

  for (
    let cursor = new Date(start.getTime());
    cursor <= end;
    cursor.setDate(cursor.getDate() + 1)
  ) {
    if (isWeekend(cursor)) continue;

    const drift = (rand() - 0.5) * 1.6;
    const meanRevert = -current * 0.015;
    const shock = (rand() - 0.5) * 0.8;
    current += drift + meanRevert + shock;
    current = Math.max(-18, Math.min(26, current));

    list.push({ date: formatDate(cursor), value: Number(current.toFixed(2)) });
  }

  return list;
};

const PercentTrendChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const data = useMemo(() => generateData(), []);

  useEffect(() => {
    console.log('PercentTrendChart data:', data);
    console.table(data);
  }, [data]);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);
    chartInstance.current = chart;

    chart.setOption({
      animation: false,
      grid: { left: 56, right: 24, top: 24, bottom: 56, containLabel: true },
      tooltip: {
        trigger: 'axis',
        confine: true,
        backgroundColor: 'rgba(20, 24, 33, 0.95)',
        borderWidth: 0,
        textStyle: { color: '#fff' },
        formatter: (params: any) => {
          const item = params?.[0];
          if (!item) return '';
          const [time, value] = item.data as [string, number];
          return `<div style="min-width:160px"><div style="font-weight:600;margin-bottom:6px;">${formatDisplayDate(
            time,
          )}</div><div style="display:flex;justify-content:space-between;gap:24px;"><span style="color:#B8C0CC;">涨跌幅</span><span style="font-weight:600;color:${
            value >= 0 ? '#ff7875' : '#36cfc9'
          }">${value.toFixed(2)}%</span></div></div>`;
        },
      },
      xAxis: {
        type: 'time',
        boundaryGap: [0, 0],
        min: START_DATE,
        max: END_DATE,
        axisLine: { lineStyle: { color: '#D9E2EC' } },
        axisTick: { show: false },
        axisLabel: {
          color: '#6B7280',
          hideOverlap: true,
          formatter: (value: number) => {
            const date = new Date(value);
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const d = String(date.getDate()).padStart(2, '0');
            if (m === '01' && d === '03') return `${y}\n${m}.${d}`;
            if (d === '01') return `${m}.${d}`;
            return d;
          },
        },
      },
      yAxis: {
        type: 'value',
        name: '百分比涨跌',
        nameTextStyle: { color: '#6B7280', padding: [0, 0, 0, -10] },
        axisLabel: { color: '#6B7280', formatter: '{value}%' },
        splitLine: { lineStyle: { color: '#E8EEF5', type: 'dashed' } },
        axisLine: { lineStyle: { color: '#D9E2EC' } },
      },
      series: [
        {
          name: '模拟涨跌幅',
          type: 'line',
          data: data.map((item) => [item.date, item.value]),
          smooth: true,
          showSymbol: false,
          lineStyle: { width: 2.5, color: '#1677FF' },
          itemStyle: { color: '#1677FF' },
        },
      ],
    } as unknown as echarts.EChartsOption);

    const onResize = () => chart.resize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      chart.dispose();
      chartInstance.current = null;
    };
  }, [data]);

  return <div ref={chartRef} className={styles.chart} />;
};

export default PercentTrendChart;
