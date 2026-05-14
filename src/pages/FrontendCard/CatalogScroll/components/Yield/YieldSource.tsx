import React from 'react';
import type { LeafProps } from '../types';
import styles from './YieldSource.less';

const YieldSource: React.FC<LeafProps> = ({ title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleRow}>
        <div className={styles.titleMain}>
          <span className={styles.titleIcon} />
          <span>{title || '收益来源'}</span>
        </div>
        <span className={styles.titleBadge}>
          全市场已上市REITs通过市值加权后拟合指数进行指标计算
        </span>
        <span className={styles.titleDate}>{'数据截止时间：2025 Q3 季报'}</span>
      </div>

      <div className={styles.wrap}>
        <div className={styles.header}>
          <span className={styles.headerDot} />
          <span>{'收益来源总览'}</span>
        </div>

        <div className={styles.canvas}>
          <div className={styles.diagram}>
            <div className={styles.bar}>收益来源</div>

            <div className={styles.row}>
              <div className={styles.col}>
                <div className={styles.topArrow}>↓</div>
                <div className={`${styles.labelBox} ${styles.labelAsset}`}>
                  资产端
                </div>
                <div className={styles.topArrow}>↓</div>
                <div className={styles.dashed}>
                  <div className={styles.dashedInnerRow}>
                    <div className={styles.node}>现金流回报</div>
                    <div className={styles.node}>资产增值收益</div>
                  </div>
                </div>
                <div className={styles.topArrow}>↑</div>
                <div className={styles.info}>
                  行业景气度、项目现金流、资产质量与成长性、原始权益人运营水平…
                </div>
              </div>

              <div aria-hidden="true" className={styles.middleWrap}>
                <div className={styles.middle}>
                  <span className={styles.middleArrow}>←</span>
                  <div className={styles.middleLine} />
                  <span>基础</span>
                  <div className={styles.middleLine} />
                  <span className={styles.middleArrow}>→</span>
                </div>
              </div>

              <div className={styles.col}>
                <div className={styles.topArrow}>↓</div>
                <div className={`${styles.labelBox} ${styles.labelProduct}`}>
                  产品端
                </div>
                <div className={styles.topArrow}>↓</div>
                <div className={styles.dashed}>
                  <div className={styles.dashedInnerRow}>
                    <div className={`${styles.node} ${styles.nodeWide}`}>
                      现金流回报
                    </div>
                  </div>
                </div>
                <div className={styles.topArrow}>↑</div>
                <div className={styles.info}>二级市场情绪、流动性…</div>
              </div>
            </div>

            <div className={styles.spacer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldSource;
