import { useState } from 'react'

import { useSearchArchitect } from '@/hooks/useSearchArchitect'
import { ArchitectIdInfo } from '@/store/architectStore'

export const useSearchArchitectPanel = (
  architects: ArchitectIdInfo[],
  onArchitectIdChange: (value: string[]) => void,
) => {
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

  const handleArchitectClick = (architect: ArchitectIdInfo) => {
    setInput(architect.wakzooId)
    onArchitectIdChange([architect.minecraftId])
  }

  return {
    filteredArchitect,
    input,
    isSelected,
    handleKeyDown,
    handleInputChange,
    handleArchitectClick,
  }
}
