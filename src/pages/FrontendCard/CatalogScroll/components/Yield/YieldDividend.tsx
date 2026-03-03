import React from 'react';
import styles from '../../index.less';
import LeafLayout from '../LeafLayout';
import PanelCard from '../PanelCard';

export type YieldDividendProps = {
  title: string;
};

const YieldDividend: React.FC<YieldDividendProps> = ({ title }) => {
  return (
    <LeafLayout title={title}>
      <PanelCard title="分红贡献" size="lg">
        <div className={styles.mockChart} />
      </PanelCard>
      <PanelCard title="分红明细" size="sm">
        <div className={styles.mockTable}>
          <div className={styles.mockTableHeader} />
          <div className={styles.mockTableRow} />
          <div className={styles.mockTableRow} />
          <div className={styles.mockTableRow} />
        </div>
      </PanelCard>
    </LeafLayout>
  );
};

export default YieldDividend;
