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

  // Filter and normalize data based on date range
  const getProcessedData = () => {
    const [start, end] = dateRange;
    const startDateStr = start.format('YYYY-MM-DD');
    const endDateStr = end.format('YYYY-MM-DD');

    const filterAndNormalize = (data: typeof line1Data) => {
      const filtered = data.filter(
        (item) =>
          item.unitNavDate >= startDateStr && item.unitNavDate <= endDateStr,
      );

      if (filtered.length === 0) return [];

      const baseValue = filtered[0].unitNavValue;
      return filtered.map((item) => ({
        date: item.unitNavDate,
        value: item.unitNavValue,
        percentage: ((item.unitNavValue - baseValue) / baseValue) * 100,
      }));
    };

    return {
      line1: filterAndNormalize(line1Data),
      line2: filterAndNormalize(line2Data),
    };
  };

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const { line1, line2 } = getProcessedData();

    // Common dates (assuming both lines align on dates, which is typical)
    const dates = line1.map((item) => item.date);

    const overlaySeries = overlaySelected.map((item, idx) => {
      const seed = hashStringTo01(item.securityId);
      const amplitude = 0.2 + seed * 0.8;
      const phase = seed * Math.PI * 2;
      const drift = (seed - 0.5) * 0.08;
      const data = line2.map((p, i) => {
        const wobble = Math.sin(i / 7 + phase) * amplitude;
        return Number((p.percentage + wobble + i * drift).toFixed(4));
      });
      return {
        name: item.securityName,
        type: 'line',
        data,
        symbol: 'none',
        lineStyle: {
          width: 1.5,
          color: overlayPalette[idx % overlayPalette.length],
        },
        itemStyle: { color: overlayPalette[idx % overlayPalette.length] },
        emphasis: { focus: 'series' },
      };
    });

    const overlayPointSeries = {
      name: '叠加点',
      type: 'line',
      data: [],
      itemStyle: {
        color: '#FECA7A',
      },
      lineStyle: { color: '#FECA7A', width: 2 },
      symbol: 'circle',
      symbolSize: 6,
    };

    const mainLine1Name = response.unitNavs[0].securityName;
    const mainLine1Series = {
      name: mainLine1Name,
      type: 'line',
      data: line1.map((item) => item.percentage),
      itemStyle: {
        color: mainLine1Name === '中证REITs全收益' ? '#486EBD' : '#5b8ff9',
      },
      symbol: 'none',
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
      },
    };

    const mainLine2Name = response.unitNavs[1].securityName;
    const mainLine2Series = {
      name: mainLine2Name,
      type: 'line',
      data: line2.map((item) => item.percentage),
      itemStyle: {
        color: mainLine2Name === '中证REITs全收益' ? '#486EBD' : '#FF7D7D',
      },
      symbol: 'none',
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
      },
    };

    const series =
      overlaySelected.length > 0
        ? [
            overlayPointSeries,
            mainLine1Series,
            mainLine2Series,
            ...overlaySeries,
          ]
        : [mainLine1Series, overlayPointSeries, mainLine2Series];

    const option: echarts.EChartsOption = {
      backgroundColor: '#fff',
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          let result = `<div style="margin-bottom: 5px; color: #666; font-size: 12px;">${params[0].axisValue}</div>`;
          params.forEach((param: any) => {
            const val = param.value.toFixed(2) + '%';
            const color = param.color;
            result += `
              <div style="display: flex; align-items: center; margin-top: 5px;">
                <span style="display:inline-block;margin-right:5px;border-radius:2px;width:10px;height:10px;background-color:${color};"></span>
                <span style="color: #666; flex: 1; margin-right: 10px;">${param.seriesName}</span>
                <span style="font-weight: 500; color: #333;">${val}</span>
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
      },
      grid: {
        show: true,
        backgroundColor: '#F2F5FA',
        borderWidth: 0,
        left: '4%',
        right: '4%',
        bottom: '15%', // Space for dataZoom
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
      series,
    };

    chartInstance.current.setOption(option);

    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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
        <Select<string>
          ref={overlaySelectRef}
          value={undefined}
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
        padding: '20px',
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
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default IncomeChart;
