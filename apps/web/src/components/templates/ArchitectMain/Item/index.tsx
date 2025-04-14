import Link from 'next/link'

import { ArchitectProfile, ArchitectStatistics } from '@/components/molecules'

import { useIntersectionObserver } from '@/hooks'
import { ArchitectWithMatchingIndices } from '@/types/architect'

type Props = {
  architect: ArchitectWithMatchingIndices
  order: number
}

export function ArchitectMainItem({ architect, order }: Props) {
  const { observerRef, isIntersecting } =
    useIntersectionObserver<HTMLAnchorElement>(order < 10 ? true : false)

  return (
    <Link
      key={architect.wakzooId}
      href={`/architect/${architect.wakzooId.replaceAll(' ', '-')}`}
      ref={observerRef}
    >
      {isIntersecting ? (
        <div className="bg-fill-default hover:bg-fill-subtle flex flex-col justify-center gap-2 rounded-md p-4">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center sm:gap-0 md:pr-8">
            <ArchitectProfile
              curTier={architect.curTier}
              minecraftId={architect.minecraftId}
              wakzooId={architect.wakzooId}
              wakzooIdMatchingIndex={architect.wakzooIdMatchingIndex}
              minecraftIdMatchingIndex={architect.minecraftIdMatchingIndex}
            />
            <ArchitectStatistics statistics={architect.statistics} />
          </div>
        </div>
      ) : (
        <div className="bg-fill-default h-[127px] rounded-md"></div>
      )}
    </Link>
  )
}
