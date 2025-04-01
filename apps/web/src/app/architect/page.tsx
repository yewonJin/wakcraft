import { Suspense } from 'react'

import ArchitectHome from '@/components/templates/ArchitectHome'

import { getArchitectsWithoutPortfolio } from '@/libs/actions/architect'
import { sortByTier } from '@/services/architect'

export default async function Page() {
  const architects = await getArchitectsWithoutPortfolio()
  const sortedArchitectsByTier = architects.sort(sortByTier)

  return (
    <Suspense>
      <ArchitectHome
        architects={JSON.parse(JSON.stringify(sortedArchitectsByTier))}
      />
    </Suspense>
  )
}
