import React from 'react';
import type { LeafProps } from '../types';

const Yield: React.FC<LeafProps> = ({ title }) => {
  const displayTitle = title || '收益率';

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 4 }}
    >
      <span
        style={{ fontSize: 14, lineHeight: 1 }}
        role="img"
        aria-label="chart"
      >
        📊
      </span>
      <span
        style={{
          color: '#2f5eb5',
          fontSize: 24,
          fontWeight: 700,
          lineHeight: '32px',
        }}
      >
        {displayTitle}
      </span>
    </div>
  );
};

export default Yield;
