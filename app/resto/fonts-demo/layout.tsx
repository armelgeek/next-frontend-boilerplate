import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Restaurant Fonts Demo | Démonstration des Polices',
  description: 'Découvrez les polices personnalisées utilisées dans notre système de design restaurant',
};

export default function FontsDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
