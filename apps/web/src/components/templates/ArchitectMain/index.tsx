'use client'

import { Architect } from '@repo/types'

import { MainPageTitle } from '@/components/molecules'
import { ArchitectMainSearchBar } from './SearchBar'
import { ArchitectMainSortButtons } from './SortButtons'
import { ArchitectMainTierButtons } from './TierButtons'
import { ArchitectMainItem } from './Item'

import { useArchitectMain, useSearchArchitect } from '@/hooks'

type Props = {
  architects: Omit<Architect, 'portfolio'>[]
}

export default function ArchitectMain({ architects }: Props) {
  const {
    sortKey,
    isDescending,
    selectedTier,
    handleSortClick,
    handleTierClick,
    compareArchitects,
    filterArchitectsByTier,
  } = useArchitectMain()
  const {
    input,
    handleInputChange,
    compareMatchingIndex,
    addMatchingIndicesToArchitect,
  } = useSearchArchitect()

  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-6 md:pt-12 xl:px-0">
      <MainPageTitle
        title="건축가"
        description="마인크래프트 건축가들의 포트폴리오를 볼 수 있다."
      />
      <div className="mb-4 flex flex-col-reverse justify-between gap-4 lg:flex-row">
        <ArchitectMainSearchBar
          input={input}
          onInputChange={handleInputChange}
        />
        <ArchitectMainSortButtons
          input={input}
          sortKey={sortKey}
          isDescending={isDescending}
          onSortClick={handleSortClick}
        />
      </div>
      <ArchitectMainTierButtons
        selectedTier={selectedTier}
        onTierClick={handleTierClick}
      />
      <div className="flex flex-col gap-4">
        {architects
          .reduce(addMatchingIndicesToArchitect, [])
          .filter(filterArchitectsByTier)
          .sort(compareMatchingIndex)
          .sort(input === '' ? compareArchitects : () => 1)
          .map((architect, index) => (
            <ArchitectMainItem
              key={architect.minecraftId}
              architect={architect}
              order={index}
            />
          ))}
      </div>
    </div>
  )
}
