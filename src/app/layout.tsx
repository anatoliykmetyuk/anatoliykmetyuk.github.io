import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import { cn } from '@/lib/utils'
import Sidebar from '@/components/Sidebar'
import MobileHeader from '@/components/MobileHeader'

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
        "h-screen bg-background overflow-auto w-full flex md:flex-row flex-col gap-1 md:gap-2 md:p-3",
        inter
      )}
    >
      <MobileHeader />
      <Sidebar />
      <div className="card w-full flex flex-col flex-1 gap-4 p-4 overflow-auto">
        {children}
      </div>
    </div>
  );
}
