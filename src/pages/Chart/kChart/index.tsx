import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import * as echarts from 'echarts';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { response } from './const';
import styles from './index.less';

const { RangePicker } = DatePicker;

// Types
type MAKey = 'ma5' | 'ma10' | 'ma20' | 'ma60' | 'ma120' | 'ma250';

const MA_CONFIG: { key: MAKey; label: string; color: string }[] = [
  { key: 'ma5', label: 'MA(5)', color: '#486EBD' },
  { key: 'ma10', label: 'MA(10)', color: '#FF7D7D' },
  { key: 'ma20', label: 'MA(20)', color: '#62C583' },
  { key: 'ma60', label: 'MA(60)', color: '#FEA17F' },
  { key: 'ma120', label: 'MA(120)', color: '#D6AB7C' },
  { key: 'ma250', label: 'MA(250)', color: '#E593E1' },
];

const DATE_PRESETS = [
  { label: '今年以来', value: 'ytd' },
  { label: '近三月', value: '3m' },
  { label: '近六月', value: '6m' },
  { label: '近一年', value: '1y' },
  { label: '近三年', value: '3y' },
  { label: '近五年', value: '5y' },
  { label: '近十年', value: '10y' },
];

const KChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const isChartUpdating = useRef(false);

  // State
  const [selectedMAs, setSelectedMAs] = useState<MAKey[]>([
    'ma5',
    'ma10',
    'ma20',
    'ma60',
    'ma120',
    'ma250',
  ]);
  const [currentInfo, setCurrentInfo] = useState<any>(null);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null,
  );

  // 1. Prepare Data
  const rawData = useMemo(() => {
    // Sort by date ascending
    return [...response.klineValueList].sort(
      (a, b) => dayjs(a.marketDate).valueOf() - dayjs(b.marketDate).valueOf(),
    );
  }, []);

  const chartData = useMemo(() => rawData, [rawData]);

  // Initial Data Set
  useEffect(() => {
    if (chartData.length > 0) {
      setCurrentInfo(chartData[chartData.length - 1]);

      // Default view range: Last 1 year
      const lastDate = dayjs(chartData[chartData.length - 1].marketDate);
      const oneYearAgo = lastDate.subtract(1, 'year');

      setDateRange([oneYearAgo, lastDate]);
    }
  }, [chartData]); // Only reset when data source structure changes (e.g. period change)

  // Chart Lifecycle
  useEffect(() => {
    if (!chartRef.current) return;

    const chartEl = chartRef.current;
    const myChart = echarts.init(chartEl);
    chartInstance.current = myChart;

    let rafId: number | null = null;
    const scheduleResize = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        chartInstance.current?.resize();
      });
    };

    scheduleResize();

    let resizeObserver: ResizeObserver | null = null;
    const handleWindowResize = () => scheduleResize();

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        scheduleResize();
      });
      resizeObserver.observe(chartEl);
    } else {
      window.addEventListener('resize', handleWindowResize);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', handleWindowResize);
      }
      if (rafId !== null) cancelAnimationFrame(rafId);
      myChart.dispose();
      chartInstance.current = null;
    };
  }, []);

  // Chart Rendering & Updates
  useEffect(() => {
    const myChart = chartInstance.current;
    if (!myChart || chartData.length === 0) return;

    if (isChartUpdating.current) {
      isChartUpdating.current = false;
      return;
    }

    const dates = chartData.map((item) => item.marketDate);
    const values = chartData.map((item) => [
      item.openValue,
      item.closeValue,
      item.lowValue,
      item.highValue,
    ]);

    // Build Series
    const scatterData = (response.messageList || [])
      .map((msg) => {
        const match = chartData.find((d) => d.marketDate === msg.messageDate);
        if (match) {
          return {
            name: msg.messageTitle,
            value: [msg.messageDate, match.highValue],
          };
        }
        return null;
      })
      .filter(Boolean);

    const series: any[] = [
      {
        name: 'K线',
        type: 'candlestick',
        clip: true,
        data: values,
        itemStyle: {
          color: '#ef5350', // Red for Rise (Close > Open)
          color0: '#26a69a', // Green for Fall (Close < Open)
          borderColor: '#ef5350',
          borderColor0: '#26a69a',
        },
        // Remove default markPoint/Line unless requested
      },
      {
        name: '事件',
        type: 'custom',
        clip: true,
        data: scatterData,
        renderItem: (params: any, api: any) => {
          const dataItem = scatterData[params.dataIndex];
          if (!dataItem) return;

          const point = api.coord([api.value(0), api.value(1)]);
          if (isNaN(point[0]) || isNaN(point[1])) return;

          return {
            type: 'text',
            x: point[0],
            y: point[1] - 10, // Offset distance
            style: {
              text: dataItem.name,
              fill: '#333',
              backgroundColor: '#fff',
              borderColor: '#E7E9ED',
              borderWidth: 1,
              borderRadius: 2,
              padding: [4, 8],
              shadowBlur: 2,
              shadowColor: 'rgba(0,0,0,0.1)',
              align: 'center',
              verticalAlign: 'bottom',
            },
            z2: 100, // Ensure it renders above other elements
          };
        },
        z: 100,
      },
    ];

    // Add MA Lines
    MA_CONFIG.forEach((ma) => {
      if (selectedMAs.includes(ma.key)) {
        series.push({
          name: ma.label,
          type: 'line',
          clip: true,
          data: chartData.map((item) => item[ma.key]),
          smooth: true,
          showSymbol: false, // Default hidden
          symbol: 'circle', // Show circle on hover (handled by axisPointer emphasis usually, or simple symbol)
          symbolSize: 6,
          lineStyle: {
            width: 1,
            color: ma.color,
          },
          itemStyle: {
            color: ma.color,
          },
          emphasis: {
            itemStyle: {
              opacity: 1,
            },
          },
        });
      }
    });

    // Calculate DataZoom Start/End
    let zoomStart = 0;
    let zoomEnd = 100;

    if (dateRange && dateRange[0] && dateRange[1]) {
      const startDateStr = dateRange[0].format('YYYY-MM-DD');
      const endDateStr = dateRange[1].format('YYYY-MM-DD');

      const startIndex = dates.findIndex((d) => d >= startDateStr);
      const endIndex = dates.findIndex((d) => d > endDateStr);

      const realEndIndex = endIndex === -1 ? dates.length - 1 : endIndex - 1;
      const realStartIndex = startIndex === -1 ? 0 : startIndex;

      if (dates.length > 0) {
        zoomStart = (realStartIndex / dates.length) * 100;
        zoomEnd = ((realEndIndex + 1) / dates.length) * 100;
      }
    } else {
      // Default to last 1 year if no range set (fallback)
      // But we set dateRange in useEffect, so this might be redundant but safe
      // logic: find index of date 1 year ago
      const lastDate = dayjs(dates[dates.length - 1]);
      const oneYearAgo = lastDate.subtract(1, 'year').format('YYYY-MM-DD');
      const idx = dates.findIndex((d) => d >= oneYearAgo);
      if (idx !== -1) {
        zoomStart = (idx / dates.length) * 100;
      }
    }

    const option: echarts.EChartsOption = {
      backgroundColor: '#fff',
      animation: false,
      grid: {
        show: true,
        backgroundColor: '#F2F5FA',
        borderWidth: 0,
        left: '10px',
        right: '10px',
        bottom: '30px',
        top: '10px',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#535966',
          },
          crossStyle: {
            color: '#A1A7B2',
            type: 'dashed',
          },
        },
        showContent: false, // We use custom header display, but can keep tooltip for debug
        // Actually user said "上方数据随着变化" (Header data changes),
        // "图片与上方数据文字随着消失、出现" (Image and header text disappear/appear together)
      },
      xAxis: {
        type: 'category',
        data: dates,
        boundaryGap: false,
        axisLine: { onZero: false, lineStyle: { color: '#DFE5F2' } },
        axisLabel: { color: '#777E8C', rotate: 30 },
        splitLine: { show: true, lineStyle: { color: '#DFE5F2' } },
        min: 'dataMin',
        max: 'dataMax',
        axisPointer: {
          label: {
            show: true, // Show X label on axis pointer
          },
        },
      },
      yAxis: {
        scale: true,
        splitLine: { show: true, lineStyle: { color: '#DFE5F2' } },
        axisLabel: { color: '#777E8C' },
        axisLine: { lineStyle: { color: '#DFE5F2' } },
        position: 'left',
      },
      dataZoom: [
        {
          type: 'inside',
          start: zoomStart,
          end: zoomEnd,
          preventDefaultMouseMove: false,
        },
      ],
      series: series,
    };

    myChart.setOption(option);

    // Event Listeners
    myChart.off('updateAxisPointer');
    myChart.on('updateAxisPointer', (event: any) => {
      const dataIndex = event.dataIndex;
      // eslint-disable-next-line eqeqeq
      if (dataIndex != null && chartData[dataIndex]) {
        setCurrentInfo(chartData[dataIndex]);
      }
    });

    // Sync DataZoom with Date Range State (for "上方时间随之变化")
    myChart.off('dataZoom');
    myChart.on('dataZoom', () => {
      isChartUpdating.current = true;
      const option = myChart.getOption() as any;
      const start = option.dataZoom[0].start;
      const end = option.dataZoom[0].end;

      const startIndex = Math.floor((start / 100) * dates.length);
      const endIndex = Math.min(
        Math.floor((end / 100) * dates.length),
        dates.length - 1,
      );

      if (dates[startIndex] && dates[endIndex]) {
        const startMoment = dayjs(dates[startIndex]);
        const endMoment = dayjs(dates[endIndex]);
        // Update RangePicker logic
        setDateRange([startMoment, endMoment]);
      }
    });
  }, [chartData, selectedMAs, dateRange]);

  // Handlers
  const handlePresetClick = (type: string) => {
    const lastDate = dayjs(rawData[rawData.length - 1].marketDate);
    let startDate = lastDate;

    switch (type) {
      case 'ytd':
        startDate = lastDate.startOf('year');
        break;
      case '3m':
        startDate = startDate.subtract(3, 'months');
        break;
      case '6m':
        startDate = startDate.subtract(6, 'months');
        break;
      case '1y':
        startDate = startDate.subtract(1, 'year');
        break;
      case '3y':
        startDate = startDate.subtract(3, 'years');
        break;
      case '5y':
        startDate = startDate.subtract(5, 'years');
        break;
      case '10y':
        startDate = startDate.subtract(10, 'years');
        break;
    }

    // Find nearest trading day? ECharts dataZoom handles range, we just set dates.
    // Ensure start date is not before first data point
    const firstDate = dayjs(rawData[0].marketDate);
    if (startDate.isBefore(firstDate)) startDate = firstDate;

    setDateRange([startDate, lastDate]);
  };

  const disabledDate = (current: dayjs.Dayjs) => {
    if (rawData.length === 0) return false;
    const firstDate = dayjs(rawData[0].marketDate);
    const lastDate = dayjs(rawData[rawData.length - 1].marketDate);
    return current && (current < firstDate || current > lastDate);
  };

  const handleDateChange = (dates: any) => {
    if (!dates) return;

    // "日期选择非交易日日期，显示后面第一个交易日"
    // Find nearest available date in data for start and end
    const adjustDate = (inputDate: dayjs.Dayjs) => {
      const dateStr = inputDate.format('YYYY-MM-DD');
      // Find exact match or next
      const found = rawData.find((d) => d.marketDate >= dateStr);
      return found ? dayjs(found.marketDate) : inputDate;
    };

    const newStart = adjustDate(dates[0]);
    const newEnd = dates[1]; // End date usually implies "up to", maybe adjust to previous or next?
    // Usually "End" is inclusive, so we find nearest <= or just let it be.
    // Let's adjust Start to be safe.

    setDateRange([newStart, newEnd]);
  };

  return (
    <div className={styles.container}>
      {/* Header Info Area */}
      <div className={styles.header}>
        <div className={styles.topRow}>
          <div className={styles.securityInfo}>
            <span className={styles.code}>{response.securityCode}</span>
            <span className={styles.name}>{response.securityName}</span>
          </div>
          <RangePicker
            value={dateRange}
            disabledDate={disabledDate}
            onChange={handleDateChange}
            size="small"
            style={{ width: 220 }}
            allowClear={false}
            renderExtraFooter={() => (
              <div
                className={styles.presets}
                style={{
                  marginLeft: 6,
                  padding: '8px 0',
                }}
              >
                {DATE_PRESETS.map((p) => (
                  <span
                    key={p.value}
                    className={styles.presetLink}
                    onClick={() => handlePresetClick(p.value)}
                  >
                    {p.label}
                  </span>
                ))}
              </div>
            )}
          />
        </div>

        {currentInfo && (
          <>
            <div className={styles.middleRow}>
              <div className={styles.ohlcGroup}>
                <span style={{ fontWeight: 500, color: '#333' }}>
                  {currentInfo.marketDate}
                </span>
                <div className={styles.dataItem}>
                  <span className={styles.label}>收盘</span>
                  <span
                    className={`${styles.value} ${
                      (currentInfo.closeValue ?? 0) >=
                      (currentInfo.openValue ?? 0)
                        ? styles.up
                        : styles.down
                    }`}
                  >
                    {currentInfo.closeValue?.toFixed(2) ?? '--'}
                  </span>
                </div>
                <div className={styles.dataItem}>
                  <span className={styles.label}>开盘</span>
                  <span
                    className={`${styles.value} ${
                      (currentInfo.openValue ?? 0) >=
                      (currentInfo.closeValue ?? 0)
                        ? styles.down
                        : styles.up
                    }`}
                  >
                    {currentInfo.openValue?.toFixed(2) ?? '--'}
                  </span>
                </div>
                <div className={styles.dataItem}>
                  <span className={styles.label}>最高</span>
                  <span
                    className={`${styles.value} ${
                      (currentInfo.highValue ?? 0) >=
                      (currentInfo.closeValue ?? 0)
                        ? styles.down
                        : styles.up
                    }`}
                  >
                    {currentInfo.highValue?.toFixed(2) ?? '--'}
                  </span>
                </div>
                <div className={styles.dataItem}>
                  <span className={styles.label}>最低</span>
                  <span
                    className={`${styles.value} ${
                      (currentInfo.lowValue ?? 0) >=
                      (currentInfo.closeValue ?? 0)
                        ? styles.down
                        : styles.up
                    }`}
                  >
                    {currentInfo.lowValue?.toFixed(2) ?? '--'}
                  </span>
                </div>
              </div>

              <Select
                mode="multiple"
                allowClear
                style={{ width: 100 }}
                placeholder="选择均线"
                defaultValue={selectedMAs}
                onChange={setSelectedMAs}
                size="small"
                maxTagCount="responsive"
              >
                {MA_CONFIG.map((ma) => (
                  <Select.Option key={ma.key} value={ma.key}>
                    {ma.label}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div className={styles.maGroup}>
              {MA_CONFIG.map(
                (ma) =>
                  selectedMAs.includes(ma.key) && (
                    <div key={ma.key} className={styles.dataItem}>
                      <span className={styles.label}>{ma.label}:</span>
                      <span
                        className={styles.value}
                        style={{ color: ma.color }}
                      >
                        {currentInfo[ma.key] !== '-'
                          ? Number(currentInfo[ma.key]).toLocaleString(
                              'en-US',
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              },
                            )
                          : '-'}
                      </span>
                    </div>
                  ),
              )}
            </div>
          </>
        )}
      </div>

      {/* Chart */}
      <div ref={chartRef} className={styles.chartContainer} />
    </div>
  );
};

export default KChart;
