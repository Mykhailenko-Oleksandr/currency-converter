import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rates',
  description: 'Rates currency',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
