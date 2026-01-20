import { PageContainer } from '@ant-design/pro-components';
import { Card, Select } from 'antd';
import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.less';

const LineChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<'scale' | 'index' | null>(
    'scale',
  );

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);

    // Mock Data Generation
    const dates = [];
    const indexData = [];
    const scaleData = [];
    const instHoldings = []; // 机构
    const personalHoldings = []; // 个人

    let baseIndex = 3650;
    let baseScale = 0.5;

    // Generate 36 months data (2023-01 to 2025-12)
    for (let year = 2023; year <= 2025; year++) {
      for (let month = 1; month <= 12; month++) {
        const dateStr = `${year}-${month.toString().padStart(2, '0')}`;
        dates.push(dateStr);

        // Random walk for lines
        baseIndex += (Math.random() - 0.45) * 20;
        if (baseIndex < 3600) baseIndex += 10;
        if (baseIndex > 3850) baseIndex -= 10;
        indexData.push(baseIndex.toFixed(2));

        baseScale += (Math.random() - 0.35) * 0.04;
        if (baseScale < 0.5) baseScale += 0.05;
        scaleData.push(baseScale.toFixed(2));

        // Holdings only on June (06) and Dec (12)
        if (month === 6 || month === 12) {
          const total = parseFloat(baseScale.toFixed(2));
          const inst = total * (0.35 + Math.random() * 0.1); // ~35-45%
          instHoldings.push(inst.toFixed(2));
          personalHoldings.push((total - inst).toFixed(2));
        } else {
          instHoldings.push(null);
          personalHoldings.push(null);
        }
      }
    }

    const option: echarts.EChartsOption = {
      backgroundColor: '#fff',
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#f0f0f0',
        borderWidth: 1,
        padding: [12, 16],
        textStyle: {
          color: '#333',
          fontSize: 12,
        },
        formatter: (params: any) => {
          const date = params[0].axisValue;
          let res = `<div style="font-weight:600;margin-bottom:12px;color:#333;">${date}</div>`;

          params.forEach((item: any) => {
            if (
              item.value !== null &&
              item.value !== undefined &&
              item.value !== 'NaN'
            ) {
              let val = item.value;
              let unit = '';
              let label = item.seriesName;

              // Unit handling
              if (label.includes('规模') || label.includes('持仓')) {
                unit = '亿元';
              }

              // Growth mock (random for demo)
              let growthHtml = '';
              if (label === '指数趋势') {
                growthHtml = `<span style="color:#ff4d4f;margin-left:8px;font-size:12px;">+9%</span>`;
              } else if (label === '规模趋势') {
                growthHtml = `<span style="color:#ff4d4f;margin-left:8px;font-size:12px;">+6.0%</span>`;
              }

              res += `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;min-width:180px;">
                            <span style="display:flex;align-items:center;color:#666;">
                                <span style="display:inline-block;width:8px;height:3px;background:${item.color};margin-right:8px;border-radius:2px;"></span>
                                ${label}
                            </span>
                            <div style="text-align:right;">
                                <span style="font-weight:600;color:#333;">${val}${unit}</span>
                                ${growthHtml}
                            </div>
                         </div>`;
            }
          });
          return res;
        },
      },
      legend: {
        show: false,
      },
      grid: {
        left: '2%',
        right: '2%',
        bottom: '12%',
        top: '12%',
        containLabel: true,
      },
      dataZoom: [
        {
          type: 'slider',
          show: true,
          height: 16,
          bottom: 10,
          start: 0,
          end: 100,
          borderColor: 'transparent',
          backgroundColor: '#f5f5f5',
          fillerColor: 'rgba(255, 77, 79, 0.15)',
          handleStyle: {
            color: '#ff7875',
            borderColor: '#ff7875',
          },
          moveHandleStyle: {
            color: '#ff7875',
          },
          selectedDataBackground: {
            lineStyle: { color: '#ff4d4f' },
            areaStyle: { color: '#ffccc7' },
          },
        },
      ],
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: { lineStyle: { color: '#f0f0f0' } },
        axisTick: { show: false },
        axisLabel: {
          color: '#999',
          interval: 0,
          formatter: (value: string) => {
            const [y, m] = value.split('-');
            const monthInt = parseInt(m);
            if (monthInt === 1) {
              return `${monthInt}月\n${y}`;
            }
            return `${monthInt}月`;
          },
          showMinLabel: true,
          showMaxLabel: true,
        },
      },
      yAxis: [
        {
          type: 'value',
          name: '指数点位',
          position: 'left',
          min: (value) => Math.floor(value.min / 50) * 50,
          max: (value) => Math.ceil(value.max / 50) * 50,
          axisLabel: { color: '#999' },
          splitLine: { lineStyle: { type: 'dashed', color: '#f0f0f0' } },
          nameTextStyle: { color: '#999', padding: [0, 0, 0, 10] },
        },
        {
          type: 'value',
          name: '规模 (亿)',
          position: 'right',
          min: 0.4,
          max: 1.0,
          axisLabel: { color: '#999' },
          splitLine: { show: false },
          nameTextStyle: { color: '#999', padding: [0, 0, 0, -10] },
        },
      ],
      series: [
        {
          name: '指数趋势',
          type: 'line',
          data: indexData,
          smooth: true,
          symbol: 'circle',
          symbolSize: 1,
          showSymbol: false,
          yAxisIndex: 0,
          lineStyle: { color: '#9254de', width: 2.5 },
          itemStyle: { color: '#9254de' },
        },
        {
          name: '规模趋势',
          type: 'line',
          data: scaleData,
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          showSymbol: false,
          yAxisIndex: 1,
          lineStyle: { color: '#ff4d4f', width: 2.5 },
          itemStyle: { color: '#ff4d4f' },
        },
        {
          name: '机构持仓',
          type: 'bar',
          stack: 'holding',
          data: instHoldings,
          yAxisIndex: 1,
          barWidth: 16,
          itemStyle: { color: '#10476e' }, // Dark Blue
        },
        {
          name: '个人持仓',
          type: 'bar',
          stack: 'holding',
          data: personalHoldings,
          yAxisIndex: 1,
          barWidth: 16,
          itemStyle: { color: '#dcb670' }, // Gold/Tan
        },
      ],
    };

    myChart.setOption(option);

    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      myChart.dispose();
    };
  }, []);

  return (
    <PageContainer ghost>
      <Card bodyStyle={{ padding: '24px 32px' }}>
        <div className={styles.headerRow}>
          <div className={styles.pageTitle}>挂钩ETF规模变化</div>
          <Select
            defaultValue="3year"
            style={{ width: 100 }}
            bordered={true}
            options={[{ value: '3year', label: '近三年' }]}
          />
        </div>

        <div className={styles.overviewCards}>
          {/* Card 1: Index */}
          <div
            className={`${styles.overviewCard} ${styles.purple} ${
              activeCard === 'index' ? styles.active : ''
            }`}
            onClick={() => setActiveCard('index')}
          >
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <span
                  className={styles.legendIcon}
                  style={{ background: '#9254de' }}
                ></span>
                指数趋势
              </div>
              <span className={styles.dateRange}>2023-01-01 至 2025-12-31</span>
            </div>
            <div className={styles.cardContent}>
              <span className={styles.mainValue}>3842.12</span>
              <span className={`${styles.subValue} ${styles.up}`}>
                +461(+12%)
              </span>
            </div>
          </div>

          {/* Card 2: Scale */}
          <div
            className={`${styles.overviewCard} ${styles.red} ${
              activeCard === 'scale' ? styles.active : ''
            }`}
            onClick={() => setActiveCard('scale')}
          >
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <span
                  className={styles.legendIcon}
                  style={{ background: '#ff4d4f' }}
                ></span>
                规模趋势
              </div>
              <span className={styles.dateRange}>2023-01-01 至 2025-12-31</span>
            </div>
            <div className={styles.cardContent}>
              <span className={styles.mainValue}>0.70亿元</span>
              <span className={`${styles.subValue} ${styles.up}`}>
                +0.22(+31.5%)
              </span>
            </div>
          </div>

          {/* Card 3: Holdings */}
          <div className={`${styles.overviewCard} ${styles.grey}`}>
            <div
              className={styles.cardHeader}
              style={{ justifyContent: 'flex-end', marginBottom: 12 }}
            >
              <span className={styles.dateRange}>截至2025-12-31</span>
            </div>
            <div className={styles.holdingsRow}>
              <div className={styles.holdingItem}>
                <div className={styles.holdingTitle}>
                  <span
                    className={styles.dot}
                    style={{ background: '#10476e' }}
                  ></span>
                  机构持仓
                </div>
                <div>
                  <span className={styles.holdingValue}>0.24亿元</span>
                  <span className={styles.holdingPercent}>34%</span>
                </div>
              </div>
              <div className={styles.holdingItem}>
                <div className={styles.holdingTitle}>
                  <span
                    className={styles.dot}
                    style={{ background: '#dcb670' }}
                  ></span>
                  个人持仓
                </div>
                <div>
                  <span className={styles.holdingValue}>0.46亿元</span>
                  <span className={styles.holdingPercent}>66%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.chartContainer} ref={chartRef} />
      </Card>
    </PageContainer>
  );
};

export default LineChart;
