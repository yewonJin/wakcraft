import { cookies } from 'next/headers'

import ArchitectDetail from '@/components/templates/ArchitectDetail'
import { getArchitectById } from '@/libs/actions/architect'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const architect = await getArchitectById(
    decodeURIComponent(id.replaceAll('-', ' ')),
  )

  const cookieStore = await cookies()
  const view = cookieStore.get('architect-view')?.value as
    | 'single'
    | 'grid'
    | undefined

  if (!architect) return <div>해당 건축가가 없습니다.</div>

  return (
    <ArchitectDetail
      architect={JSON.parse(JSON.stringify(architect))}
      defaultView={view || 'grid'}
    />
  )
}
