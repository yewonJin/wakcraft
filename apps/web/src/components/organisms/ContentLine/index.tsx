'use client'

import { createContext, use, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, Users } from 'lucide-react'
import { ArchitectId } from '@repo/types'
import { cn, renamePngToWebp } from '@repo/utils'

import { Button, InfoBox, Tooltip } from '@/components/atoms'
import ErrorFallback from '../ErrorFallback'

import { useContentLine, useSlider } from '@/hooks'
import {
  PopulatedLineEntry,
  PopulatedLineEventNoobProHacker,
  PopulatedLineInfo,
  PopulatedNoobProHacker,
} from '@/types/content'

type Props = {
  isMobile: boolean
  content: PopulatedNoobProHacker | PopulatedLineEventNoobProHacker
}

type ContentLineContext = (ReturnType<typeof useContentLine> & Props) | null

const Context = createContext<ContentLineContext>(null)

const useContentLineContext = () => {
  const context = use(Context)
  if (!context) {
    throw new Error('ContentLineContext.Provider is missing')
  }
  return context
}

function ContentLine({ isMobile, content }: Props) {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <ContentLine.Provider isMobile={isMobile} content={content}>
        {content.workInfo.map((line, lineIndex) => (
          <ContentLineCarousel
            key={line.title}
            line={line}
            lineIndex={lineIndex}
          />
        ))}
      </ContentLine.Provider>
    </ErrorBoundary>
  )
}

ContentLine.Provider = function Provider({
  isMobile,
  content,
  children,
}: Props & { children: React.ReactNode }) {
  return (
    <Context.Provider value={{ ...useContentLine(content), content, isMobile }}>
      <div className="mt-12 flex flex-col gap-32">{children}</div>
    </Context.Provider>
  )
}

function ContentLineCarousel({
  line,
  lineIndex,
}: {
  line: PopulatedLineInfo
  lineIndex: number
}) {
  const { isMobile } = useContentLineContext()

  return (
    <ContentLineCarousel.Wrapper>
      <ContentLineCarousel.LineInfo line={line} lineIndex={lineIndex} />
      {isMobile ? (
        <ContentLineCarousel.MobileContainer entries={line.entries} />
      ) : (
        <ContentLineCarousel.DesktopContainer
          entries={line.entries}
          lineIndex={lineIndex}
        />
      )}
      <ContentLineCarousel.Slider
        lineIndex={lineIndex}
        entryLength={line.entries.length}
      />
    </ContentLineCarousel.Wrapper>
  )
}

ContentLineCarousel.Wrapper = function Wrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}

ContentLineCarousel.LineInfo = function LineInfo({
  line,
  lineIndex,
}: {
  line: PopulatedLineInfo
  lineIndex: number
}) {
  return (
    <div className="mb-4 flex items-center gap-2 px-4 xl:px-0">
      <span className="text-text-subtle">{`${lineIndex + 1}라인`}</span>
      <h3
        className="scroll-mt-[15vh] text-lg font-medium md:text-2xl"
        id={line.title}
      >
        {line.title}
      </h3>
      {line.ranking !== null && line.ranking !== 0 && (
        <div className="bg-fill-subtle mx-2 h-6 w-[2px]"></div>
      )}
      {line.ranking !== null && line.ranking !== 0 && (
        <span className="text-lg">{`${line.ranking}위`}</span>
      )}
    </div>
  )
}

ContentLineCarousel.MobileContainer = function MobileContainer({
  entries,
}: {
  entries: PopulatedLineEntry[]
}) {
  const { scrollX, isOnScroll, ref, onTouchStart, onTouchMove, onTouchEnd } =
    useSlider(entries.length)

  return (
    <div
      className="flex aspect-video w-full"
      ref={ref}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        transform: `translate3d(${scrollX}px, 0,0)`,
        transitionDuration: isOnScroll ? '0ms' : '400ms',
      }}
    >
      {entries.map((entry) => (
        <ContentLineItem key={entry.imageUrl} entry={entry} />
      ))}
    </div>
  )
}

ContentLineCarousel.DesktopContainer = function DesktopContainer({
  entries,
  lineIndex,
}: {
  entries: PopulatedLineEntry[]
  lineIndex: number
}) {
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1280)
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const { page } = useContentLineContext()

  return (
    <div
      className="w-vh relative mx-auto mt-8 flex aspect-video h-full w-[100%] gap-12 duration-500 ease-in-out md:max-w-[1300px] xl:h-[50vh] xl:w-full"
      style={{
        transform: isLargeScreen
          ? `translateX(calc(${-page[lineIndex] * 50 * (16 / 9)}vh - ${page[lineIndex] * 3}rem))`
          : `translateX(calc(${-page[lineIndex] * 100}% - ${page[lineIndex] * 3}rem))`,
      }}
    >
      {entries.map((entry) => (
        <ContentLineItem key={entry.imageUrl} entry={entry} />
      ))}
    </div>
  )
}

ContentLineCarousel.Slider = function Slider({
  lineIndex,
  entryLength,
}: {
  lineIndex: number
  entryLength: number
}) {
  const { isMobile, page, moveToNextPage, moveToPrevPage, handleButtonClick } =
    useContentLineContext()

  if (isMobile || entryLength === 1) return

  return (
    <div className="bg-fill-default relative mx-auto mt-12 flex w-fit gap-4 rounded-full px-10 py-6">
      <ChevronLeft
        onClick={() => moveToPrevPage(lineIndex)}
        width={52}
        height={52}
        className={cn(
          'hover:bg-fill-default absolute top-1 -left-16 rounded-full p-1.5 hover:cursor-pointer',
          page[lineIndex] === 0 && 'invisible',
        )}
      />
      {new Array(entryLength).fill(0).map((_, entryIndex) => (
        <Button
          key={entryIndex}
          onClick={() => handleButtonClick(lineIndex, entryIndex)}
          className={cn(
            'bg-text-subtler h-3 w-3 rounded-full px-0 py-0 duration-300',
            page[lineIndex] === entryIndex && 'w-12',
          )}
        />
      ))}
      <ChevronLeft
        onClick={() => moveToNextPage(lineIndex, entryLength)}
        width={52}
        height={52}
        className={cn(
          'hover:bg-fill-default absolute top-1 -right-16 rotate-180 rounded-full p-1.5 hover:cursor-pointer',
          page[lineIndex] === entryLength - 1 && 'invisible',
        )}
      />
    </div>
  )
}

function ContentLineItem({ entry }: { entry: PopulatedLineEntry }) {
  return (
    <div
      onClick={() => {
        if (!entry.youtubeUrl) return
        window.open(entry.youtubeUrl)
      }}
      key={entry.imageUrl}
      className="group relative h-full min-w-[100%] hover:cursor-pointer xl:aspect-video xl:min-w-auto"
    >
      <Image
        className="rounded-none xl:rounded-xl"
        fill
        alt="작품 이미지"
        src={renamePngToWebp(entry.imageUrl)}
      />
      <InfoBox
        position="top-left"
        className="top-[5%] left-[3%] flex-col bg-transparent"
      >
        <div className="mb-2 flex items-center gap-3">
          <p className="text-xl font-semibold text-white [text-shadow:_1px_1px_0_#000] md:text-2xl">
            {entry.tier || entry.title}
          </p>
          <div className="mt-1 flex gap-2">
            {entry.ranking !== null && entry.ranking !== 0 && (
              <p className="rounded-md bg-neutral-800/80 px-3 py-1 text-sm text-neutral-300 md:text-base">
                {entry.ranking}위
              </p>
            )}
          </div>
        </div>
        {entry.architectId.length < 5 ? (
          <div className="flex flex-col gap-2">
            {entry.architectId.map((id) => (
              <Link
                key={id.minecraftId}
                onClick={(e) => e.stopPropagation()}
                href={`/architect/${id.wakzooId}`}
                className="text-lg text-neutral-300 [text-shadow:_1px_1px_0_#000] hover:text-neutral-200"
              >
                {id.wakzooId.replaceAll('-', ' ')}
              </Link>
            ))}
          </div>
        ) : (
          <ContentLineItem.ArchitectList architectIds={entry.architectId} />
        )}
      </InfoBox>
      {entry.youtubeUrl && (
        <Tooltip
          position="bottom-right"
          className="group-hover:visible md:right-2 md:bottom-2 md:px-4 md:py-2"
        >
          클릭하여 유튜브로 이동
        </Tooltip>
      )}
    </div>
  )
}

ContentLineItem.ArchitectList = function ArchitectList({
  architectIds,
}: {
  architectIds: ArchitectId[]
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleUserClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="relative mt-3">
      <Users
        className="text-neutral-400 hover:text-neutral-300"
        onClick={handleUserClick}
      />
      {isOpen && (
        <div className="right-0 grid grid-cols-3 gap-1 bg-neutral-900/90">
          {architectIds.map((id) => (
            <Link
              onClick={(e) => e.stopPropagation()}
              key={id.minecraftId}
              href={`/architect/${id.wakzooId}`}
              className="px-3 py-2 text-sm text-neutral-300 [text-shadow:_1px_1px_0_#000] hover:text-neutral-200"
            >
              {id.wakzooId}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default ContentLine
