'use client'

import { createContext, Fragment, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Architect, Category } from '@repo/types'
import { cn, renamePngTo1080Webp, renamePngToWebp } from '@repo/utils'

import {
  ArchitectYoutubeLink,
  Button,
  InfoBox,
  Separator,
  Switch,
  Tooltip,
} from '@/components/atoms'
import { ArchitectProfile, ArchitectStatistics } from '@/components/molecules'

import { useArchitectDetail } from '@/hooks'
import {
  devideByYear,
  filterByCategory,
  getDetailCategory,
  getTierTextColor,
  sortByRecentDate,
} from '@/services/architect'
import { getContentUrl } from '@/services/content'

type Props = {
  architect: Architect
  defaultView: 'single' | 'grid'
}

type ArchitectDetailContext = ReturnType<typeof useArchitectDetail> & Props

const Context = createContext<ArchitectDetailContext | null>(null)
const { Provider: ContextProvider } = Context

function ArchitectDetail({ architect, defaultView }: Props) {
  return (
    <div className="mx-auto pt-6 md:pt-12 xl:w-[1300px]">
      <ArchitectDetail.Provider architect={architect} defaultView={defaultView}>
        <ArchitectDetail.Profile />
        <ArchitectDetail.TierInfo />
        <Separator className="mb-6" />
        <ArchitectDetail.Controls />
        <ArchitectDetail.PortfolioList />
      </ArchitectDetail.Provider>
    </div>
  )
}

ArchitectDetail.Provider = function Provider({
  children,
  architect,
  defaultView,
}: Props & { children: React.ReactNode }) {
  return (
    <ContextProvider
      value={{ ...useArchitectDetail(defaultView), architect, defaultView }}
    >
      {children}
    </ContextProvider>
  )
}

ArchitectDetail.Profile = function Profile() {
  const context = useContext(Context)
  if (!context) return

  const { architect } = context

  return (
    <div className="mb-6 flex flex-col gap-4 px-4 sm:flex-row sm:justify-between md:items-center xl:px-0">
      <ArchitectProfile
        curTier={architect.curTier}
        minecraftId={architect.minecraftId}
        wakzooId={architect.wakzooId}
      />
      <ArchitectStatistics statistics={architect.statistics} />
    </div>
  )
}

ArchitectDetail.TierInfo = function TierInfo() {
  const context = useContext(Context)
  if (!context) return

  const { architect } = context
  const { tier } = architect

  if (!tier.filter((item) => item.result !== '언랭').length) return null

  return (
    <div className="mb-6 flex flex-wrap gap-2 px-4 xl:px-0">
      {tier
        .filter((item) => item.result !== '언랭')
        .map((item) => (
          <div
            key={item.season}
            className={cn(
              'bg-fill-default flex items-center gap-1 rounded-sm px-2 py-1 text-sm',
              !item.isPortfolioPlacementTest &&
                'border-border-default border-2',
            )}
          >
            <span className="text-text-subtle">{`S${item.season}`}</span>
            <span
              className={cn('font-medium', getTierTextColor(item.result))}
            >{`${item.result}`}</span>
          </div>
        ))}
    </div>
  )
}

ArchitectDetail.Controls = function Controls() {
  const context = useContext(Context)
  if (!context) return

  const { category, handleCategoryClick, currentView, toggleView } = context

  return (
    <div className="mb-6 flex justify-between overflow-x-scroll px-4 pb-4 sm:overflow-x-hidden md:pb-0 xl:px-0">
      <div className="flex gap-4">
        {['전체보기', '눕프로해커', '예능 눕프핵', '배치고사'].map((item) => (
          <Button
            className={cn(
              'duration-300',
              category === item
                ? 'bg-text-subtle text-fill-default'
                : 'hover:bg-fill-subtle',
            )}
            key={item}
            onClick={() => handleCategoryClick(item as '전체보기' | Category)}
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="hidden items-center md:flex">
        <Switch
          isOn={currentView === 'single'}
          label="하나씩 보기"
          onClick={toggleView}
        />
      </div>
    </div>
  )
}

ArchitectDetail.PortfolioList = function PortfolioList() {
  const context = useContext(Context)
  if (!context) return

  const { category, architect, currentView } = context

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

function ArchitectPortfolioGridItem({
  item,
}: {
  item: Architect['portfolio'][number]
}) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="group/image dark:shadow-neutral-850/90 relative aspect-video rounded-xl shadow-md shadow-neutral-700/80 hover:cursor-pointer"
        onClick={() => window.open(renamePngTo1080Webp(item.imageUrl))}
      >
        <Image
          className="rounded-xl"
          fill
          src={renamePngToWebp(item.imageUrl)}
          alt="작품 이미지"
        />
        <ArchitectYoutubeLink type="grid" youtubeUrl={item.youtubeUrl} />
        <Tooltip
          position="bottom-right"
          className="text-sm group-hover/image:visible peer-hover:invisible"
        >
          클릭하여 원본 이미지 보기
        </Tooltip>
        {item.description && (
          <InfoBox position="top-left">{item.description}</InfoBox>
        )}
        {item.type && (
          <InfoBox position="bottom-left">{item.type} 라인</InfoBox>
        )}
      </div>
      <div className="relative flex justify-center">
        <div className="flex flex-col items-center gap-1">
          <Link
            href={getContentUrl(item.category, item.episode)}
            className="text-text-subtler hover:text-text-subtle"
          >
            {getDetailCategory(item.category, item.episode)}
          </Link>
          <p className="font-medium">{item.title}</p>
        </div>
        {item.ranking !== null && item.ranking !== 0 && (
          <div className="absolute right-5 flex flex-col items-center gap-1">
            <p className="text-text-subtler">순위</p>
            <p>{item.ranking}위</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ArchitectPortfolioSingleItem({
  item,
}: {
  item: Architect['portfolio'][number]
}) {
  return (
    <div
      key={item.date}
      className="group/image flex flex-col gap-4 hover:cursor-pointer"
      onClick={() => window.open(renamePngTo1080Webp(item.imageUrl))}
    >
      <div className="relative aspect-video">
        <Image
          className="rounded-3xl"
          fill
          src={renamePngTo1080Webp(item.imageUrl)}
          alt="작품 이미지"
        />
        <ArchitectYoutubeLink type="single" youtubeUrl={item.youtubeUrl} />
        <Tooltip
          position="bottom-right"
          className="px-3 py-2 group-hover/image:visible peer-hover:invisible"
        >
          클릭하여 원본 이미지 보기
        </Tooltip>
        <InfoBox
          position="top-left"
          className="top-9 left-9 flex-col items-center gap-1 bg-transparent text-base"
        >
          <Link
            onClick={(e) => e.stopPropagation()}
            href={getContentUrl(item.category, item.episode)}
            className="text-neutral-400 [text-shadow:_1px_1px_0_#555] hover:text-neutral-200"
          >
            {getDetailCategory(item.category, item.episode)}
          </Link>
          <p className="text-2xl font-semibold text-white [text-shadow:_1px_1px_0_#000]">
            {item.title}
          </p>
          <div className="mt-1 flex gap-2">
            {item.description && (
              <p className="rounded-md bg-neutral-800/80 px-3 py-1 text-neutral-300">
                {item.description}
              </p>
            )}
            {item.ranking !== null && item.ranking !== 0 && (
              <p className="rounded-md bg-neutral-800/80 px-3 py-1 text-neutral-300">
                {item?.type} {item.ranking}위
              </p>
            )}
          </div>
        </InfoBox>
      </div>
    </div>
  )
}

export default ArchitectDetail
