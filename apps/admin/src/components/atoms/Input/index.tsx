import { cn } from '@/lib/cn'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ onChange, className, ...rest }: Props) {
  return (
    <input
      onChange={onChange}
      className={cn(
        `h-[40px] w-full rounded-md border-2 border-border-default bg-fill-default pl-3 outline-none disabled:opacity-40 disabled:bg-fill-strong disabled:cursor-not-allowed`,
        className,
      )}
      {...rest}
    />
  )
}
