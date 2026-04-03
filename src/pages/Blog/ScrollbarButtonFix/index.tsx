import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import ArticleRenderer from '../ArticleRenderer';

const meta = {
  title: '滚动条上下按钮隐藏不生效的原因与修复',
  date: '2026-04-03',
  readTime: '5 min read',
  tags: ['CSS', 'WebKit', '滚动条'],
  mdFile: '/blog/scrollbar-button-fix.md',
};

const ScrollbarButtonFix: React.FC = () => {
  return (
    <PageContainer header={{ title: null }}>
      <ArticleRenderer meta={meta} />
    </PageContainer>
  );
};

export default ScrollbarButtonFix;
