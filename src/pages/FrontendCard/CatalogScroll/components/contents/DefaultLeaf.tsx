import { Empty } from 'antd';
import React from 'react';
import type { LeafProps } from '../types';

const DefaultLeaf: React.FC<LeafProps> = ({ title }) => {
  return <Empty />;
};

export default DefaultLeaf;
