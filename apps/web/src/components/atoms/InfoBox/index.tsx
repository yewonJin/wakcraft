import { cn } from '@repo/utils'

import { Position } from '@/types/position'
import { positions } from '@/utils/positions'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  position: Position
  children: React.ReactNode
}

export default function InfoBox({ position, children, className }: Props) {
  return (
    <div
      className={cn(
        'absolute flex rounded-md bg-neutral-800/85 px-2.5 py-1.5 text-sm text-neutral-50',
        positions[position],
        className,
      )}
    >
      {children}
    </div>
  )
}
