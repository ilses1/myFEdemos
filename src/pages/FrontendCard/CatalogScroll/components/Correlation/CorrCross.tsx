import React from 'react';

export type CorrCrossProps = {
  title: string;
};

const CorrCross: React.FC<CorrCrossProps> = ({ title }) => {
  return (
    <div style={{ background: '#FF0' }}>
      CorrCrossCorrCrossCorrCrossCorrCross {title}
    </div>
  );
};

export default CorrCross;
