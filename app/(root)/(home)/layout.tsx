import React from 'react';

import '@/shared/styles/globals.css';
import { Footer } from '@/shared/components/atoms/ui/footer';
import AppClientMenu from '@/shared/components/molecules/layout/app-client-menu';
import NavbarFooterExamples from '@/shared/components/examples/navbar-footer-examples';

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default async function BaseLayout({ children }: RootLayoutProps) {
  return (
    <div>
      <NavbarFooterExamples />
    </div>
  );
}
