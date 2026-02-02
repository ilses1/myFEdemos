import { Button, ConfigProvider, DatePicker, Space } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs, { Dayjs } from 'dayjs';
import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';
import { response } from './const';

const { RangePicker } = DatePicker;

const IncomeChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

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

    const option: echarts.EChartsOption = {
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
        top: 0,
        icon: 'rect',
        itemWidth: 12,
        itemHeight: 12,
        data: [
          { name: response.unitNavs[0].securityName },
          { name: '叠加点', icon: 'rect', itemStyle: { color: '#f6bd16' } }, // Dummy for UI match
          { name: response.unitNavs[1].securityName },
        ],
      },
      grid: {
        left: '3%',
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
            color: '#e0e0e0',
          },
        },
        axisLabel: {
          color: '#999',
          formatter: (value: string) => value, // Simple date format
          rotate: 30, // Rotate labels to match screenshot
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}%',
          color: '#999',
        },
        splitLine: {
          lineStyle: {
            color: '#f0f0f0',
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
      series: [
        {
          name: response.unitNavs[0].securityName,
          type: 'line',
          data: line1.map((item) => item.percentage),
          itemStyle: {
            color: '#5b8ff9', // Blue
          },
          symbol: 'none',
          lineStyle: {
            width: 2,
          },
          emphasis: {
            focus: 'series',
          },
        },
        {
          name: '叠加点', // Dummy series to show in legend
          type: 'line',
          data: [],
          itemStyle: {
            color: '#f6bd16',
          },
        },
        {
          name: response.unitNavs[1].securityName,
          type: 'line',
          data: line2.map((item) => item.percentage),
          itemStyle: {
            color: '#ff7a85', // Red/Pink
          },
          symbol: 'none',
          lineStyle: {
            width: 2,
          },
          emphasis: {
            focus: 'series',
          },
        },
      ],
    };

    chartInstance.current.setOption(option);

    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dateRange]); // Re-render when dateRange changes

  return (
    <ConfigProvider locale={zhCN}>
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
            <span
              style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}
            >
              {response.securityCode} {response.unitNavs[1].securityName}
            </span>
            {/* The title in screenshot is "932006 中证REITs(收盘)", using second series name as per screenshot */}
          </div>

          <Space size="middle">
            <Button
              type="primary"
              style={{ backgroundColor: '#4e73df', borderColor: '#4e73df' }}
            >
              超级叠加
            </Button>
            <RangePicker
              value={dateRange}
              onChange={(dates) => {
                if (dates && dates[0] && dates[1]) {
                  setDateRange([dates[0], dates[1]]);
                }
              }}
              allowClear={false}
              style={{ width: '260px' }}
            />
          </Space>
        </div>

        {/* Chart Section */}
        <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
      </div>
    </ConfigProvider>
  );
};

export default IncomeChart;
