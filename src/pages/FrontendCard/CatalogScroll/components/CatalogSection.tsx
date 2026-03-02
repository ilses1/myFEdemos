import React from 'react';
import styles from '../index.less';

export type CatalogSectionProps = {
  id: string;
  title: React.ReactNode;
  level: number;
  children?: React.ReactNode;
};

const CatalogSection: React.FC<CatalogSectionProps> = ({
  id,
  title,
  level,
  children,
}) => {
  const levelClassName =
    level === 0
      ? styles.nodeLevel0
      : level === 1
      ? styles.nodeLevel1
      : styles.nodeLevel2;

  return (
    <section
      id={id}
      className={[styles.section, styles.nodeSection, levelClassName]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.nodeHeading}>{title}</div>
      {children ? <div className={styles.nodeBody}>{children}</div> : null}
    </section>
  );
};

export default CatalogSection;
