import React from 'react';

export type CorrelationProps = {
  title: string;
};

const Correlation: React.FC<CorrelationProps> = ({ title }) => {
  return (
    <div style={{ background: '#FF0' }}>
      CorrelationCorrelationCorrelationCorrelation {title}
    </div>
  );
};

export default Correlation;
