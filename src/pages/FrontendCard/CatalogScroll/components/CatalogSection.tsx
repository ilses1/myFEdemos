import React from 'react';
import styles from '../index.less';

export type CatalogSectionProps = {
  id: string;
  title: React.ReactNode;
  level: number;
  children?: React.ReactNode;
};

const CatalogSection = React.forwardRef<HTMLElement, CatalogSectionProps>(
  ({ id, title, level, children }, ref) => {
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
        className={[styles.section, styles.nodeSection, levelClassName]
          .filter(Boolean)
          .join(' ')}
      >
        {children ? <div className={styles.nodeBody}>{children}</div> : null}
      </section>
    );
  },
);

export default CatalogSection;
