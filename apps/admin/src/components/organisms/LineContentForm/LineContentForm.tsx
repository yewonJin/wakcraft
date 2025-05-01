'use client'

import { LineContentFormProvider } from './LineContentForm.Provider'
import { LineContentFormView } from './LineContentForm.View'

import { LineEventNoobProHacker, NoobProHacker } from '@repo/types'

type Props<T extends NoobProHacker | LineEventNoobProHacker> = {
  action: (payload: T) => Promise<void>
  initialContent: T
}

export default function LineContentForm<
  T extends NoobProHacker | LineEventNoobProHacker,
>({ action, initialContent }: Props<T>) {
  return (
    <LineContentFormProvider action={action} initialContent={initialContent}>
      <LineContentFormView />
    </LineContentFormProvider>
  )
}
