import { Metadata } from 'next'
import { cookies } from 'next/headers'

import { NotFound } from '@/components/organisms'
import { ArchitectDetail } from '@/components/templates'
import {
  getArchitectById,
  getArchitectsWithoutPortfolio,
} from '@/libs/actions/architect'

export async function generateStaticParams() {
  const architects = await getArchitectsWithoutPortfolio()
  return [
    ...architects.map((architect) => ({ id: String(architect.wakzooId) })),
    ...architects.map((architect) => ({ id: String(architect.minecraftId) })),
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  // read route params
  const { id } = await params

  const architect = await getArchitectById(
    decodeURIComponent(id.replaceAll('-', ' ')),
  )

  return {
    title: architect?.wakzooId
      ? `왁크래프트 | ${architect.wakzooId}`
      : '왁크래프트 | 건축가',
    description: '유튜버 우왁굳의 마인크래프트 눕프로해커 건축가',
  }
}

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

  if (!architect) return <NotFound />

  return <ArchitectDetail architect={architect} defaultView={view || 'grid'} />
}
