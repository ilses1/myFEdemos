import React from 'react';
import type { LeafProps } from '../types';

const Correlation: React.FC<LeafProps> = ({ title }) => {
  return (
    <div style={{ background: '#FF0' }}>
      CorrelationCorrelationCorrelationCorrelation {title}
    </div>
  );
};

export default Correlation;
