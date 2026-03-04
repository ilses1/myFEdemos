import React from 'react';

export type ReturnDecompositionProps = {
  title: string;
};

const ReturnDecomposition: React.FC<ReturnDecompositionProps> = ({ title }) => {
  return (
    <div style={{ background: '#FF0' }}>
      ReturnDecompositionReturnDecompositionReturnDecompositionReturnDecomposition{' '}
      {title}
    </div>
  );
};

export default ReturnDecomposition;
