import React from 'react';

export type CompareBondProps = {
  title: string;
};

const CompareBond: React.FC<CompareBondProps> = ({ title }) => {
  return (
    <div style={{ background: '#FF0' }}>
      CompareBondCompareBondCompareBondCompareBond {title}
    </div>
  );
};

export default CompareBond;
