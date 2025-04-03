import { cn } from '@repo/utils'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  position: Position
}

type Position =
  | 'top'
  | 'top-right'
  | 'top-left'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'

export default function Tooltip({ position, children, className }: Props) {
  const positions: { [key in Position]: string } = {
    top: 'top-[2.5%] left-[50%] translate-x-[-50%]',
    'top-right': 'top-[2.5%] right-[1.5%]',
    'top-left': 'top-[2.5%] left-[1.5%]',
    bottom: 'bottom-2 left-[50%] translate-x-[-50%]',
    'bottom-right': 'bottom-[2.5%] right-[1.5%]',
    'bottom-left': 'bottom-[2.5%] left-[1.5%]',
  }

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
