import React from 'react';
import CompareStock from './contents/CompareStock';
import DefaultLeaf from './contents/DefaultLeaf';
import Overview from './contents/Overview';
import VolHist from './contents/VolHist';
import YieldDividend from './contents/YieldDividend';

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
