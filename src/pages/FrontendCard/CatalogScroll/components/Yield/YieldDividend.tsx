import React from 'react';
import type { LeafProps } from '../types';

const YieldDividend: React.FC<LeafProps> = ({ title }) => {
  return (
    <div style={{ background: '#0F0' }}>
      YieldDividendYieldDividendYieldDividend{title}
    </div>
  );
};

export default YieldDividend;
