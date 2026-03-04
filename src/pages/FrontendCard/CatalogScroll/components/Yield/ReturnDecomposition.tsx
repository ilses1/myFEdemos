import React from 'react';
import type { LeafProps } from '../types';

const ReturnDecomposition: React.FC<LeafProps> = ({ title }) => {
  return (
    <div style={{ background: '#FF0' }}>
      ReturnDecompositionReturnDecompositionReturnDecompositionReturnDecomposition{' '}
      {title}
    </div>
  );
};

export default ReturnDecomposition;
