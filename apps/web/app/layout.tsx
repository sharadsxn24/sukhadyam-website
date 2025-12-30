import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Limelight } from 'next/font/google';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

const limelight = Limelight({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-limelight',
});

export const metadata: Metadata = {
  title: 'Office Dabba by Sukhadyam - Apka Apna Dabba',
  description: 'Everyday meals for workdays. Order by 12:30 PM. Delivered 1–3 PM. Simple, reliable, sorted.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${limelight.variable}`}>{children}</body>
    </html>
  );
}
