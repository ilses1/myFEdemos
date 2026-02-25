import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import * as echarts from 'echarts';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { response } from './const';
import styles from './index.less';

const { RangePicker } = DatePicker;

type MAKey = 'ma5' | 'ma10' | 'ma20' | 'ma60' | 'ma120' | 'ma250';

type KLineItem = {
  marketDate: string;
  openValue: number;
  closeValue: number;
  highValue: number;
  lowValue: number;
} & Partial<Record<MAKey, number | '-' | null>>;

type MessageItem = { messageDate: string; messageTitle: string };

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

const toNumberOrNull = (value: unknown) => {
  if (value === '-' || value === null || value === undefined) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
};

const calcZoomRange = (
  dates: string[],
  dateRange: [dayjs.Dayjs, dayjs.Dayjs] | null,
) => {
  if (dates.length === 0) return { start: 0, end: 100 };

  let start = 0;
  let end = 100;

  if (dateRange?.[0] && dateRange?.[1]) {
    const startDateStr = dateRange[0].format('YYYY-MM-DD');
    const endDateStr = dateRange[1].format('YYYY-MM-DD');

    const startIndex = dates.findIndex((d) => d >= startDateStr);
    const endIndex = dates.findIndex((d) => d > endDateStr);

    const realEndIndex = endIndex === -1 ? dates.length - 1 : endIndex - 1;
    const realStartIndex = startIndex === -1 ? 0 : startIndex;

    start = (realStartIndex / dates.length) * 100;
    end = ((realEndIndex + 1) / dates.length) * 100;
  } else {
    const lastDate = dayjs(dates[dates.length - 1]);
    const oneYearAgo = lastDate.subtract(1, 'year').format('YYYY-MM-DD');
    const idx = dates.findIndex((d) => d >= oneYearAgo);
    if (idx !== -1) start = (idx / dates.length) * 100;
  }

  return { start, end };
};

const KChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const isChartUpdating = useRef(false);

  const getUpDownClass = (
    a: number | null | undefined,
    b: number | null | undefined,
    geIsUp: boolean,
  ) => {
    const left = a ?? 0;
    const right = b ?? 0;
    return left >= right
      ? geIsUp
        ? styles.up
        : styles.down
      : geIsUp
      ? styles.down
      : styles.up;
  };

  const formatFixed = (value: number | null | undefined, digits = 2) => {
    if (typeof value !== 'number' || !Number.isFinite(value)) return '--';
    return value.toFixed(digits);
  };

  const formatLocaleNumber = (value: unknown) => {
    const n = toNumberOrNull(value);
    if (n === null) return '-';
    return n.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const [selectedMAs, setSelectedMAs] = useState<MAKey[]>([
    'ma5',
    'ma10',
    'ma20',
    'ma60',
    'ma120',
    'ma250',
  ]);
  const [currentInfo, setCurrentInfo] = useState<KLineItem | null>(null);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null,
  );

  const rawData = useMemo<KLineItem[]>(() => {
    return [...(response.klineValueList as KLineItem[])].sort(
      (a, b) => dayjs(a.marketDate).valueOf() - dayjs(b.marketDate).valueOf(),
    );
  }, []);

  const dataBounds = useMemo(() => {
    if (rawData.length === 0) return null;
    return {
      first: dayjs(rawData[0].marketDate),
      last: dayjs(rawData[rawData.length - 1].marketDate),
    };
  }, [rawData]);

  const dates = useMemo(
    () => rawData.map((item) => item.marketDate),
    [rawData],
  );
  const klineValues = useMemo(
    () =>
      rawData.map((item) => [
        item.openValue,
        item.closeValue,
        item.lowValue,
        item.highValue,
      ]),
    [rawData],
  );

  const eventData = useMemo(() => {
    const highByDate = new Map<string, number>();
    rawData.forEach((d) => {
      highByDate.set(d.marketDate, d.highValue);
    });

    const list = (response.messageList as MessageItem[] | undefined) ?? [];
    return list.flatMap((msg) => {
      const y = highByDate.get(msg.messageDate);
      if (y === undefined) return [];
      return [
        {
          name: msg.messageTitle,
          value: [msg.messageDate, y] as [string, number],
        },
      ];
    });
  }, [rawData]);

  const maSeries = useMemo(() => {
    return MA_CONFIG.flatMap((ma) => {
      if (!selectedMAs.includes(ma.key)) return [];
      return [
        {
          id: ma.key,
          name: ma.label,
          type: 'line',
          clip: true,
          data: rawData.map((item) => toNumberOrNull(item[ma.key])),
          smooth: true,
          connectNulls: true,
          showSymbol: false,
          symbol: 'circle',
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
        },
      ];
    });
  }, [rawData, selectedMAs]);

  const zoomRange = useMemo(
    () => calcZoomRange(dates, dateRange),
    [dates, dateRange],
  );

  const chartOption = useMemo<echarts.EChartsOption>(() => {
    return {
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
        showContent: false,
      },
      xAxis: {
        type: 'category',
        data: dates,
        boundaryGap: true,
        axisLine: { onZero: false, lineStyle: { color: '#DFE5F2' } },
        axisLabel: { color: '#777E8C', rotate: 30 },
        splitLine: { show: true, lineStyle: { color: '#DFE5F2' } },
        min: 'dataMin',
        max: 'dataMax',
        axisPointer: {
          label: {
            show: true,
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
          start: zoomRange.start,
          end: zoomRange.end,
          preventDefaultMouseMove: false,
        },
      ],
      series: [
        {
          id: 'kline',
          name: 'K线',
          type: 'candlestick',
          clip: true,
          data: klineValues,
          itemStyle: {
            color: '#ef5350',
            color0: '#26a69a',
            borderColor: '#ef5350',
            borderColor0: '#26a69a',
          },
        },
        {
          id: 'event',
          name: '事件',
          type: 'custom',
          clip: true,
          data: eventData,
          renderItem: (params: any, api: any) => {
            const dataItem = eventData[params.dataIndex];
            if (!dataItem) return;

            const point = api.coord([api.value(0), api.value(1)]);
            if (isNaN(point[0]) || isNaN(point[1])) return;

            return {
              type: 'text',
              x: point[0],
              y: point[1] - 10,
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
              z2: 100,
            };
          },
          z: 100,
        },
        ...maSeries,
      ],
    };
  }, [dates, eventData, klineValues, maSeries, zoomRange.end, zoomRange.start]);

  const restoreToLastVisible = useCallback(() => {
    const total = rawData.length;
    if (total === 0) return;

    const myChart = chartInstance.current;
    let lastIndex = total - 1;

    if (myChart) {
      try {
        const option = myChart.getOption() as any;
        const dz0 = Array.isArray(option?.dataZoom) ? option.dataZoom[0] : null;
        const endPercent = Number(dz0?.end);

        if (Number.isFinite(endPercent)) {
          lastIndex = Math.min(
            Math.floor((endPercent / 100) * total),
            total - 1,
          );
        }
      } catch {}
    }

    const nextInfo = rawData[lastIndex] ?? rawData[total - 1];
    setCurrentInfo((prev) => (prev === nextInfo ? prev : nextInfo));
  }, [rawData]);

  useEffect(() => {
    if (rawData.length > 0) {
      setCurrentInfo(rawData[rawData.length - 1]);

      const lastDate = dayjs(rawData[rawData.length - 1].marketDate);
      const oneYearAgo = lastDate.subtract(1, 'year');

      setDateRange([oneYearAgo, lastDate]);
    }
  }, [rawData]);

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

  const handleAxisPointerUpdate = useCallback(
    (event: any) => {
      const dataIndex = event.dataIndex;
      if (
        dataIndex !== null &&
        dataIndex !== undefined &&
        rawData[dataIndex] !== undefined
      ) {
        setCurrentInfo(rawData[dataIndex]);
      }
    },
    [rawData],
  );

  const handleDataZoom = useCallback(() => {
    const myChart = chartInstance.current;
    if (!myChart) return;
    if (dates.length === 0) return;

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
      setDateRange([startMoment, endMoment]);
    }
  }, [dates]);

  useEffect(() => {
    const myChart = chartInstance.current;
    if (!myChart || rawData.length === 0) return;

    if (isChartUpdating.current) {
      isChartUpdating.current = false;
      return;
    }
    myChart.off('updateAxisPointer');
    myChart.on('updateAxisPointer', handleAxisPointerUpdate);

    myChart.off('globalout');
    myChart.on('globalout', restoreToLastVisible);
    const zr = myChart.getZr();
    zr.off('globalout');
    zr.on('globalout', restoreToLastVisible);

    myChart.off('dataZoom');
    myChart.on('dataZoom', handleDataZoom);

    myChart.setOption(chartOption, { replaceMerge: ['series'] });
  }, [
    chartOption,
    handleAxisPointerUpdate,
    handleDataZoom,
    rawData.length,
    restoreToLastVisible,
  ]);

  const handlePresetClick = (type: string) => {
    if (!dataBounds) return;

    const presetMap: Record<string, (d: dayjs.Dayjs) => dayjs.Dayjs> = {
      ytd: (d) => d.startOf('year'),
      '3m': (d) => d.subtract(3, 'months'),
      '6m': (d) => d.subtract(6, 'months'),
      '1y': (d) => d.subtract(1, 'year'),
      '3y': (d) => d.subtract(3, 'years'),
      '5y': (d) => d.subtract(5, 'years'),
      '10y': (d) => d.subtract(10, 'years'),
    };

    const calcStart = presetMap[type];
    let startDate = (calcStart ? calcStart(dataBounds.last) : dataBounds.last)
      .clone()
      .startOf('day');

    if (startDate.isBefore(dataBounds.first)) startDate = dataBounds.first;
    setDateRange([startDate, dataBounds.last]);
  };

  const disabledDate = (current: dayjs.Dayjs) => {
    if (!dataBounds) return false;
    return current && (current < dataBounds.first || current > dataBounds.last);
  };

  const adjustStartToTradingDay = useCallback(
    (inputDate: dayjs.Dayjs) => {
      const dateStr = inputDate.format('YYYY-MM-DD');
      const found = rawData.find((d) => d.marketDate >= dateStr);
      return found ? dayjs(found.marketDate) : inputDate;
    },
    [rawData],
  );

  const handleDateChange = (nextDates: [dayjs.Dayjs, dayjs.Dayjs] | null) => {
    if (!nextDates) return;
    setDateRange([adjustStartToTradingDay(nextDates[0]), nextDates[1]]);
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
                    className={`${styles.value} ${getUpDownClass(
                      currentInfo.closeValue,
                      currentInfo.openValue,
                      true,
                    )}`}
                  >
                    {formatFixed(currentInfo.closeValue)}
                  </span>
                </div>
                <div className={styles.dataItem}>
                  <span className={styles.label}>开盘</span>
                  <span
                    className={`${styles.value} ${getUpDownClass(
                      currentInfo.openValue,
                      currentInfo.closeValue,
                      false,
                    )}`}
                  >
                    {formatFixed(currentInfo.openValue)}
                  </span>
                </div>
                <div className={styles.dataItem}>
                  <span className={styles.label}>最高</span>
                  <span
                    className={`${styles.value} ${getUpDownClass(
                      currentInfo.highValue,
                      currentInfo.closeValue,
                      false,
                    )}`}
                  >
                    {formatFixed(currentInfo.highValue)}
                  </span>
                </div>
                <div className={styles.dataItem}>
                  <span className={styles.label}>最低</span>
                  <span
                    className={`${styles.value} ${getUpDownClass(
                      currentInfo.lowValue,
                      currentInfo.closeValue,
                      false,
                    )}`}
                  >
                    {formatFixed(currentInfo.lowValue)}
                  </span>
                </div>
              </div>

              <Select
                mode="multiple"
                allowClear
                style={{ width: 100 }}
                placeholder="选择均线"
                value={selectedMAs}
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
                        {formatLocaleNumber(currentInfo[ma.key])}
                      </span>
                    </div>
                  ),
              )}
            </div>
          </>
        )}
      </div>

      {/* Chart */}
      <div
        ref={chartRef}
        className={styles.chartContainer}
        onMouseLeave={restoreToLastVisible}
      />
    </div>
  );
};

export default KChart;
