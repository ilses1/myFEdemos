import { PageContainer } from '@ant-design/pro-components';
import React, { useState } from 'react';
import KlineTab from './components/KlineTab';
import YieldTab from './components/YieldTab';
import styles from './index.less';

const FrontendCardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kline' | 'yield'>('kline');

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <div className={styles.tabWrapper}>
          <div
            className={`${styles.tabItem} ${
              activeTab === 'kline' ? styles.active : ''
            }`}
            onClick={() => setActiveTab('kline')}
          >
            K线图
          </div>
          <div
            className={`${styles.tabItem} ${
              activeTab === 'yield' ? styles.active : ''
            }`}
            onClick={() => setActiveTab('yield')}
          >
            收益率图
          </div>
        </div>
        <div className={styles.tabContent}>
          <div className={activeTab === 'kline' ? '' : styles.hidden}>
            <KlineTab active={activeTab === 'kline'} />
          </div>
          <div className={activeTab === 'yield' ? '' : styles.hidden}>
            <YieldTab active={activeTab === 'yield'} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default FrontendCardPage;
