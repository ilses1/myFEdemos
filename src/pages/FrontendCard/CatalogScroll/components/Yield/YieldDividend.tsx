import React from 'react';

export type YieldDividendProps = {
  title: string;
};

const YieldDividend: React.FC<YieldDividendProps> = ({ title }) => {
  return (
    <div style={{ background: '#0F0' }}>
      YieldDividendYieldDividendYieldDividend{title}
    </div>
  );
};

export default YieldDividend;
