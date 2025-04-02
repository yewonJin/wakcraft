import NoobProHackerHome from '@/components/templates/NoobProHackerHome'

import { getNoobProHackers } from '@/libs/actions/noobprohacker'

export default async function Page() {
  const noobprohackers = await getNoobProHackers()

  return (
    <NoobProHackerHome
      noobprohackers={JSON.parse(JSON.stringify(noobprohackers))}
    />
  )
}
