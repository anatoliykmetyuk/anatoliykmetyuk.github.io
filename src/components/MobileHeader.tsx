import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type MobileHeaderProps = {
  title?: string
}

const MobileHeader = ({ title }: MobileHeaderProps) => {
  return (
    <div className="md:hidden w-full bg-primary text-primary-foreground p-2 flex flex-row items-center justify-between gap-2">
      <h1 className="font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">
        {title ? `${title} - Anatolii's Blog` : "Anatolii's Blog"}
      </h1>
      <Link href="/">
        <HomeIcon className="w-6 h-6" />
      </Link>
    </div>
  );
}

export default MobileHeader