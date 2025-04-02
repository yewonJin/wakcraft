'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, Link2, Users } from 'lucide-react'
import { LineEventNoobProHacker, LineInfo, NoobProHacker } from '@repo/types'
import { cn, renamePngTo1080Webp } from '@repo/utils'

import { useSlider } from '@/hooks/useSlider'

type Props = {
  isMobile: boolean
  content: NoobProHacker | LineEventNoobProHacker
}

export default function ContentLine({ isMobile, content }: Props) {
  const [page, setPage] = useState(new Array(content.workInfo.length).fill(0))

  const handleButtonClick = (lineIndex: number, entryIndex: number) => {
    setPage((prev) => {
      const newPage = [...prev]
      newPage[lineIndex] = entryIndex
      return newPage
    })
  }

  const moveToNextPage = (lineIndex: number, length: number) => {
    setPage((prev) => {
      const newPage = [...prev]

      if (prev[lineIndex] === length - 1) {
        return prev
      }

      newPage[lineIndex]++
      return newPage
    })
  }

  const moveToPrevPage = (lineIndex: number) => {
    setPage((prev) => {
      const newPage = [...prev]

      if (prev[lineIndex] === 0) {
        return prev
      }

      newPage[lineIndex]--
      return newPage
    })
  }

  const getSubTitle = () => {
    if ('type' in content) {
      return `예능 눕프핵 ${content.contentInfo.episode}회 `
    } else {
      return `제 ${content.contentInfo.episode}회`
    }
  }

  const getTitle = () => {
    if ('type' in content) {
      return content.contentInfo.title
    } else {
      return `눕프로해커 : ${content.contentInfo.title}편`
    }
  }

  return (
    <div className="overflow-hidden">
      <div className="mx-auto max-w-[1300px] pt-6 md:pt-12">
        <h2 className="text-text-subtler mb-2 px-4 text-xl xl:px-0">
          {getSubTitle()}
        </h2>
        <h1 className="mb-6 px-4 text-4xl font-semibold xl:px-0">
          {getTitle()}
        </h1>
        {content.contentInfo.youtubeUrl && (
          <div
            onClick={() =>
              window.open(content.contentInfo.youtubeUrl as string)
            }
            className="text-text-subtle bg-fill-default hover:bg-fill-subtle mb-8 ml-4 flex w-fit items-center gap-2 rounded-md px-4 py-2 text-sm hover:cursor-pointer xl:ml-0"
          >
            <Link2 width={20} height={20} />
            유튜브로 이동
          </div>
        )}
        <div className="flex flex-col gap-32">
          {content.workInfo.map((line, lineIndex) => (
            <div key={line.title}>
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
              {isMobile ? (
                <CarouselMobileContainer length={line.entries.length}>
                  {line.entries.map((entry) => (
                    <ContentLineItem key={entry.imageUrl} entry={entry} />
                  ))}
                </CarouselMobileContainer>
              ) : (
                <CarouselContainer page={page} index={lineIndex}>
                  {line.entries.map((entry) => (
                    <ContentLineItem key={entry.imageUrl} entry={entry} />
                  ))}
                </CarouselContainer>
              )}
              {!isMobile && (
                <CarouselSlider
                  page={page}
                  lineIndex={lineIndex}
                  entryLength={line.entries.length}
                  moveToNextPage={moveToNextPage}
                  moveToPrevPage={moveToPrevPage}
                  handleButtonClick={handleButtonClick}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ContentLineItem({ entry }: { entry: LineInfo['entries'][number] }) {
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
        src={renamePngTo1080Webp(entry.imageUrl)}
      />
      <div className="absolute top-2 left-2 rounded-md px-4 py-2 md:top-8 md:left-8">
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
          <Link
            href={`/architect/${entry.architectId}`}
            className="text-lg text-neutral-300 [text-shadow:_1px_1px_0_#000] hover:text-neutral-200"
          >
            {entry.architectId[0].replaceAll('-', ' ')}
          </Link>
        ) : (
          <ContentArchitects entry={entry} />
        )}
      </div>
      {entry.youtubeUrl && (
        <div className="invisible absolute right-2 bottom-2 rounded-md bg-neutral-800/80 px-3 py-2 group-hover:visible">
          클릭하여 유튜브로 이동
        </div>
      )}
    </div>
  )
}

function ContentArchitects({ entry }: { entry: LineInfo['entries'][number] }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleUserClick = () => {
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
          {entry.architectId.map((id) => (
            <Link
              key={id}
              href={`/architect/${id}`}
              className="px-3 py-2 text-sm text-neutral-300 [text-shadow:_1px_1px_0_#000] hover:text-neutral-200"
            >
              {id}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

type CarouselMobileContainerProps = {
  length: number
  children: React.ReactNode
}

function CarouselMobileContainer({
  length,
  children,
}: CarouselMobileContainerProps) {
  const { scrollX, isOnScroll, ref, onTouchStart, onTouchMove, onTouchEnd } =
    useSlider(length)

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
      {children};
    </div>
  )
}

type CarouselContainerProps = {
  page: number[]
  index: number
  children: React.ReactNode
}

function CarouselContainer({ page, index, children }: CarouselContainerProps) {
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1280)
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      className="w-vh relative mx-auto mt-8 flex aspect-video h-full w-[100%] gap-12 duration-500 ease-in-out md:max-w-[1300px] xl:h-[50vh] xl:w-full"
      style={{
        transform: isLargeScreen
          ? `translateX(calc(${-page[index] * 50 * (16 / 9)}vh - ${page[index] * 3}rem))`
          : `translateX(calc(${-page[index] * 100}% - ${page[index] * 3}rem))`,
      }}
    >
      {children}
    </div>
  )
}

type CarouselSliderProps = {
  page: number[]
  lineIndex: number
  entryLength: number
  moveToPrevPage: (lineIndex: number) => void
  handleButtonClick: (lineIndex: number, entryIndex: number) => void
  moveToNextPage: (lineIndex: number, entryLength: number) => void
}

function CarouselSlider({
  page,
  lineIndex,
  entryLength,
  moveToNextPage,
  moveToPrevPage,
  handleButtonClick,
}: CarouselSliderProps) {
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
      {new Array(entryLength).fill(0).map((item, entryIndex) => (
        <button
          key={entryIndex}
          onClick={() => handleButtonClick(lineIndex, entryIndex)}
          className={cn(
            'bg-text-subtler h-3 w-3 rounded-full duration-300 hover:cursor-pointer',
            page[lineIndex] === entryIndex && 'w-12',
          )}
        ></button>
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
