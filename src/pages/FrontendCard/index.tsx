import { PageContainer } from '@ant-design/pro-components';
import React, { useState } from 'react';
import styles from './index.less';

const FrontendCardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kline' | 'yield'>('kline');

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <div className={styles.tabWrapper}>
          <div
            className={`${styles.tabItem} ${
              activeTab === 'kline' ? styles.active : ''
            }`}
            onClick={() => setActiveTab('kline')}
          >
            K线图
          </div>
          <div
            className={`${styles.tabItem} ${
              activeTab === 'yield' ? styles.active : ''
            }`}
            onClick={() => setActiveTab('yield')}
          >
            收益率图
          </div>
        </div>
        <div className={styles.etfCard}>
          <div className={styles.header}>
            <span className={styles.etfTitle}>ETF名称</span>
            <span className={styles.etfCode}>000000</span>
          </div>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderCell}>
              <span className={styles.bullet} />
              <span className={styles.cellTitle}>仓位建议</span>
            </div>
            <div className={styles.tableHeaderCell}>
              <span className={styles.bullet} />
              <span className={styles.cellTitle}>说明</span>
            </div>
          </div>
          <div className={styles.contentRow}>
            <div className={styles.positionValue}>25%</div>
            <div className={styles.description}>
              文本说明文本说明文本说明文本说明文本说明文本说明文本说明文本说明文本说明文本说明…
            </div>
          </div>
        </div>
        <div className={styles.metricsCard}>
          <div className={styles.metricsLeft}>
            <div className={styles.sectionHeader}>
              <span className={styles.headerIcon} />
              <span className={styles.headerText}>核心指标(全市场)</span>
              <span className={styles.headerSubText}>值(分位)</span>
            </div>
            <div className={styles.metricList}>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>P/NAV</span>
                <span className={styles.metricValue}>1.21(78%)</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>全市场派息率</span>
                <span className={styles.metricValue}>6.24%(55%)</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>产权类派息率</span>
                <span className={styles.metricValue}>4.91%(36%)</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>产权类派息率利差</span>
                <span className={styles.metricValue}>3.10%(12%)</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>经营权IRR</span>
                <span className={styles.metricValue}>4.28%(89%)</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>经营权IRR利差</span>
                <span className={styles.metricValue}>2.47%(85%)</span>
              </div>
            </div>
          </div>
          <div className={styles.separator} />
          <div className={styles.metricsRight}>
            <div>
              <div className={styles.sectionHeader}>
                <span className={styles.headerIcon} />
                <span className={styles.headerText}>波动率</span>
              </div>
              <div className={styles.metricList}>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>近三月</span>
                  <span className={styles.metricValue}>7.05%</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>近一年</span>
                  <span className={styles.metricValue}>7.46%</span>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.sectionHeader}>
                <span className={styles.headerIcon} />
                <span className={styles.headerText}>相关性(近半年)</span>
              </div>
              <div className={styles.metricList}>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>10Y国债活跃</span>
                  <span className={styles.metricValue}>-0.027</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>沪深300</span>
                  <span className={styles.metricValue}>-0.1166</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>中证转债</span>
                  <span className={styles.metricValue}>-0.1641</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>中证红利</span>
                  <span className={styles.metricValue}>-0.1035</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default FrontendCardPage;
