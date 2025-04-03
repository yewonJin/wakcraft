'use client'

import { Architect } from '@repo/types'

import { ArchitectDetailHeader } from './Header'
import { ArchitectDetailAllTier } from './AllTier'
import { Separator } from '@/components/atoms'
import { ArchitectDetailControls } from './Controls'
import { ArchitectDetailPortfolioList } from './PortfolioList'

import { useArchitectDetail } from '@/hooks'

type Props = {
  architect: Architect
  defaultView: 'single' | 'grid'
}

export default function ArchitectDetail({ architect, defaultView }: Props) {
  const { currentView, category, toggleView, handleCategoryClick } =
    useArchitectDetail(defaultView)

  return (
    <div className="mx-auto pt-6 md:pt-12 xl:w-[1300px]">
      <ArchitectDetailHeader architect={architect} />
      <ArchitectDetailAllTier tier={architect.tier} />
      <Separator className="mb-6" />
      <ArchitectDetailControls
        category={category}
        currentView={currentView}
        onCategoryClick={handleCategoryClick}
        onViewToggle={toggleView}
      />
      <ArchitectDetailPortfolioList
        architect={architect}
        category={category}
        currentView={currentView}
      />
    </div>
  )
}
