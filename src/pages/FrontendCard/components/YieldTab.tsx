import React, { useEffect, useRef } from 'react';
import styles from '../index.less';

type Props = {
  active: boolean;
};

const YieldTab: React.FC<Props> = ({ active }) => {
  const hasRequestedRef = useRef(false);

  useEffect(() => {
    if (!active || hasRequestedRef.current) return;
    hasRequestedRef.current = true;
    console.log('YieldTab request');
  }, [active]);

  return (
    <div className={styles.metricsCard}>
      <div className={styles.metricsLeft}>
        <div className={styles.sectionHeader}>
          <span className={styles.headerIcon} />
          <span className={styles.headerText}>收益率图</span>
          <span className={styles.headerSubText}>示例</span>
        </div>

        <div className={styles.description}>
          在这里渲染收益率走势（折线/面积图等）。当前为占位内容，用于展示Tab切换后
          渲染不同子组件。
        </div>
      </div>

      <div className={styles.separator} />

      <div className={styles.metricsRight}>
        <div className={styles.metricList}>
          <div className={styles.metricItem}>
            <span className={styles.metricLabel}>近1月</span>
            <span className={styles.metricValue}>+1.23%</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricLabel}>近3月</span>
            <span className={styles.metricValue}>+4.56%</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricLabel}>近1年</span>
            <span className={styles.metricValue}>+12.34%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldTab;
