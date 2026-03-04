import React from 'react';
import type { LeafProps } from '../types';

const CorrCross: React.FC<LeafProps> = ({ title }) => {
  return (
    <div style={{ background: '#FF0' }}>
      CorrCrossCorrCrossCorrCrossCorrCross {title}
    </div>
  );
};

export default CorrCross;
