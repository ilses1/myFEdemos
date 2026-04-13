import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import styles from './index.less';

const FundSearchService: React.FC = () => {
  return (
    <PageContainer
      header={{ title: '基金检索服务' }}
      className={styles.container}
    >
      <div></div>
    </PageContainer>
  );
};

export default FundSearchService;
