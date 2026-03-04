import React from 'react';
import styles from '../../index.less';
import LeafLayout from '../LeafLayout';
import PanelCard from '../PanelCard';
import type { LeafProps } from '../types';

const VolHist: React.FC<LeafProps> = ({ title }) => {
  return (
    <LeafLayout title={title}>
      <PanelCard title="波动率曲线" size="lg">
        <div className={styles.mockChart} />
      </PanelCard>
      <PanelCard title="分位数" size="sm">
        <div className={styles.mockBars}>
          <div className={styles.mockBar} />
          <div className={styles.mockBar} />
          <div className={styles.mockBar} />
          <div className={styles.mockBar} />
        </div>
      </PanelCard>
    </LeafLayout>
  );
};

export default VolHist;
