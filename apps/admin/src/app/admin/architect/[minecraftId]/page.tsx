import { EditArchitectForm } from '@/components/templates'

import { getArchitect, updateArchitect } from '@/lib/actions/architect'

export default async function Page({
  params,
}: {
  params: Promise<{ minecraftId: string }>
}) {
  const { minecraftId } = await params
  const architect = await getArchitect(minecraftId)

  if (!architect) return <h1>해당 건축가가 없습니다.</h1>

  return (
    <EditArchitectForm
      action={updateArchitect}
      architect={JSON.parse(JSON.stringify(architect))}
    />
  )
}
