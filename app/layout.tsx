import React from 'react';
import { Toaster } from '@/shared/components/atoms/ui/sonner';
import { Provider } from '@/shared/providers';
import NextTopLoader from 'nextjs-toploader';
import { allFontVariables } from '@/shared/lib/themes/theme-fonts';
import { FoodBackground } from '@/shared/components/atoms/ui/food-background';
import '@/shared/styles/globals.css';

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${allFontVariables} font-sans bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100`}>
        <NextTopLoader showSpinner={true} />
        <FoodBackground density="medium" opacity={0.06} />
        <Provider>
          <div className="relative z-10">
            {children}
          </div>
        </Provider>

        <Toaster richColors />
      </body>
    </html>
  );
}
