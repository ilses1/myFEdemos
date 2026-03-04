import React from 'react';

export type VolRiskReturnProps = {
  title: string;
};

const VolRiskReturn: React.FC<VolRiskReturnProps> = ({ title }) => {
  return (
    <div style={{ background: '#FF0' }}>
      VolRiskReturnVolRiskReturnVolRiskReturnVolRiskReturn {title}
    </div>
  );
};

export default VolRiskReturn;
