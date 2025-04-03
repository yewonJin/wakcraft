import { Metadata } from 'next'
import { Suspense } from 'react'

import { ArchitectMain } from '@/components/templates'

import { getArchitectsWithoutPortfolio } from '@/libs/actions/architect'
import { sortByTier } from '@/services/architect'

export const metadata: Metadata = {
  title: '왁크래프트 | 건축가',
  description:
    '유튜버 우왁굳의 마인크래프트 건축가들의 포트폴리오를 볼 수 있다.',
}

export default async function Page() {
  const architects = await getArchitectsWithoutPortfolio()
  const sortedArchitectsByTier = architects.sort(sortByTier)

  return (
    <Suspense>
      <ArchitectMain
        architects={JSON.parse(JSON.stringify(sortedArchitectsByTier))}
      />
    </Suspense>
  )
}
