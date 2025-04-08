import { cn } from '@repo/utils'

import { Position } from '@/types/position'
import { positions } from '@/utils/positions'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  position: Position
  children: React.ReactNode
}

export default function Tooltip({ position, children, className }: Props) {
  return (
    <div
      className={cn(
        'invisible absolute flex bg-neutral-900 px-2.5 py-1 text-[white]',
        positions[position],
        className,
      )}
    >
      {children}
    </div>
  )
}
