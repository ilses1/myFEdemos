import React from 'react';
import type { LeafProps } from '../types';

const CorrInner: React.FC<LeafProps> = ({ title }) => {
  return (
    <div style={{ background: '#FF0' }}>
      CorrInnerCorrInnerCorrInnerCorrInner {title}
    </div>
  );
};

export default CorrInner;
