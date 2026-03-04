import React from 'react';
import type { LeafProps } from '../types';

const CompareBond: React.FC<LeafProps> = ({ title }) => {
  return (
    <div style={{ background: '#FF0' }}>
      CompareBondCompareBondCompareBondCompareBond {title}
    </div>
  );
};

export default CompareBond;
