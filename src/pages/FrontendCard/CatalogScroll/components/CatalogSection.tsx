import React from 'react';
import styles from '../index.less';
import { cx } from './cx';

export type CatalogSectionProps = {
  id: string;
  level: number;
  children?: React.ReactNode;
};

const CatalogSection = React.forwardRef<HTMLElement, CatalogSectionProps>(
  ({ id, level, children }, ref) => {
    const levelClassName =
      level === 0 && id !== 'overview'
        ? styles.nodeLevel0
        : level === 1
        ? styles.nodeLevel1
        : level === 2
        ? styles.nodeLevel2
        : '';

    return (
      <section
        ref={ref}
        id={id}
        className={cx(styles.section, styles.nodeSection, levelClassName)}
      >
        {children ? <div className={styles.nodeBody}>{children}</div> : null}
      </section>
    );
  },
);

export default CatalogSection;
