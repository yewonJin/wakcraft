import { useState } from 'react'

import Input from '@/components/atoms/Input'
import { useSearchArchitect } from '@/hooks/useSearchArchitect'
import { Architect } from '@/types/architect'

type Props = {
  disabled?: boolean
  architects: Pick<Architect, 'minecraftId' | 'wakzooId' | '_id'>[]
  onArchitectIdChange: (value: string[]) => void
}

export default function SearchArchitectPanel({
  disabled,
  architects,
  onArchitectIdChange,
}: Props) {
  const [input, setInput] = useState('')

  const { filteredArchitect, isSelected } = useSearchArchitect({
    architects,
    input,
  })

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (input === '') return
    if (!filteredArchitect.length) return

    if (e.key === 'Tab') {
      setInput(filteredArchitect[0].wakzooId)
      onArchitectIdChange([filteredArchitect[0].minecraftId])
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    onArchitectIdChange([filteredArchitect[0]?.minecraftId ?? ''])
    if (
      filteredArchitect.length &&
      (input === filteredArchitect[0].minecraftId ||
        input === filteredArchitect[0].wakzooId)
    ) {
      setInput(e.target.value)
      onArchitectIdChange([filteredArchitect[0].minecraftId])
    }
  }

  const handleArchitectClick = (
    architect: Pick<Architect, 'minecraftId' | 'wakzooId' | '_id'>,
  ) => {
    setInput(architect.wakzooId)
    onArchitectIdChange([architect.minecraftId])
  }

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
