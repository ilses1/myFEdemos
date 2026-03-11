import { Card, Space, Tooltip, Typography } from 'antd';
import React from 'react';
import styles from './index.less';

type BadgeKey = 'lead' | 'margin' | 'lowFee' | 'top20' | 'featured';

type FundBlock = {
  id: string;
  title: string;
  badges: BadgeKey[];
  latestScaleYi: number;
  dailyAvgAmountWan: number;
  desc: string;
  investCodes: string[];
};

type MasonryCard = {
  id: string;
  boardLabel: string;
  funds: FundBlock[];
};

const badgeLabelMap: Record<BadgeKey, string> = {
  lead: '领先',
  margin: '两融',
  lowFee: '低费',
  top20: '±20%',
  featured: '特色',
};

const badgeClassMap: Record<BadgeKey, string> = {
  lead: styles.leadTag,
  margin: styles.marginTag,
  lowFee: styles.lowFeeTag,
  top20: styles.top20Tag,
  featured: styles.featuredTag,
};

const CARDS: MasonryCard[] = [
  {
    id: 'c1',
    boardLabel: '科创板',
    funds: [
      {
        id: 'c1-f1',
        title: '科创100ETF华夏',
        badges: ['lead', 'margin', 'lowFee', 'top20', 'featured'],
        latestScaleYi: 881.7,
        dailyAvgAmountWan: 285_065,
        desc: '文本占位文本占位文本占位文本占位文本占位文本占位…',
        investCodes: ['020291', '020292', '020292', '020292'],
      },
      {
        id: 'c1-f2',
        title: '科创100ETF华夏',
        badges: ['lead', 'margin', 'lowFee', 'top20', 'featured'],
        latestScaleYi: 881.7,
        dailyAvgAmountWan: 285_065,
        desc: '文本占位文本占位文本占位文本占位文本占位文本占位…',
        investCodes: ['020291', '020292'],
      },
      {
        id: 'c1-f3',
        title: '科创100ETF华夏',
        badges: ['lead', 'margin', 'lowFee', 'top20', 'featured'],
        latestScaleYi: 881.7,
        dailyAvgAmountWan: 285_065,
        desc: '文本占位文本占位文本占位文本占位文本占位文本占位…',
        investCodes: ['020291', '020292'],
      },
    ],
  },
  {
    id: 'c2',
    boardLabel: '创业板',
    funds: [
      {
        id: 'c2-f1',
        title: '创业板ETF华夏',
        badges: ['lead', 'margin', 'lowFee', 'top20', 'featured'],
        latestScaleYi: 881.7,
        dailyAvgAmountWan: 285_065,
        desc: '文本占位文本占位文本占位文本占位文本占位文本占位…',
        investCodes: ['020291', '020292', '020292', '020292'],
      },
    ],
  },
  {
    id: 'c3',
    boardLabel: '科创板',
    funds: [
      {
        id: 'c3-f1',
        title: '科创100ETF华夏',
        badges: ['lead', 'margin', 'lowFee', 'top20', 'featured'],
        latestScaleYi: 881.7,
        dailyAvgAmountWan: 285_065,
        desc: '文本占位文本占位文本占位文本占位文本占位文本占位…',
        investCodes: ['020291', '020292', '020292', '020292'],
      },
      {
        id: 'c3-f2',
        title: '科创100ETF华夏',
        badges: ['lead', 'margin', 'lowFee', 'top20', 'featured'],
        latestScaleYi: 881.7,
        dailyAvgAmountWan: 285_065,
        desc: '文本占位文本占位文本占位文本占位文本占位文本占位…',
        investCodes: ['020291', '020292'],
      },
    ],
  },
  {
    id: 'c4',
    boardLabel: '科创板',
    funds: [
      {
        id: 'c4-f1',
        title: '科创100ETF华夏',
        badges: ['lead', 'margin', 'lowFee', 'top20', 'featured'],
        latestScaleYi: 881.7,
        dailyAvgAmountWan: 285_065,
        desc: '文本占位文本占位文本占位文本占位文本占位文本占位…',
        investCodes: ['020291', '020292', '020292', '020292'],
      },
      {
        id: 'c4-f2',
        title: '科创100ETF华夏',
        badges: ['lead', 'margin', 'lowFee', 'top20', 'featured'],
        latestScaleYi: 881.7,
        dailyAvgAmountWan: 285_065,
        desc: '文本占位文本占位文本占位文本占位文本占位文本占位…',
        investCodes: ['020291', '020292'],
      },
    ],
  },
  {
    id: 'c5',
    boardLabel: '科创板',
    funds: [
      {
        id: 'c5-f1',
        title: '科创100ETF华夏',
        badges: ['lead', 'margin', 'lowFee', 'top20', 'featured'],
        latestScaleYi: 881.7,
        dailyAvgAmountWan: 285_065,
        desc: '文本占位文本占位文本占位文本占位文本占位文本占位…',
        investCodes: ['020291', '020292', '020292', '020292'],
      },
      {
        id: 'c5-f2',
        title: '科创100ETF华夏',
        badges: ['lead', 'margin', 'lowFee', 'top20', 'featured'],
        latestScaleYi: 881.7,
        dailyAvgAmountWan: 285_065,
        desc: '文本占位文本占位文本占位文本占位文本占位文本占位…',
        investCodes: ['020291', '020292', '020292', '020292'],
      },
      {
        id: 'c5-f3',
        title: '科创100ETF华夏',
        badges: ['lead', 'margin', 'lowFee', 'top20', 'featured'],
        latestScaleYi: 881.7,
        dailyAvgAmountWan: 285_065,
        desc: '文本占位文本占位文本占位文本占位文本占位文本占位…',
        investCodes: ['020291', '020292'],
      },
    ],
  },
  {
    id: 'c6',
    boardLabel: '科创板',
    funds: [
      {
        id: 'c6-f1',
        title: '科创100ETF华夏',
        badges: ['lead', 'margin', 'lowFee', 'top20', 'featured'],
        latestScaleYi: 881.7,
        dailyAvgAmountWan: 285_065,
        desc: '文本占位文本占位文本占位文本占位文本占位文本占位…',
        investCodes: ['020291', '020292', '020292', '020292'],
      },
    ],
  },
  {
    id: 'c7',
    boardLabel: '科创板',
    funds: [
      {
        id: 'c7-f1',
        title: '科创100ETF华夏',
        badges: ['lead', 'margin', 'lowFee', 'top20', 'featured'],
        latestScaleYi: 881.7,
        dailyAvgAmountWan: 285_065,
        desc: '文本占位文本占位文本占位文本占位文本占位文本占位…',
        investCodes: ['020291', '020292'],
      },
    ],
  },
  {
    id: 'c8',
    boardLabel: '科创板',
    funds: [
      {
        id: 'c8-f1',
        title: '科创100ETF华夏',
        badges: ['lead', 'margin', 'lowFee', 'top20', 'featured'],
        latestScaleYi: 881.7,
        dailyAvgAmountWan: 285_065,
        desc: '文本占位文本占位文本占位文本占位文本占位文本占位…',
        investCodes: ['020291', '020292'],
      },
      {
        id: 'c8-f2',
        title: '科创100ETF华夏',
        badges: ['lead', 'margin', 'lowFee', 'top20', 'featured'],
        latestScaleYi: 881.7,
        dailyAvgAmountWan: 285_065,
        desc: '文本占位文本占位文本占位文本占位文本占位文本占位…',
        investCodes: ['020291', '020292'],
      },
    ],
  },
  {
    id: 'c9',
    boardLabel: '科创板',
    funds: [
      {
        id: 'c9-f1',
        title: '科创100ETF华夏',
        badges: ['lead', 'margin', 'lowFee', 'top20', 'featured'],
        latestScaleYi: 881.7,
        dailyAvgAmountWan: 285_065,
        desc: '文本占位文本占位文本占位文本占位文本占位文本占位…',
        investCodes: ['020291', '020292', '020292', '020292'],
      },
    ],
  },
];

const formatNumber = (n: number) => n.toLocaleString('zh-CN');

const FundBlockView: React.FC<{ fund: FundBlock; showDivider: boolean }> = ({
  fund,
  showDivider,
}) => {
  return (
    <div
      className={`${styles.masonryFundBlock} ${
        showDivider ? styles.masonryFundBlockWithDivider : ''
      }`}
    >
      <div className={styles.masonryFundTitle}>{fund.title}</div>
      <div className={styles.masonryBadges}>
        <Space size={8} wrap>
          {fund.badges.map((k) => (
            <span key={k} className={badgeClassMap[k]}>
              {badgeLabelMap[k]}
            </span>
          ))}
        </Space>
      </div>
      <div className={styles.masonryMetrics}>
        <div className={styles.masonryMetricItem}>
          <span className={styles.masonryMetricLabel}>最新规模(亿元)：</span>
          <span className={styles.masonryMetricValue}>
            {fund.latestScaleYi.toFixed(1)}
          </span>
        </div>
        <div className={styles.masonryMetricLine}></div>
        <div className={styles.masonryMetricItem}>
          <span className={styles.masonryMetricLabel}>日均成交额(万元)：</span>
          <span className={styles.masonryMetricValue}>
            {formatNumber(fund.dailyAvgAmountWan)}
          </span>
        </div>
      </div>
      <div className={styles.masonryDescRow}>
        <span className={styles.masonryDescLabel}>说明：</span>
        <Tooltip title={fund.desc}>
          <span className={styles.masonryDescText}>{fund.desc}</span>
        </Tooltip>
      </div>
      <div className={styles.masonryInvestRow}>
        <span className={styles.masonryInvestLabel}>可投资基金</span>
        <span className={styles.masonryInvestCodes}>
          {fund.investCodes.map((c, idx) => (
            <React.Fragment key={`${fund.id}-${c}-${idx}`}>
              {idx > 0 ? (
                <span className={styles.masonryCodeGap} aria-hidden="true" />
              ) : null}
              <Typography.Link className={styles.masonryCodeLink}>
                {c}
              </Typography.Link>
            </React.Fragment>
          ))}
        </span>
      </div>
    </div>
  );
};

const MasonryFundCards: React.FC = () => {
  return (
    <div className={styles.masonryArea}>
      <div className={styles.masonryCols}>
        {CARDS.map((card) => (
          <div key={card.id} className={styles.masonryItem}>
            <Card className={styles.masonryCard} variant="borderless">
              <div className={styles.masonryRibbon}>
                <span className={styles.masonryRibbonText}>
                  {card.boardLabel}
                </span>
              </div>
              <div className={styles.masonryCardInner}>
                {card.funds.map((fund, idx) => (
                  <FundBlockView
                    key={fund.id}
                    fund={fund}
                    showDivider={idx > 0}
                  />
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonryFundCards;
