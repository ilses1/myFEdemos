import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';

const LineChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Initialize chart
    const myChart = echarts.init(chartRef.current);

    // Chart configuration
    const option = {
      title: {
        text: '简单的折线图示例'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['销售额', '访问量']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '销售额',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '访问量',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310]
        }
      ]
    };

    // Set options
    myChart.setOption(option);

    // Handle resize
    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      myChart.dispose();
    };
  }, []);

  return (
    <PageContainer>
      <Card>
        <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
      </Card>
    </PageContainer>
  );
};

export default LineChart;
