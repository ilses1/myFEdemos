import React from 'react';
import styles from '../index.less';

export type LeafLayoutProps = {
  title: React.ReactNode;
  children?: React.ReactNode;
};

const LeafLayout: React.FC<LeafLayoutProps> = ({ title, children }) => {
  return (
    <div className={styles.leafLayout}>
      这个是???LeafLayout
      <div className={styles.leafTitle}>{title}</div>
      <div className={styles.leafPanels}>{children}</div>
    </div>
  );
};

export default LeafLayout;
