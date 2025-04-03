import { Search } from 'lucide-react'

type Props = {
  input: string
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function ArchitectMainSearchBar({ input, onInputChange }: Props) {
  return (
    <div className="relative flex items-center">
      <input
        className="border-border-default h-[40px] w-full rounded-md border-2 pl-3 outline-none lg:w-auto"
        placeholder="검색하세요..."
        value={input}
        onChange={onInputChange}
      />
      <Search width={20} height={20} className="absolute right-3" />
    </div>
  )
}
