import React from 'react';

export type YieldProps = {
  title: string;
};

const Yield: React.FC<YieldProps> = ({ title }) => {
  return <div style={{ background: '#FF0' }}>YieldYieldYieldYield {title}</div>;
};

export default Yield;
