import React from 'react';
import styles from '../../index.less';
import LeafLayout from '../LeafLayout';
import PanelCard from '../PanelCard';

export type OverviewProps = {
  title: string;
};

const Overview: React.FC<OverviewProps> = ({ title }) => {
  return (
    <LeafLayout title={title}>
      <PanelCard title="资产走势" size="lg">
        <div className={styles.mockChart} />
      </PanelCard>
      <PanelCard title="关键指标" size="sm">
        <div className={styles.mockKpis}>
          <div className={styles.mockKpi} />
          <div className={styles.mockKpi} />
          <div className={styles.mockKpi} />
        </div>
      </PanelCard>
    </LeafLayout>
  );
};

export default Overview;
