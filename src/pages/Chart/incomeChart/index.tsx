import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Empty,
  Popover,
  Select,
  Space,
  message,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import * as echarts from 'echarts';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { response, securityList } from './const';
import styles from './index.less';

const { RangePicker } = DatePicker;

type SecurityItem = {
  securityId: string;
  securityName: string;
  securityCode?: string;
};

const OVERLAY_LIMIT = 8;

const DATE_PRESETS = [
  { label: '今年以来', value: 'ytd' },
  { label: '近三月', value: '3m' },
  { label: '近六月', value: '6m' },
  { label: '近一年', value: '1y' },
  { label: '近三年', value: '3y' },
  { label: '近五年', value: '5y' },
  { label: '近十年', value: '10y' },
];

const overlayPalette = [
  '#81C9A1',
  '#B496E8',
  '#FF91BF',
  '#67A1DF',
  '#68C0CA',
  '#7C81D6',
  '#7DA9FF',
  '#B7C4DC',
];

const hashStringTo01 = (input: string) => {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  return (Math.abs(hash) % 1000) / 1000;
};

const IncomeChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const overlaySelectRef = useRef<any>(null);
  const baseIndexRef = useRef(0);

  // Parse data
  // response.unitNavs[0] -> Blue line (中证REITs全收益)
  // response.unitNavs[1] -> Red line (中证REITs(收盘))

  const line1Data = response.unitNavs[0].unitNavItems;
  const line2Data = response.unitNavs[1].unitNavItems;

  // Determine date range from data
  const allDates = line1Data.map((item) => item.unitNavDate);
  const minDate = allDates[0];
  const maxDate = allDates[allDates.length - 1];

  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
    dayjs(minDate),
    dayjs(maxDate),
  ]);

  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlaySelected, setOverlaySelected] = useState<SecurityItem[]>([]);
  const [overlayDraft, setOverlayDraft] = useState<SecurityItem[]>([]);
  const [overlaySearch, setOverlaySearch] = useState('');
  const [overlaySelectValue, setOverlaySelectValue] = useState<string | null>(
    null,
  );

  const securityItems = useMemo(() => {
    return securityList as unknown as SecurityItem[];
  }, []);

  const securityItemMap = useMemo(() => {
    const map = new Map<string, SecurityItem>();
    securityItems.forEach((it) => map.set(it.securityId, it));
    return map;
  }, [securityItems]);

  const overlaySelectOptions = useMemo(() => {
    return securityItems.map((it) => ({
      value: it.securityId,
      label: it.securityName,
    }));
  }, [securityItems]);

  const overlayDraftIdSet = useMemo(() => {
    return new Set(overlayDraft.map((it) => it.securityId));
  }, [overlayDraft]);

  const overlayAvailableOptions = useMemo(() => {
    return overlaySelectOptions.filter(
      (opt) => !overlayDraftIdSet.has(opt.value),
    );
  }, [overlaySelectOptions, overlayDraftIdSet]);

  const commitOverlay = () => {
    setOverlaySelected(overlayDraft);
    setOverlayOpen(false);
    setOverlaySearch('');
  };

  const cancelOverlay = () => {
    setOverlayDraft(overlaySelected);
    setOverlayOpen(false);
    setOverlaySearch('');
  };

  const clearOverlay = () => {
    setOverlayDraft([]);
    setOverlaySearch('');
  };

  const handlePresetClick = (type: string) => {
    const lastDate = dayjs(maxDate);
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
      default:
        break;
    }

    const firstDate = dayjs(minDate);
    if (startDate.isBefore(firstDate)) startDate = firstDate;

    setDateRange([startDate, lastDate]);
  };

  const buildDateValueMap = (
    items: Array<{ unitNavDate: string; unitNavValue: number }>,
  ) => {
    const map = new Map<string, number>();
    items.forEach((it) => {
      if (it.unitNavDate) map.set(it.unitNavDate, it.unitNavValue);
    });
    return map;
  };

  const getPrevTradingDate = (sortedDates: string[], startDateStr: string) => {
    for (let i = sortedDates.length - 1; i >= 0; i -= 1) {
      const d = sortedDates[i];
      if (d < startDateStr) return d;
    }
    return null;
  };

  const findFirstCompleteDate = (
    candidateDates: string[],
    requiredMaps: Array<Map<string, unknown>>,
  ) => {
    for (let i = 0; i < candidateDates.length; i += 1) {
      const d = candidateDates[i];
      const ok = requiredMaps.every((m) => m.has(d));
      if (ok) return d;
    }
    return null;
  };

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const [pickedStart, pickedEnd] = dateRange;
    const pickedStartStr = pickedStart.format('YYYY-MM-DD');
    const pickedEndStr = pickedEnd.format('YYYY-MM-DD');

    const candidateStartStr =
      getPrevTradingDate(allDates, pickedStartStr) ?? pickedStartStr;

    const candidateDates = allDates.filter(
      (d) => d >= candidateStartStr && d <= pickedEndStr,
    );

    const line1Map = buildDateValueMap(line1Data);
    const line2Map = buildDateValueMap(line2Data);

    const round4 = (v: number) => Number(v.toFixed(4));

    const round4Nullable = (v: number | null) =>
      v === null ? null : round4(v);

    const percentSeriesFromMap = (
      dateAxis: string[],
      valueMap: Map<string, number>,
      baseIndex: number,
    ) => {
      const baseDate = dateAxis[baseIndex];
      const base = baseDate ? valueMap.get(baseDate) : undefined;
      if (base === undefined || base === 0) {
        return dateAxis.map(() => 0);
      }
      return dateAxis.map((d) => {
        const v = valueMap.get(d);
        if (v === undefined) return null;
        return ((v - base) / base) * 100;
      });
    };

    const subtractSeriesFromMap = (
      dateAxis: string[],
      rawMap: Map<string, number>,
      baseIndex: number,
    ) => {
      const baseDate = dateAxis[baseIndex];
      const base = baseDate ? rawMap.get(baseDate) : undefined;
      const baseValue = base ?? 0;
      return dateAxis.map((d) => {
        const v = rawMap.get(d);
        if (v === undefined) return null;
        return v - baseValue;
      });
    };

    const line2ShapeBase0 = (() => {
      const baseDate = candidateDates[0];
      const base = baseDate ? line2Map.get(baseDate) : undefined;
      if (base === undefined || base === 0) return candidateDates.map(() => 0);
      return candidateDates.map((d) => {
        const v = line2Map.get(d);
        if (v === undefined) return 0;
        return ((v - base) / base) * 100;
      });
    })();

    const overlayRawSeriesCandidate = overlaySelected.map((item, idx) => {
      const seed = hashStringTo01(item.securityId);
      const amplitude = 0.2 + seed * 0.8;
      const phase = seed * Math.PI * 2;
      const drift = (seed - 0.5) * 0.08;
      const data = line2ShapeBase0.map((p, i) => {
        const wobble = Math.sin(i / 7 + phase) * amplitude;
        return round4(p + wobble + i * drift);
      });
      const rawMap = new Map<string, number>();
      candidateDates.forEach((d, i) => {
        const v = data[i];
        if (v !== undefined && v !== null) rawMap.set(d, v);
      });
      return {
        id: `overlay-${item.securityId}`,
        name: item.securityName,
        type: 'line',
        rawMap,
        symbol: 'emptyCircle',
        showSymbol: false,
        symbolSize: 6,
        lineStyle: {
          width: 1.5,
          color: overlayPalette[idx % overlayPalette.length],
        },
        itemStyle: { color: overlayPalette[idx % overlayPalette.length] },
        emphasis: { focus: 'series', scale: true },
      };
    });

    const requiredMaps: Array<Map<string, unknown>> = [
      line1Map as unknown as Map<string, unknown>,
      line2Map as unknown as Map<string, unknown>,
      ...(overlaySelected.length > 0
        ? overlayRawSeriesCandidate.map(
            (s) => s.rawMap as unknown as Map<string, unknown>,
          )
        : []),
    ];

    const computedBaseDate =
      findFirstCompleteDate(candidateDates, requiredMaps) ??
      findFirstCompleteDate(candidateDates, [
        line1Map as unknown as Map<string, unknown>,
        line2Map as unknown as Map<string, unknown>,
      ]) ??
      candidateDates[0] ??
      null;

    const baseIndexInCandidate =
      computedBaseDate && candidateDates.length > 0
        ? Math.max(0, candidateDates.indexOf(computedBaseDate))
        : 0;

    const dates =
      candidateDates.length > 0
        ? candidateDates.slice(baseIndexInCandidate)
        : [];

    const buildOverlayPointSeries = (baseIndex: number) => ({
      id: 'overlay-point',
      name: '叠加点',
      type: 'scatter',
      data: dates.length > 0 ? [[dates[baseIndex], 0]] : [],
      symbol: 'circle',
      symbolSize: 6,
      itemStyle: {
        color: '#FECA7A',
      },
      tooltip: { show: true },
      emphasis: { disabled: true },
      z: 10,
    });

    const mainLine1Name = response.unitNavs[0].securityName;
    const mainLine1SeriesBase = {
      id: 'main-1',
      name: mainLine1Name,
      type: 'line',
      itemStyle: {
        color: mainLine1Name === '中证REITs全收益' ? '#486EBD' : '#5b8ff9',
      },
      symbol: 'emptyCircle',
      showSymbol: false,
      symbolSize: 6,
      lineStyle: {
        width: 2,
      },
      ...(mainLine1Name === '中证REITs全收益'
        ? {
            areaStyle: {
              color: 'rgba(72, 110, 188, 0.1)',
              origin: 'start',
            },
          }
        : {}),
      emphasis: {
        focus: 'series',
        scale: true,
      },
    };

    const mainLine2Name = response.unitNavs[1].securityName;
    const mainLine2SeriesBase = {
      id: 'main-2',
      name: mainLine2Name,
      type: 'line',
      itemStyle: {
        color: mainLine2Name === '中证REITs全收益' ? '#486EBD' : '#FF7D7D',
      },
      symbol: 'emptyCircle',
      showSymbol: false,
      symbolSize: 6,
      lineStyle: {
        width: 2,
      },
      ...(mainLine2Name === '中证REITs全收益'
        ? {
            areaStyle: {
              color: 'rgba(72, 110, 188, 0.1)',
              origin: 'start',
            },
          }
        : {}),
      emphasis: {
        focus: 'series',
        scale: true,
      },
    };

    const buildSeries = (baseIndex: number) => {
      const overlayPointSeries = buildOverlayPointSeries(baseIndex);
      const mainLine1Series = {
        ...mainLine1SeriesBase,
        data: percentSeriesFromMap(dates, line1Map, baseIndex).map(
          round4Nullable,
        ),
      };
      const mainLine2Series = {
        ...mainLine2SeriesBase,
        data: percentSeriesFromMap(dates, line2Map, baseIndex).map(
          round4Nullable,
        ),
      };
      const overlaySeries = overlayRawSeriesCandidate.map(
        ({ rawMap, ...rest }) => ({
          ...rest,
          data: subtractSeriesFromMap(dates, rawMap, baseIndex).map(
            round4Nullable,
          ),
        }),
      );

      return overlaySelected.length > 0
        ? [
            overlayPointSeries,
            mainLine1Series,
            mainLine2Series,
            ...overlaySeries,
          ]
        : [mainLine1Series, overlayPointSeries, mainLine2Series];
    };

    const option: echarts.EChartsOption = {
      backgroundColor: '#fff',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          snap: true,
          lineStyle: {
            color: '#DFE5F2',
            width: 1,
          },
        },
        formatter: (params: any) => {
          let result = `<div style="margin-bottom: 5px; color: #777E8C; font-size: 12px;">${params[0].axisValue}</div>`;
          params.forEach((param: any) => {
            const rawVal = Array.isArray(param.value)
              ? param.value?.[1]
              : param.value;
            const val =
              typeof rawVal === 'number' && Number.isFinite(rawVal)
                ? rawVal.toFixed(2) + '%'
                : '--';
            const color = param.color;
            result += `
              <div style="display: flex; align-items: center; margin-top: 5px;">
                <span style="display:inline-block;margin-right:5px;border-radius:2px;width:10px;height:10px;background-color:${color};"></span>
                <span style="color: #535966; flex: 1; margin-right: 10px;">${param.seriesName}</span>
                <span style="font-weight: 500; color: #535966;">${val}</span>
              </div>
            `;
          });
          return result;
        },
        backgroundColor: '#fff',
        borderColor: '#eee',
        borderWidth: 1,
        padding: 10,
        textStyle: {
          color: '#333',
        },
        extraCssText:
          'box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-radius: 4px;',
      },
      legend: {
        show: true,
        type: 'scroll',
        orient: 'horizontal',
        top: 0,
        left: 'center',
        icon: 'rect',
        itemWidth: 12,
        itemHeight: 12,
        pageButtonPosition: 'end',
        pageButtonGap: 8,
        pageIconSize: 12,
        textStyle: {
          rich: {
            a: {
              verticalAlign: 'middle',
            },
          },
          padding: [0, 0, 0, 0],
        },
        data: [
          mainLine1Name,
          {
            name: '叠加点',
          },
          mainLine2Name,
          ...overlaySelected.map((it) => it.securityName),
        ],
      },
      grid: {
        show: true,
        backgroundColor: '#F2F5FA',
        borderWidth: 0,
        left: '4%',
        right: '4%',
        bottom: '15%',
        top: '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates,
        axisLine: {
          lineStyle: {
            color: '#DFE5F2',
          },
        },
        axisLabel: {
          color: '#777E8C',
          formatter: (value: string) => value, // Simple date format
          rotate: 30, // Rotate labels to match screenshot
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#DFE5F2',
          },
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}%',
          color: '#777E8C',
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#DFE5F2',
          },
        },
        axisLine: {
          lineStyle: {
            color: '#DFE5F2',
          },
        },
      },
      dataZoom: [
        {
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          start: 0,
          end: 100,
          height: 20,
          bottom: 10,
          borderColor: 'transparent',
          backgroundColor: '#f5f5f5',
          fillerColor: 'rgba(78, 115, 223, 0.1)',
          handleStyle: {
            color: '#4e73df',
            borderColor: '#4e73df',
          },
          moveHandleStyle: {
            color: '#4e73df',
          },
          selectedDataBackground: {
            lineStyle: { color: '#4e73df' },
            areaStyle: { color: '#4e73df' },
          },
        },
      ],
      series: buildSeries(0),
    };

    baseIndexRef.current = 0;
    chartInstance.current.setOption(option, { notMerge: true });

    chartInstance.current.off('datazoom');
    const handleDataZoom = (ev: any) => {
      const batch = ev?.batch?.[0] ?? ev;
      let nextBaseIndex = 0;

      const startValue = batch?.startValue;
      if (typeof startValue === 'number') {
        nextBaseIndex = startValue;
      } else if (typeof startValue === 'string') {
        const idx = dates.indexOf(startValue);
        nextBaseIndex = idx >= 0 ? idx : 0;
      } else if (typeof batch?.start === 'number' && dates.length > 1) {
        nextBaseIndex = Math.floor((batch.start / 100) * (dates.length - 1));
      }

      if (nextBaseIndex < 0) nextBaseIndex = 0;
      if (nextBaseIndex > dates.length - 1) nextBaseIndex = dates.length - 1;

      if (nextBaseIndex === baseIndexRef.current) return;
      baseIndexRef.current = nextBaseIndex;
      chartInstance.current?.setOption(
        { series: buildSeries(nextBaseIndex) },
        { lazyUpdate: true },
      );
    };
    chartInstance.current.on('datazoom', handleDataZoom);

    // 防抖：避免连续触发 resize 导致多次重绘，用 RAF 保证只在下一帧执行一次图表重绘
    let rafId = 0;
    const scheduleResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        chartInstance.current?.resize();
      });
    };

    // 立即执行一次，确保图表初始尺寸正确
    scheduleResize();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        scheduleResize();
      });
      resizeObserver.observe(chartRef.current);
    } else {
      window.addEventListener('resize', scheduleResize);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', scheduleResize);
      }
      chartInstance.current?.off('datazoom', handleDataZoom);
    };
  }, [dateRange, overlaySelected]);

  const overlayContent = (
    <div
      style={{
        width: 280,
        height: 280,
        background: '#fff',
        borderRadius: 6,
        boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: 12,
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Select<string | null>
          ref={overlaySelectRef}
          value={overlaySelectValue}
          options={overlayAvailableOptions}
          placeholder="请选择叠加券"
          showSearch
          searchValue={overlaySearch}
          onSearch={setOverlaySearch}
          optionFilterProp="label"
          popupClassName={styles.overlaySelectPopup}
          style={{ width: '100%' }}
          filterOption={(input, option) => {
            const q = input.trim().toLowerCase();
            const label = (option?.label ?? '').toString().toLowerCase();
            const value = (option?.value ?? '').toString().toLowerCase();
            return label.includes(q) || value.includes(q);
          }}
          onSelect={(id) => {
            setOverlaySelectValue(null);
            if (!id) return;
            const hit = securityItemMap.get(id);
            if (!hit) return;
            setOverlayDraft((prev) => {
              if (prev.length >= OVERLAY_LIMIT) {
                message.warning(`最多可叠加${OVERLAY_LIMIT}个指数`);
                return prev;
              }
              if (prev.some((x) => x.securityId === id)) return prev;
              return [...prev, hit];
            });
            setOverlaySearch('');
            requestAnimationFrame(() => overlaySelectRef.current?.blur?.());
          }}
        />

        <div style={{ marginTop: 10, flex: 1, overflow: 'hidden' }}>
          {overlayDraft.length > 0 ? (
            <div
              style={{
                border: '1px solid #F0F2F5',
                borderRadius: 4,
                overflow: 'hidden',
                background: '#fff',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div className={styles.overlayDraftScroll} style={{ flex: 1 }}>
                {overlayDraft.map((it, idx) => (
                  <div
                    key={it.securityId}
                    style={{
                      height: 34,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 10px',
                      borderBottom:
                        idx === overlayDraft.length - 1
                          ? undefined
                          : '1px solid #F0F2F5',
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        color: '#1D1E26',
                        fontSize: 13,
                      }}
                      title={it.securityName}
                    >
                      {it.securityName}
                    </div>
                    <CloseOutlined
                      style={{
                        color: '#A1A5B2',
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        setOverlayDraft((prev) =>
                          prev.filter((x) => x.securityId !== it.securityId),
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<span style={{ color: '#A1A5B2' }}>暂无数据</span>}
              />
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          padding: '0 12px',
          background: '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            style={{ padding: 0, height: 'auto', color: '#3D61A9' }}
            onClick={clearOverlay}
          >
            清空
          </Button>
          <Button onClick={cancelOverlay}>取消</Button>
          <Button
            type="primary"
            style={{ backgroundColor: '#4e73df', borderColor: '#4e73df' }}
            onClick={commitOverlay}
          >
            确认
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '8px',
        minHeight: '500px',
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: '4px',
              height: '16px',
              background: '#4e73df',
              marginRight: '8px',
              borderRadius: '2px',
            }}
          ></div>
          <span style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
            {response.securityCode} {response.unitNavs[1].securityName}
          </span>
          {/* The title in screenshot is "932006 中证REITs(收盘)", using second series name as per screenshot */}
        </div>

        <Space size="middle">
          <Popover
            open={overlayOpen}
            onOpenChange={(next) => {
              setOverlayOpen(next);
              if (next) {
                setOverlayDraft(overlaySelected);
              } else {
                setOverlayDraft(overlaySelected);
              }
              setOverlaySearch('');
              setOverlaySelectValue(null);
            }}
            placement="bottomRight"
            trigger="click"
            arrow={false}
            content={overlayContent}
            overlayInnerStyle={{
              padding: 0,
              borderRadius: 6,
              width: 280,
              height: 280,
            }}
          >
            <Button
              type="primary"
              style={{ backgroundColor: '#4e73df', borderColor: '#4e73df' }}
            >
              超级叠加
            </Button>
          </Popover>
          <RangePicker
            value={dateRange}
            onChange={(dates) => {
              if (dates && dates[0] && dates[1]) {
                setDateRange([dates[0], dates[1]]);
              }
            }}
            allowClear={false}
            style={{ width: '260px' }}
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
        </Space>
      </div>

      {/* Chart Section */}
      <div ref={chartRef} style={{ width: '100%', height: '509px' }} />
    </div>
  );
};

export default IncomeChart;
