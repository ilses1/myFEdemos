import React from 'react';
import type { LeafProps } from '../types';

const Compare: React.FC<LeafProps> = ({ title }) => {
  return (
    <div style={{ background: '#FF0' }}>
      CompareCompareCompareCompare {title}
    </div>
  );
};

export default Compare;
