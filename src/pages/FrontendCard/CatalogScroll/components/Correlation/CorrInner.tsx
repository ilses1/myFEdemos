import React from 'react';

export type CorrInnerProps = {
  title: string;
};

const CorrInner: React.FC<CorrInnerProps> = ({ title }) => {
  return (
    <div style={{ background: '#FF0' }}>
      CorrInnerCorrInnerCorrInnerCorrInner {title}
    </div>
  );
};

export default CorrInner;
