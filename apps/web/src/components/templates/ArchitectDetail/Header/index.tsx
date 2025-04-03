import { Architect } from '@repo/types'

import { ArchitectProfile, ArchitectStatistics } from '@/components/molecules'

type Props = {
  architect: Architect
}

export function ArchitectDetailHeader({ architect }: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 px-4 sm:flex-row sm:justify-between md:items-center xl:px-0">
      <ArchitectProfile
        curTier={architect.curTier}
        minecraftId={architect.minecraftId}
        wakzooId={architect.wakzooId}
      />
      <ArchitectStatistics statistics={architect.statistics} />
    </div>
  )
}
