import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import ArticleRenderer from '../ArticleRenderer';

const meta = {
  title: 'ECharts Legend 图标与文字垂直居中对齐：rich + padding 实战',
  date: '2026-04-03',
  readTime: '4 min read',
  tags: ['ECharts', '可视化', 'CSS'],
  mdFile: '/blog/echarts-legend-align.md',
};

const EchartsLegendAlign: React.FC = () => {
  return (
    <PageContainer header={{ title: null }}>
      <ArticleRenderer meta={meta} />
    </PageContainer>
  );
};

export default EchartsLegendAlign;
