import { cn } from '@repo/utils'

type Props = {
  className?: string
}

export default function Separator({ className }: Props) {
  return <div className={cn('bg-fill-default h-[1px] w-full', className)}></div>
}
