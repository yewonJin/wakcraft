import { cn } from '@repo/utils'

import { Position } from '@/types/position'
import { positions } from '@/utils/positions'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  visible: boolean
  position: Position
  children: React.ReactNode
}

export default function Tooltip({
  visible,
  position,
  children,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'absolute flex bg-neutral-900 px-2.5 py-1 text-[white]',
        positions[position],
        visible ? 'visible' : 'invisible',
        className,
      )}
    >
      {children}
    </div>
  )
}
