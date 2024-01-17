import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';

type SocialLinkProps = {
  href: string,
  icon: React.ReactNode
}

const SocialLink = ({ href, icon }: SocialLinkProps) => {
  return (
    <Link href={href} target="_blank">
      <Button
        variant="outline"
        size="icon"
        className="border-none bg-blue-300 hover:bg-blue-600"
      >
        {icon}
      </Button>
    </Link>
  );
}

export default SocialLink