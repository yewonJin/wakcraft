import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, Users } from 'lucide-react'
import { ArchitectId } from '@repo/types'
import { cn, renamePngToWebp } from '@repo/utils'

import { Button, InfoBox, Tooltip } from '@/components/atoms'

import { PopulatedLineEntry, PopulatedLineInfo } from '@/types/content'
import { useContentLineContext } from './ContentLine.context'
import { useSlider } from './ContentLine.hooks'
import { useVisibilityOnHover } from '@/hooks'

export function ContentLineView() {
  const { content } = useContentLineContext()

  return (
    <ContentLineView.Container>
      {content.workInfo.map((line, lineIndex) => (
        <ContentLineViewCarousel
          key={line.title}
          line={line}
          lineIndex={lineIndex}
        />
      ))}
    </ContentLineView.Container>
  )
}

ContentLineView.Container = function Container({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="mt-12 flex flex-col gap-32">{children}</div>
}

function ContentLineViewCarousel({
  line,
  lineIndex,
}: {
  line: PopulatedLineInfo
  lineIndex: number
}) {
  const { isMobile } = useContentLineContext()

  return (
    <ContentLineViewCarousel.Wrapper>
      <ContentLineViewCarousel.LineInfo line={line} lineIndex={lineIndex} />
      {isMobile ? (
        <ContentLineViewCarousel.MobileContainer entries={line.entries} />
      ) : (
        <ContentLineViewCarousel.DesktopContainer
          entries={line.entries}
          lineIndex={lineIndex}
        />
      )}
      <ContentLineViewCarousel.Slider
        lineIndex={lineIndex}
        entryLength={line.entries.length}
      />
    </ContentLineViewCarousel.Wrapper>
  )
}

ContentLineViewCarousel.Wrapper = function Wrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}

ContentLineViewCarousel.LineInfo = function LineInfo({
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

ContentLineViewCarousel.MobileContainer = function MobileContainer({
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
        <ContentLineViewItem key={entry.imageUrl} entry={entry} />
      ))}
    </div>
  )
}

ContentLineViewCarousel.DesktopContainer = function DesktopContainer({
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
        <ContentLineViewItem key={entry.imageUrl} entry={entry} />
      ))}
    </div>
  )
}

ContentLineViewCarousel.Slider = function Slider({
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

function ContentLineViewItem({ entry }: { entry: PopulatedLineEntry }) {
  const { isHovered, setHoverTrue, setHoverFalse } = useVisibilityOnHover([
    'youtube',
  ])

  return (
    <div
      onClick={() => {
        if (!entry.youtubeUrl) return
        window.open(entry.youtubeUrl)
      }}
      onMouseEnter={() => setHoverTrue('youtube')}
      onMouseLeave={() => setHoverFalse('youtube')}
      key={entry.imageUrl}
      className="relative h-full min-w-[100%] hover:cursor-pointer xl:aspect-video xl:min-w-auto"
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
          <ContentLineViewItem.ArchitectList architectIds={entry.architectId} />
        )}
      </InfoBox>
      {entry.youtubeUrl && (
        <Tooltip
          visible={isHovered['youtube']}
          position="bottom-right"
          className="md:right-2 md:bottom-2 md:px-4 md:py-2"
        >
          클릭하여 유튜브로 이동
        </Tooltip>
      )}
    </div>
  )
}

ContentLineViewItem.ArchitectList = function ArchitectList({
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
