import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import styles from './index.less';

const FrontendCardPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <div className={styles.historyTitleWrapper}>
          <span className={styles.historyTitle}>历史走势</span>
        </div>
        <div className={styles.etfCard}>
          <div className={styles.header}>
            <span className={styles.etfTitle}>ETF名称</span>
            <span className={styles.etfCode}>000000</span>
          </div>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderCell}>
              <span className={styles.bullet} />
              <span className={styles.cellTitle}>仓位建议</span>
            </div>
            <div className={styles.tableHeaderCell}>
              <span className={styles.bullet} />
              <span className={styles.cellTitle}>说明</span>
            </div>
          </div>
          <div className={styles.contentRow}>
            <div className={styles.positionValue}>25%</div>
            <div className={styles.description}>
              文本说明文本说明文本说明文本说明文本说明文本说明文本说明文本说明文本说明文本说明…
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default FrontendCardPage;
