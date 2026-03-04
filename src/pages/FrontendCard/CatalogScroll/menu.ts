export type MenuNode = {
  key: string;
  title: string;
  children?: MenuNode[];
};

export const menuStructure: MenuNode[] = [
  { key: 'overview', title: '资产总览' },
  {
    key: 'yield',
    title: '收益率',
    children: [
      {
        key: 'yield-source',
        title: '收益来源',
        children: [
          { key: 'yield-dividend', title: '分红' },
          { key: 'yield-fundamental', title: '经营基本面' },
          { key: 'yield-valuation', title: '估值' },
        ],
      },
      { key: 'return-decomposition', title: '历史收益分解' },
    ],
  },
  {
    key: 'volatility',
    title: '波动率',
    children: [
      { key: 'vol-hist', title: '历史波动率分析' },
      { key: 'vol-risk-return', title: '风险收益特征' },
    ],
  },
  {
    key: 'correlation',
    title: '相关性',
    children: [
      { key: 'corr-cross', title: '跨资产相关性' },
      { key: 'corr-inner', title: '内部相关性' },
    ],
  },
  {
    key: 'compare',
    title: '跨资产比较',
    children: [
      { key: 'compare-bond', title: 'REITs与债券' },
      { key: 'compare-stock', title: 'REITs与股票' },
    ],
  },
];
