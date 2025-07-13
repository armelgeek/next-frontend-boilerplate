import { ReactNode } from 'react';

export default function BuildersLayout({ children }: { children: ReactNode }) {
  return (
    <div className="builders-layout">
      {children}
    </div>
  );
}
