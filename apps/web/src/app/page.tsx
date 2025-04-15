import { Metadata } from 'next'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import { Home } from '@/components/templates'

import { getArchitectsWithTier } from '@/libs/actions/architect'
import {
  getLatestNoobProHacker,
  getRecentNoobProHackers,
  getSweepLines,
} from '@/libs/actions/noobprohacker'
import { getPlacementTestsWithoutWorkInfo } from '@/libs/actions/placementTest'

export const metadata: Metadata = {
  title: '왁크래프트 | 홈',
  description: '유튜버 우왁굳의 마인크래프트 컨텐츠 웹사이트',
}

async function prefetchHomeData() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['latestNoobProHacker'],
    queryFn: getLatestNoobProHacker,
  })

  await queryClient.prefetchQuery({
    queryKey: ['placementTestsWithoutWorkInfo'],
    queryFn: getPlacementTestsWithoutWorkInfo,
  })

  await queryClient.prefetchQuery({
    queryKey: ['architectsWithTier'],
    queryFn: getArchitectsWithTier,
  })

  await queryClient.prefetchQuery({
    queryKey: ['recentNoobProHackers'],
    queryFn: () => getRecentNoobProHackers(3),
  })

  await queryClient.prefetchQuery({
    queryKey: ['sweepLines'],
    queryFn: getSweepLines,
  })

  return queryClient
}

export default async function Page() {
  const queryClient = await prefetchHomeData()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home />
    </HydrationBoundary>
  )
}
