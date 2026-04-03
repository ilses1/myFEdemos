import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import ArticleRenderer from '../ArticleRenderer';

const meta = {
  title: '渐变背景为什么无法直接 transition？以及如何用颜色变量解决',
  date: '2026-04-03',
  readTime: '10 min read',
  tags: ['CSS', 'Animation', '@property'],
  mdFile: '/blog/css-gradient-transition.md',
};

const CssGradientTransition: React.FC = () => {
  return (
    <PageContainer header={{ title: null }}>
      <ArticleRenderer meta={meta} />
    </PageContainer>
  );
};

export default CssGradientTransition;
