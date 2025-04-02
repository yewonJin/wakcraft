import PlacementTestHome from '@/components/templates/PlacementTestHome'

import { getPlacementTests } from '@/libs/actions/placementTest'

export default async function Page() {
  const placementTests = await getPlacementTests()

  return (
    <PlacementTestHome
      placementTests={JSON.parse(JSON.stringify(placementTests))}
    />
  )
}
