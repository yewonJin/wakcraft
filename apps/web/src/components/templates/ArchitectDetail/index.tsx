'use client'

import { Fragment, useEffect } from 'react'
import { Architect, Category } from '@repo/types'
import { cn } from '@repo/utils'

import Switch from '@/components/atoms/Switch'
import ArchitectProfile from '@/components/molecules/ArchitectProfile'
import ArchitectStatistics from '@/components/molecules/ArchitectStatistics'
import ArchitectAllTier from '@/components/molecules/ArchitectAllTier'
import ArchitectPortfolioGridItem from '@/components/molecules/ArchitectPortfolioGridItem'
import ArchitectPortfolioSingleItem from '@/components/molecules/ArchitectPortfolioSingleItem'

import { useArchitectStore } from '@/store/architectStore'
import {
  devideByYear,
  filterByCategory,
  sortByRecentDate,
} from '@/services/architect'

type Props = {
  architect: Architect
  defaultView: 'single' | 'grid'
}

export default function ArchitectDetail({ architect, defaultView }: Props) {
  const { view, category, toggleView, setView, setCategory } =
    useArchitectStore()

  const currentView = view || defaultView

  const handleCategoryClick = (category: '전체보기' | Category) => {
    setCategory(category)
  }

  useEffect(() => {
    setView(defaultView)
  }, [])

  return (
    <div className="mx-auto w-[1300px] pt-12">
      <div className="flex flex-col justify-center rounded-md">
        <div className="mb-4 flex items-center justify-between">
          <ArchitectProfile
            curTier={architect.curTier}
            minecraftId={architect.minecraftId}
            wakzooId={architect.wakzooId}
          />
          <ArchitectStatistics statistics={architect.statistics} />
        </div>
        <ArchitectAllTier tier={architect.tier} />
        <div className="bg-fill-default mb-6 h-[1px] w-full"></div>
        <div className="mb-6 flex justify-between">
          <div className="flex gap-4">
            {['전체보기', '눕프로해커', '예능 눕프핵', '배치고사'].map(
              (item) => (
                <button
                  className={cn(
                    'bg-fill-default cursor-pointer rounded-md px-4 py-2 duration-300',
                    category === item
                      ? 'bg-text-subtle text-fill-default'
                      : 'hover:bg-fill-subtle',
                  )}
                  key={item}
                  onClick={() =>
                    handleCategoryClick(item as '전체보기' | Category)
                  }
                >
                  {item}
                </button>
              ),
            )}
          </div>
          <Switch
            isOn={currentView === 'single'}
            label="하나씩 보기"
            onClick={toggleView}
          />
        </div>
        {currentView === 'grid' ? (
          <div className="flex flex-col gap-12">
            {Object.entries(
              devideByYear(
                filterByCategory(
                  category,
                  sortByRecentDate(architect.portfolio),
                ),
              ),
            )
              .reverse()
              .map(([year, yearItems]) => (
                <Fragment key={year}>
                  <div className="mt-2 flex items-center gap-4">
                    <h3 className="min-w-fit text-2xl font-medium">{year}년</h3>
                    <div className="bg-fill-subtle h-[1px] w-full"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-8 gap-y-12">
                    {yearItems.map((item) => (
                      <ArchitectPortfolioGridItem key={item.date} item={item} />
                    ))}
                  </div>
                </Fragment>
              ))}
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {Object.entries(
              devideByYear(
                filterByCategory(
                  category,
                  sortByRecentDate(architect.portfolio),
                ),
              ),
            )
              .reverse()
              .map(([year, yearItems]) => (
                <Fragment key={year}>
                  <div className="mt-2 flex items-center gap-4">
                    <h3 className="min-w-fit text-2xl font-medium">{year}년</h3>
                    <div className="bg-fill-subtle h-[1px] w-full"></div>
                  </div>
                  <div className="flex flex-col gap-8 gap-y-12">
                    {yearItems.map((item) => (
                      <ArchitectPortfolioSingleItem
                        key={item.date}
                        item={item}
                      />
                    ))}
                  </div>
                </Fragment>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
