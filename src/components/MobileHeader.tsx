import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const MobileHeader = () => {
  return (
    <div className="md:hidden w-full bg-primary text-primary-foreground p-2 flex flex-row items-center justify-between">
      <h1 className="font-semibold">Anatolii&apos;s Blog</h1>
      <Link href="/">
        <HomeIcon className="w-6 h-6" />
      </Link>
    </div>
  );
}

export default MobileHeader