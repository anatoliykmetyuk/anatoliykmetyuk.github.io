import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Anatolii's Blog",
  description: "I'm Anatolii, a Scala engineer and hacker, and this is my blog.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div
        className={cn(
          "min-h-screen bg-background",
          inter
        )}
      >
        {children}
      </div>
  );
}
