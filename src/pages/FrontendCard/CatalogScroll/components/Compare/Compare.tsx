import React from 'react';

export type CompareProps = {
  title: string;
};

const Compare: React.FC<CompareProps> = ({ title }) => {
  return (
    <div style={{ background: '#FF0' }}>
      CompareCompareCompareCompare {title}
    </div>
  );
};

export default Compare;
