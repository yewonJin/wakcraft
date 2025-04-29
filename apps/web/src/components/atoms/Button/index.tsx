import { cn } from '@repo/utils'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  border?: BorderStyle
  children?: React.ReactNode
}

type BorderStyle = 'default' | 'strong'

const getBorderStyle = (border: BorderStyle) => {
  const styles: Record<BorderStyle, string> = {
    default: 'border-border-default border-2',
    strong: 'border-border-strong border-2',
  }
  return styles[border]
}

export default function Button({
  onClick,
  border,
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
        border && getBorderStyle(border),
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
