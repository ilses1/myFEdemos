import React from 'react';
import type { LeafProps } from '../types';

const Yield: React.FC<LeafProps> = ({ title }) => {
  return <div style={{ background: '#FF0' }}>YieldYieldYieldYield {title}</div>;
};

export default Yield;
