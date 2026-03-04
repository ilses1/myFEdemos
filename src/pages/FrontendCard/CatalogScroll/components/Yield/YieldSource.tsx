import React from 'react';
import type { LeafProps } from '../types';

const YieldSource: React.FC<LeafProps> = ({ title }) => {
  return (
    <div style={{ background: '#f00' }}>
      YieldSourceYieldSourceYieldSource {title}
    </div>
  );
};

export default YieldSource;
