import { ArchitectForm } from '@/components/templates'

import { getArchitectIds } from '@/lib/actions/architect'

export default async function Page() {
  const architects = await getArchitectIds()

  return <ArchitectForm architects={JSON.parse(JSON.stringify(architects))} />
}
