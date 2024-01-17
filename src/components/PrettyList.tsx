import { cn } from '@/lib/utils'
import React from 'react'

type PrettyListProps = {
  className?: string
  children?: React.ReactNode
}

export const PrettyList = ({ className, children }: PrettyListProps) => {
  return (
    <ul className={cn(className)}>
      {children}
    </ul>
  );
}

interface PrettyListItemProps extends PrettyListProps {
  icon?: React.ReactNode
}
export const PrettyListItem = ({ className, icon, children }: PrettyListItemProps) => {
  return (
    <li className={cn("flex w-full", className)}>
      <span className="mr-2 pt-1">{icon}</span>
      <span className="flex-1">
        {children}
      </span>
    </li>
  );
}
