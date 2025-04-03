import { useEffect, useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@repo/utils'

import { Button } from '@/components/atoms'

import { useSlider } from '@/hooks'

type CarouselMobileContainerProps = {
  length: number
  children: React.ReactNode
}

export function CarouselMobileContainer({
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

export function CarouselContainer({
  page,
  index,
  children,
}: CarouselContainerProps) {
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

export function CarouselSlider({
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
