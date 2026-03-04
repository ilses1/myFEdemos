import React from 'react';
import styles from '../index.less';
import { cx } from './cx';

export type PanelCardSize = 'lg' | 'sm';

export type PanelCardProps = {
  title: React.ReactNode;
  size?: PanelCardSize;
  children?: React.ReactNode;
};

const PanelCard: React.FC<PanelCardProps> = ({
  title,
  size = 'lg',
  children,
}) => {
  const sizeClassName =
    size === 'lg' ? styles.panelCardLarge : styles.panelCardSmall;
  return (
    <div className={cx(styles.panelCard, sizeClassName)}>
      <div className={styles.panelCardHeader}>{title}</div>
      <div className={styles.panelCardBody}>{children}</div>
    </div>
  );
};

export default PanelCard;
