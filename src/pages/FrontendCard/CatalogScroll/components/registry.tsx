import React from 'react';
import CompareStock from './Compare/CompareStock';
import DefaultLeaf from './contents/DefaultLeaf';
import Overview from './Overview/Overview';
import VolHist from './Volatility/VolHist';
import YieldDividend from './Yield/YieldDividend';

export type LeafRenderContext = {
  key: string;
  title: string;
};

type LeafRenderer = React.FC<{ title: string }>;

const leafRegistry: Record<string, LeafRenderer> = {
  overview: Overview,
  'yield-dividend': YieldDividend,
  'vol-hist': VolHist,
  'compare-stock': CompareStock,
};

export const renderLeafContent = ({ key, title }: LeafRenderContext) => {
  const Comp = leafRegistry[key] ?? DefaultLeaf;
  return <Comp title={title} />;
};
