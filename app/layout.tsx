import 'modern-normalize';
import './globals.css';
import Header from '@/components/Header/Header';
import GeolocationChecker from '@/components/GeolocationChecker/GeolocationChecker';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Currency Converter',
  description: 'Currency converter',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GeolocationChecker />
        <Header />
        {children}
      </body>
    </html>
  );
}
