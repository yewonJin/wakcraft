import { useParams } from 'next/navigation'

import { useContentForm } from '@/hooks/useContentForm'
import { LineEventNoobProHacker, NoobProHacker } from '@repo/types'
import { LineContentFormContext } from '@/hooks/useContentFormContext'

export function LineContentFormProvider<
  T extends NoobProHacker | LineEventNoobProHacker,
>({
  initialContent,
  action,
  children,
}: {
  initialContent: T
  action: (payload: T) => Promise<void>
  children: React.ReactNode
}) {
  const params = useParams()
  const isEditMode = Boolean(params?.episode)

  return (
    <LineContentFormContext.Provider
      value={{
        action: action as (
          payload: NoobProHacker | LineEventNoobProHacker,
        ) => Promise<void>,
        ...useContentForm(initialContent),
        isEditMode,
      }}
    >
      {children}
    </LineContentFormContext.Provider>
  )
}
