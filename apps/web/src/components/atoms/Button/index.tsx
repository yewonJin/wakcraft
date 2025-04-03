import { cn } from '@repo/utils'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactNode
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
        'bg-fill-default relative w-max rounded-md px-4 py-2 hover:cursor-pointer',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
