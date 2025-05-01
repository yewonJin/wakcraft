import { Input } from '@/components/atoms'
import { ArchitectIdInfo } from '@/store/architectStore'
import { useSearchArchitectPanel } from './SearchArchitectPanel.hooks'

type Props = {
  disabled?: boolean
  architects: ArchitectIdInfo[]
  onArchitectIdChange: (value: string[]) => void
}

export default function SearchArchitectPanel({
  disabled,
  architects,
  onArchitectIdChange,
}: Props) {
  const {
    filteredArchitect,
    input,
    isSelected,
    handleKeyDown,
    handleInputChange,
    handleArchitectClick,
  } = useSearchArchitectPanel(architects, onArchitectIdChange)

  return (
    <div className="w-full relative">
      <Input
        name="minecraftId"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="건축가 검색..."
        className={
          isSelected ? 'bg-success-default border-0 border-success-default' : ''
        }
        disabled={disabled}
        tabIndex={1}
      />
      {input && filteredArchitect[0]?.wakzooId !== input && (
        <div className="flex flex-col absolute overflow-y-scroll max-h-60 w-full z-20">
          {filteredArchitect.map((architect) => (
            <div
              key={architect.minecraftId}
              className="cursor-pointer p-2 border-b-2 border-border-default bg-fill-default flex gap-2 items-center hover:bg-fill-subtle"
              onClick={() => handleArchitectClick(architect)}
            >
              <p className="text-sm min-w-max">{architect.wakzooId}</p>
              <p className="text-text-subtle text-xs truncate">
                {architect.minecraftId}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
