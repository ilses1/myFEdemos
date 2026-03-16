import React, { useEffect, useRef } from 'react';
import styles from '../index.less';

type Props = {
  active: boolean;
};

const KlineTab: React.FC<Props> = ({ active }) => {
  const hasRequestedRef = useRef(false);

  useEffect(() => {
    if (!active || hasRequestedRef.current) return;
    hasRequestedRef.current = true;
    console.log('KlineTab request');
  }, [active]);

  return (
    <div className={styles.etfCard}>
      <div className={styles.header}>
        <div className={styles.etfTitle}>K线图</div>
        <div className={styles.etfCode}>Demo</div>
      </div>

      <div className={styles.tableHeader}>
        <div className={styles.tableHeaderCell}>
          <span className={styles.bullet} />
          <span className={styles.cellTitle}>开盘</span>
        </div>
        <div className={styles.tableHeaderCell}>
          <span className={styles.bullet} />
          <span className={styles.cellTitle}>收盘</span>
        </div>
        <div className={styles.tableHeaderCell}>
          <span className={styles.bullet} />
          <span className={styles.cellTitle}>最高/最低</span>
        </div>
      </div>

      <div className={styles.contentRow}>
        <div className={styles.positionValue}>+2.36%</div>
        <div className={styles.description}>
          在这里渲染K线图组件（例如ECharts的candlestick）。当前先放一个示意卡片，
          用于验证Tab切换与布局。
        </div>
      </div>
    </div>
  );
};

export default KlineTab;
