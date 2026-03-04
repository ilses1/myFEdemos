import React from 'react';

export type YieldSourceProps = {
  title: string;
};

const YieldSource: React.FC<YieldSourceProps> = ({ title }) => {
  return (
    <div style={{ background: '#f00' }}>
      YieldSourceYieldSourceYieldSource {title}
    </div>
  );
};

export default YieldSource;
