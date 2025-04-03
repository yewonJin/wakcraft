import { Fragment } from 'react'
import { Architect, Category } from '@repo/types'

import ArchitectPortfolioGridItem from './GridItem'
import ArchitectPortfolioSingleItem from './SingleItem'

import {
  devideByYear,
  filterByCategory,
  sortByRecentDate,
} from '@/services/architect'

type Props = {
  architect: Architect
  category: '전체보기' | Category
  currentView: 'single' | 'grid'
}

export function ArchitectDetailPortfolioList({
  architect,
  category,
  currentView,
}: Props) {
  return (
    <div className="flex flex-col gap-12 px-4 xl:px-0">
      {Object.entries(
        devideByYear(
          filterByCategory(category, sortByRecentDate(architect.portfolio)),
        ),
      )
        .reverse()
        .map(([year, yearItems]) => (
          <Fragment key={year}>
            <div className="mt-2 flex items-center gap-4">
              <h3 className="min-w-fit text-2xl font-medium">{year}년</h3>
              <div className="bg-fill-subtle h-[1px] w-full"></div>
            </div>
            {currentView === 'grid' ? (
              <div className="grid gap-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
                {yearItems.map((item) => (
                  <ArchitectPortfolioGridItem key={item.date} item={item} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-8 gap-y-12">
                {yearItems.map((item) => (
                  <ArchitectPortfolioSingleItem key={item.date} item={item} />
                ))}
              </div>
            )}
          </Fragment>
        ))}
    </div>
  )
}
