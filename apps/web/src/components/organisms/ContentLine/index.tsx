'use client'

import { LineEventNoobProHacker, NoobProHacker } from '@repo/types'

import {
  CarouselContainer,
  CarouselMobileContainer,
  CarouselSlider,
} from './Carousel'
import { ContentLineInfo } from './Info'
import { ContentLineItem } from './Item'

import { useContentLine } from '@/hooks'

type Props = {
  isMobile: boolean
  content: NoobProHacker | LineEventNoobProHacker
}

export default function ContentLine({ isMobile, content }: Props) {
  const { page, handleButtonClick, moveToNextPage, moveToPrevPage } =
    useContentLine(content)

  return (
    <div className="mt-12 flex flex-col gap-32">
      {content.workInfo.map((line, lineIndex) => (
        <div key={line.title}>
          <ContentLineInfo line={line} lineIndex={lineIndex} />
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
          {!isMobile && line.entries.length > 1 && (
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
  )
}
