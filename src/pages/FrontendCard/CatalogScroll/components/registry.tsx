import React from 'react';
import Compare from './Compare/Compare';
import CompareBond from './Compare/CompareBond';
import CompareStock from './Compare/CompareStock';
import DefaultLeaf from './contents/DefaultLeaf';
import CorrCross from './Correlation/CorrCross';
import Correlation from './Correlation/Correlation';
import CorrInner from './Correlation/CorrInner';
import Overview from './Overview/Overview';
import type { LeafProps } from './types';
import Volatility from './Volatility/Volatility';
import VolHist from './Volatility/VolHist';
import VolRiskReturn from './Volatility/VolRiskReturn';
import ReturnDecomposition from './Yield/ReturnDecomposition';
import Yield from './Yield/Yield';
import YieldDividend from './Yield/YieldDividend';
import YieldSource from './Yield/YieldSource';

/**
 * 内容区块渲染注册表：
 * - key 对应菜单节点 key（同目录树的 node.key）
 * - value 为该节点在内容区需要渲染的 React 组件
 * 未注册的 key 会回退到 DefaultLeaf。
 */
export type NodeRenderContext = {
  key: string;
  title: string;
};
type NodeRenderer = React.FC<LeafProps>;

const nodeRegistry: Record<string, NodeRenderer> = {
  overview: Overview,
  yield: Yield,
  'yield-source': YieldSource,
  'yield-dividend': YieldDividend,
  'return-decomposition': ReturnDecomposition,
  volatility: Volatility,
  'vol-hist': VolHist,
  'vol-risk-return': VolRiskReturn,
  correlation: Correlation,
  'corr-cross': CorrCross,
  'corr-inner': CorrInner,
  compare: Compare,
  'compare-bond': CompareBond,
  'compare-stock': CompareStock,
};

/**
 * 根据节点 key 从注册表中选择内容组件并渲染。
 * DefaultLeaf 作为兜底，避免未注册节点导致内容区空白或报错。
 */
export const renderNodeContent = ({ key, title }: NodeRenderContext) => {
  const Comp = nodeRegistry[key] ?? DefaultLeaf;
  return <Comp title={title} />;
};
