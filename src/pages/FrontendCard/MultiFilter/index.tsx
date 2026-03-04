import { PageContainer } from '@ant-design/pro-components';
import { Card, Typography } from 'antd';
import React from 'react';

const MultiFilterPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <Card>
        <Typography.Title level={4}>多维度筛选</Typography.Title>
        <Typography.Paragraph>这里放多维度筛选组件/示例。</Typography.Paragraph>
      </Card>
    </PageContainer>
  );
};

export default MultiFilterPage;
