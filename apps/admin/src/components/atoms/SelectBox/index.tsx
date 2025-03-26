import { cn } from '@repo/utils'

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[] | number[]
  name: string
  optionSuffix?: string
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectBox(props: Props) {
  const {
    value,
    options,
    handleSelectChange,
    name,
    optionSuffix,
    className,
    ...rest
  } = props

  return (
    <select
      value={value}
      onChange={handleSelectChange}
      name={name}
      className={cn(
        'rounded-md py-2 border-2 border-border-default bg-fill-default pl-2 text-text-default outline-none',
        className,
      )}
      {...rest}
    >
      {options.map((option) => (
        <option
          className="bg-background-default hover:cursor-pointer"
          value={option}
          key={option}
        >
          {`${option}${optionSuffix ? optionSuffix : ''}`}
        </option>
      ))}
    </select>
  )
}
