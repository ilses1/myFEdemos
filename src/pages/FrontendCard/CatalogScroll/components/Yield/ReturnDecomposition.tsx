import React from 'react';
import type { LeafProps } from '../types';
import styles from './ReturnDecomposition.less';

const ReturnDecomposition: React.FC<LeafProps> = ({ title }) => {
  return (
    <>
      <div className={styles.header}>
        <span className={styles.titleIcon} />
        <span className={styles.headerTitle}>{title || '历史收益分解'}</span>
        <span className={styles.headerSubText}>
          全市场已上市REITs通过市值加权后拟合指数进行指标计算
        </span>
      </div>
      <div className={styles.wrap}>
        <div className={styles.canvas}>
          <div className={styles.canvasTitle}>历史收益分解总览</div>

          <div className={styles.content}>
            <div className={styles.leftPanel}>
              <div className={styles.reitNode}>REITs收益拆分</div>
              <div className={styles.leftBranch}>
                <span className={styles.connectorVertical} aria-hidden="true" />
                <div className={styles.leftItems}>
                  <span className={styles.connectorH} aria-hidden="true" />
                  <div className={styles.lightNode}>资产增值收益</div>
                  <span className={styles.connectorH} aria-hidden="true" />
                  <div className={styles.lightNode}>估值变动收益</div>
                  <span className={styles.connectorH} aria-hidden="true" />
                  <div className={styles.lightNode}>分红收益</div>
                </div>
              </div>
            </div>

            <div className={styles.rightPanel}>
              <div className={styles.formulaTitle}>
                <span>收益分解模型：</span>
                <span className={styles.formulaMain}>△R=(P1+D1)/P0-1= </span>
                <span className={styles.formulaTerm}>△pv</span>
                <span className={styles.formulaMain}> + </span>
                <span className={styles.formulaTerm}>△NAV</span>
                <span className={styles.formulaMain}> + </span>
                <span className={styles.formulaTerm}>D/P-1</span>
              </div>
              <div className={styles.linkLine} aria-hidden="true">
                <span className={`${styles.branch} ${styles.branchLeft}`} />
                <span className={`${styles.branch} ${styles.branchMid}`} />
                <span className={`${styles.branch} ${styles.branchRight}`} />
              </div>

              <div className={styles.factorRow}>
                <div className={styles.factorCard}>估值变动收益</div>
                <div className={styles.factorCard}>资产增值收益</div>
                <div className={styles.factorCard}>分红收益</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnDecomposition;
