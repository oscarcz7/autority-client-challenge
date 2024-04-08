// components/Layout.tsx
import React, { ReactNode } from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navigation />
      <div className="container mx-auto px-4">{children}</div>
    </div>
  );
};

export default Layout;
