import React from 'react';
import styles from '../../index.less';
import LeafLayout from '../LeafLayout';
import PanelCard from '../PanelCard';

export type DefaultLeafProps = {
  title: string;
};

const DefaultLeaf: React.FC<DefaultLeafProps> = ({ title }) => {
  return (
    <LeafLayout title={title}>
      <PanelCard title="内容区块" size="lg">
        <div className={styles.mockChart} />
        <div className={styles.mockText}>
          <div className={styles.mockLine} />
          <div className={styles.mockLine} />
          <div className={styles.mockLineShort} />
        </div>
      </PanelCard>
      <PanelCard title="补充信息" size="sm">
        <div className={styles.mockList}>
          <div className={styles.mockListItem} />
          <div className={styles.mockListItem} />
          <div className={styles.mockListItem} />
        </div>
      </PanelCard>
    </LeafLayout>
  );
};

export default DefaultLeaf;
