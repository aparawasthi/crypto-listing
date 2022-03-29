import Header from '@components/Header/Header';
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

function Container({ children }: ContainerProps) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Container;
