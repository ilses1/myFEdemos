import { CameraOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Select } from 'antd';
import * as echarts from 'echarts';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.less';

const LineChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [activeCard, setActiveCard] = useState<'scale' | 'index' | null>(
    'scale',
  );
  const [dateRangeType, setDateRangeType] = useState<string>('3year');

  // State for card statistics
  const [stats, setStats] = useState({
    index: {
      current: '0.00',
      change: '0.00',
      changePercent: '0.00%',
      range: '',
      isUp: true,
    },
    scale: {
      current: '0.00',
      change: '0.00',
      changePercent: '0.00%',
      range: '',
      isUp: true,
    },
    holdings: {
      date: '',
      instValue: '-',
      instPercent: '-',
      personalValue: '-',
      personalPercent: '-',
    },
  });

  // Generate Mock Data (Memoized)
  const fullData = useMemo(() => {
    const dates: string[] = [];
    const indexData: string[] = [];
    const scaleData: string[] = [];
    const instHoldings: (string | null)[] = [];
    const personalHoldings: (string | null)[] = [];

    let baseIndex = 3650;
    let baseScale = 0.5;

    for (let year = 2023; year <= 2025; year++) {
      for (let month = 1; month <= 12; month++) {
        const dateStr = `${year}-${month.toString().padStart(2, '0')}`;
        dates.push(dateStr);

        baseIndex += (Math.random() - 0.45) * 20;
        if (baseIndex < 3600) baseIndex += 10;
        if (baseIndex > 3850) baseIndex -= 10;
        indexData.push(baseIndex.toFixed(2));

        baseScale += (Math.random() - 0.35) * 0.04;
        if (baseScale < 0.5) baseScale += 0.05;
        scaleData.push(baseScale.toFixed(2));

        if (month === 6 || month === 12) {
          const total = parseFloat(baseScale.toFixed(2));
          // Randomize ratio more visibly (20% - 70%)
          const instRatio = 0.2 + Math.random() * 0.5;
          const inst = total * instRatio;
          instHoldings.push(inst.toFixed(2));
          personalHoldings.push((total - inst).toFixed(2));
        } else {
          instHoldings.push(null);
          personalHoldings.push(null);
        }
      }
    }
    return { dates, indexData, scaleData, instHoldings, personalHoldings };
  }, []);

  // Update Stats based on data range indices
  const updateStats = (startIndex: number, endIndex: number) => {
    const { dates, indexData, scaleData, instHoldings, personalHoldings } =
      fullData;

    // Ensure indices are within bounds
    const start = Math.max(0, startIndex);
    const end = Math.min(dates.length - 1, endIndex);

    // Date Range String
    const rangeStr = `${dates[start]} 至 ${dates[end]}`;

    // Index Stats
    const indexStart = parseFloat(indexData[start]);
    const indexEnd = parseFloat(indexData[end]);
    const indexChange = indexEnd - indexStart;
    const indexChangePercent = (indexChange / indexStart) * 100;

    // Scale Stats
    const scaleStart = parseFloat(scaleData[start]);
    const scaleEnd = parseFloat(scaleData[end]);
    const scaleChange = scaleEnd - scaleStart;
    const scaleChangePercent = (scaleChange / scaleStart) * 100;

    // Holdings Stats
    let nearestHoldingIndex = -1;
    // Find the nearest valid holding data <= end index and >= start index
    for (let i = end; i >= start; i--) {
      if (instHoldings[i] !== null) {
        nearestHoldingIndex = i;
        break;
      }
    }

    let holdingsStat = {
      date:
        nearestHoldingIndex !== -1
          ? `截至${dates[nearestHoldingIndex]}`
          : '无数据',
      instValue: '-',
      instPercent: '-',
      personalValue: '-',
      personalPercent: '-',
    };

    if (nearestHoldingIndex !== -1) {
      const instVal = parseFloat(instHoldings[nearestHoldingIndex]!);
      const personalVal = parseFloat(personalHoldings[nearestHoldingIndex]!);
      const totalVal = instVal + personalVal;

      holdingsStat = {
        date: `截至${dates[nearestHoldingIndex]}`,
        instValue: instVal.toFixed(2) + '亿元',
        instPercent: Math.round((instVal / totalVal) * 100) + '%',
        personalValue: personalVal.toFixed(2) + '亿元',
        personalPercent: Math.round((personalVal / totalVal) * 100) + '%',
      };
    }

    setStats({
      index: {
        current: indexEnd.toFixed(2),
        change: (indexChange > 0 ? '+' : '') + indexChange.toFixed(0),
        changePercent:
          (indexChange > 0 ? '+' : '') + indexChangePercent.toFixed(1) + '%',
        range: rangeStr,
        isUp: indexChange >= 0,
      },
      scale: {
        current: scaleEnd.toFixed(2) + '亿元',
        change: (scaleChange > 0 ? '+' : '') + scaleChange.toFixed(2),
        changePercent:
          (scaleChange > 0 ? '+' : '') + scaleChangePercent.toFixed(1) + '%',
        range: rangeStr,
        isUp: scaleChange >= 0,
      },
      holdings: holdingsStat,
    });
  };

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);
    chartInstance.current = myChart;

    const option: echarts.EChartsOption = {
      backgroundColor: '#fff',
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
            fontFamily: '苹方-简',
            fontSize: 12,
            fontWeight: 'normal',
            lineHeight: 18,
            color: '#FFFFFF',
            padding: [4, 6],
          },
        },
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#f0f0f0',
        borderWidth: 1,
        padding: [12, 16],
        textStyle: { color: '#333', fontSize: 12 },
        formatter: (params: any) => {
          const date = params[0].axisValue;
          let res = `<div style="font-weight:600;margin-bottom:8px;color:#1D1E26;">${date}</div>`;
          params.forEach((item: any) => {
            if (
              item.value !== null &&
              item.value !== undefined &&
              item.value !== 'NaN'
            ) {
              let val = item.value;
              let unit = '';
              let label = item.seriesName;
              if (label.includes('规模') || label.includes('持仓'))
                unit = '亿元';

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
      legend: { show: false },
      grid: {
        left: '2%',
        right: '2%',
        bottom: '12%',
        top: '10%',
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
          handleStyle: { color: '#ff7875', borderColor: '#ff7875' },
          moveHandleStyle: { color: '#ff7875' },
          selectedDataBackground: {
            lineStyle: { color: '#ff4d4f' },
            areaStyle: { color: '#ffccc7' },
          },
        },
      ],
      xAxis: {
        type: 'category',
        data: fullData.dates,
        axisLine: { lineStyle: { color: '#f0f0f0' } },
        axisTick: { show: false },
        axisLabel: {
          color: '#777B8C',
          lineHeight: 18,
          formatter: (value: string) => {
            const [y, m] = value.split('-');
            const monthInt = parseInt(m);
            if (monthInt === 1) return `${monthInt}月\n${y}`;
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
          axisLabel: { color: '#777B8C' },
          splitLine: { lineStyle: { type: 'dashed', color: '#D7DAE0' } },
          nameTextStyle: { color: '#777B8C', padding: [0, 0, 0, -40] },
        },
        {
          type: 'value',
          name: '规模 (亿)',
          position: 'right',
          min: 0.0,
          max: 1.0,
          axisLabel: { color: '#777B8C' },
          splitLine: { show: false },
          nameTextStyle: { color: '#777B8C', padding: [0, 0, 0, -10] },
        },
      ],
      series: [
        {
          name: '指数趋势',
          type: 'line',
          data: fullData.indexData,
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          showSymbol: false,
          yAxisIndex: 0,
          lineStyle: { color: '#763FAF', width: 2 },
          itemStyle: {
            color: '#FFFFFF',
            borderColor: '#763FAF',
            borderWidth: 2,
          },
        },
        {
          name: '规模趋势',
          type: 'line',
          data: fullData.scaleData,
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          showSymbol: false,
          yAxisIndex: 1,
          lineStyle: { color: '#BF0008', width: 2 },
          itemStyle: {
            color: '#FFFFFF',
            borderColor: '#BF0008',
            borderWidth: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(191, 0, 8, 0.1)' },
              { offset: 1, color: 'rgba(191, 0, 8, 0)' },
            ]),
          },
        },
        {
          name: '机构持仓',
          type: 'bar',
          stack: 'holding',
          data: fullData.instHoldings,
          yAxisIndex: 1,
          barWidth: 32,
          itemStyle: { color: '#005E91' },
        },
        {
          name: '个人持仓',
          type: 'bar',
          stack: 'holding',
          data: fullData.personalHoldings,
          yAxisIndex: 1,
          barWidth: 32,
          itemStyle: { color: '#D6AE6D' },
        },
      ],
    };

    myChart.setOption(option);

    // Initial Stats
    updateStats(0, fullData.dates.length - 1);

    // Event Listener for DataZoom
    myChart.on('dataZoom', (params: any) => {
      // params can be batch or single object.
      // We get the current option to be safe.
      const currentOption = myChart.getOption() as any;
      const startValue = currentOption.dataZoom[0].startValue;
      const endValue = currentOption.dataZoom[0].endValue;

      let startIdx = 0;
      let endIdx = fullData.dates.length - 1;

      if (typeof startValue === 'number') {
        startIdx = startValue;
        endIdx = endValue;
      } else {
        const startPercent = currentOption.dataZoom[0].start;
        const endPercent = currentOption.dataZoom[0].end;
        startIdx = Math.floor(
          (startPercent / 100) * (fullData.dates.length - 1),
        );
        endIdx = Math.floor((endPercent / 100) * (fullData.dates.length - 1));
      }

      updateStats(startIdx, endIdx);
    });

    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      myChart.dispose();
      chartInstance.current = null;
    };
  }, [fullData]);

  const handleRangeChange = (value: string) => {
    setDateRangeType(value);
    if (!chartInstance.current) return;

    const totalDataPoints = fullData.dates.length;
    let startPercent = 0;

    // Total is 3 years (36 months).
    if (value === '0.5year') {
      // Last 6 months approx
      startPercent = ((totalDataPoints - 6) / totalDataPoints) * 100;
    } else if (value === '1year') {
      // Last 12 months
      startPercent = ((totalDataPoints - 12) / totalDataPoints) * 100;
    } else {
      // 3 years (Full)
      startPercent = 0;
    }

    if (startPercent < 0) startPercent = 0;

    chartInstance.current.dispatchAction({
      type: 'dataZoom',
      start: startPercent,
      end: 100,
    });
  };

  const handleScreenshot = async () => {
    const instance = chartInstance.current;
    const container = chartRef.current;
    if (!instance || !container) return;

    const exportWidth = 1600;
    const currentWidth = container.clientWidth || exportWidth;
    const currentHeight = container.clientHeight || 300;
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
      window.setTimeout(cleanup, 300);
    });

    const hiResDataUrl = exportChart.getDataURL({
      type: 'png',
      pixelRatio: 2,
      backgroundColor: '#fff',
    });

    const resolvedSrcCanvas = await new Promise<HTMLCanvasElement>(
      (resolve) => {
        const img = new Image();
        img.src = hiResDataUrl;
        const canvas = document.createElement('canvas');
        canvas.width = exportWidth * 2;
        canvas.height = exportHeight * 2;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(canvas);
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          resolve(canvas);
        };
        img.onerror = () => resolve(canvas);
      },
    );

    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = exportWidth;
    outputCanvas.height = exportHeight;
    const outputCtx = outputCanvas.getContext('2d');
    if (outputCtx) {
      outputCtx.imageSmoothingEnabled = true;
      outputCtx.imageSmoothingQuality = 'high';
      outputCtx.drawImage(resolvedSrcCanvas, 0, 0, exportWidth, exportHeight);
    }

    const link = document.createElement('a');
    link.href = outputCanvas.toDataURL('image/png');
    link.download = `linechart-${exportWidth}w-${Date.now()}.png`;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();

    exportChart.dispose();
    exportDom.remove();
  };

  return (
    <PageContainer ghost>
      <Card className={styles.mainCard}>
        <div className={styles.headerRow}>
          <div className={styles.pageTitle}>挂钩ETF规模变化</div>
          <Select
            value={dateRangeType}
            onChange={handleRangeChange}
            style={{ width: 100 }}
            bordered={true}
            options={[
              { value: '0.5year', label: '近半年' },
              { value: '1year', label: '近一年' },
              { value: '3year', label: '近三年' },
            ]}
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
              <span className={styles.dateRange}>{stats.index.range}</span>
            </div>
            <div className={styles.cardContent}>
              <span className={styles.mainValue}>{stats.index.current}</span>
              <span
                className={`${styles.subValue} ${
                  stats.index.isUp ? styles.up : styles.down
                }`}
              >
                {stats.index.change}({stats.index.changePercent})
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
                  style={{ background: '#BF0008' }}
                ></span>
                规模趋势
              </div>
              <span className={styles.dateRange}>{stats.scale.range}</span>
            </div>
            <div className={styles.cardContent}>
              <span className={styles.mainValue}>{stats.scale.current}</span>
              <span
                className={`${styles.subValue} ${
                  stats.scale.isUp ? styles.up : styles.down
                }`}
              >
                {stats.scale.change}({stats.scale.changePercent})
              </span>
            </div>
          </div>

          {/* Card 3: Holdings */}
          <div className={`${styles.overviewCard} ${styles.grey}`}>
            <div
              className={styles.cardHeader}
              style={{ marginBottom: 12, justifyContent: 'space-between' }}
            >
              <div style={{ display: 'flex', gap: '20px' }}>
                <div
                  className={styles.holdingTitle}
                  style={{ marginBottom: 0 }}
                >
                  <span
                    className={styles.dot}
                    style={{ background: '#10476e' }}
                  ></span>
                  机构持仓
                </div>
                <div
                  className={styles.holdingTitle}
                  style={{ marginBottom: 0 }}
                >
                  <span
                    className={styles.dot}
                    style={{ background: '#dcb670' }}
                  ></span>
                  个人持仓
                </div>
              </div>
              <span className={styles.dateRange}>{stats.holdings.date}</span>
            </div>
            <div className={styles.holdingsRow}>
              <div className={styles.holdingItem}>
                <div>
                  <span className={styles.holdingValue}>
                    {stats.holdings.instValue}
                  </span>
                  <span className={styles.holdingPercent}>
                    {stats.holdings.instPercent}
                  </span>
                </div>
              </div>
              <div className={styles.holdingItem}>
                <div>
                  <span className={styles.holdingValue}>
                    {stats.holdings.personalValue}
                  </span>
                  <span className={styles.holdingPercent}>
                    {stats.holdings.personalPercent}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.chartWrapper}>
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
          <div className={styles.chartContainer} ref={chartRef} />
        </div>
      </Card>
    </PageContainer>
  );
};

export default LineChart;
