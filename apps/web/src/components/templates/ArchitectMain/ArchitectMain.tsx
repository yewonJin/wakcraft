'use client'

import { Architect } from '@repo/types'

import { ArchitectMainProvider } from './ArchitectMain.Provider'
import { ArchitectMainView } from './ArchitectMain.View'

type Props = {
  architects: Omit<Architect, 'portfolio'>[]
}

export default function ArchitectMain({ architects }: Props) {
  return (
    <ArchitectMainProvider>
      <ArchitectMainView architects={architects} />
    </ArchitectMainProvider>
  )
}
