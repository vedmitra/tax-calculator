import React from 'react';

type SpacerType = {
  direction: 'horizontal' | 'vertical';
  children: React.ReactNode;
};

export const Spacer: React.FC<SpacerType> = ({ direction, children }) => {
  const spacingClass =
    direction === 'horizontal' ? 'flex space-x-4' : 'space-y-4';

  return <div className={spacingClass}>{children}</div>;
};
