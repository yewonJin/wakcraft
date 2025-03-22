import { cn } from '@/lib/cn'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
}

export default function Button({
  onClick,
  children,
  className,
  ...rest
}: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'hover:cursor-pointer bg-fill-default hover:bg-fill-subtle border-2 border-border-default rounded-md px-4 py-2 disabled:cursor-not-allowed',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
