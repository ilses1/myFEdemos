import React from 'react';
import styles from '../../index.less';
import LeafLayout from '../LeafLayout';
import PanelCard from '../PanelCard';
import type { LeafProps } from '../types';

const CompareStock: React.FC<LeafProps> = ({ title }) => {
  return (
    <LeafLayout title={title}>
      <PanelCard title="与股票收益对比" size="lg">
        <div className={styles.mockChart} />
      </PanelCard>
      <PanelCard title="相关性" size="sm">
        <div className={styles.mockKpis}>
          <div className={styles.mockKpi} />
          <div className={styles.mockKpi} />
        </div>
      </PanelCard>
    </LeafLayout>
  );
};

export default CompareStock;
