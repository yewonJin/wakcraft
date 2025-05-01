'use client'

import { GridEventNoobProHacker, PlacementTest } from '@repo/types'

import { GridContentFormProvider } from './GridContentForm.Provider'
import { GridContentFormView } from './GridContentForm.View'

export type Props<T extends GridEventNoobProHacker | PlacementTest> = {
  initialContent: T
  action: (payload: T) => Promise<void>
}

export default function GridContentForm<
  T extends GridEventNoobProHacker | PlacementTest,
>({ action, initialContent }: Props<T>) {
  return (
    <GridContentFormProvider action={action} initialContent={initialContent}>
      <GridContentFormView />
    </GridContentFormProvider>
  )
}
