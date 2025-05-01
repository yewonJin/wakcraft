import { useParams } from 'next/navigation'

import { Props } from './GridContentForm'
import { useContentForm } from '@/hooks/useContentForm'
import { GridContentFormContext } from '@/hooks/useContentFormContext'
import { GridEventNoobProHacker, PlacementTest } from '@repo/types'

export function GridContentFormProvider<
  T extends PlacementTest | GridEventNoobProHacker,
>({
  initialContent,
  action,
  children,
}: Props<T> & { children: React.ReactNode }) {
  const params = useParams()
  const isEditMode = Boolean(params?.episode)

  return (
    <GridContentFormContext.Provider
      value={{
        action: action as (
          payload: GridEventNoobProHacker | PlacementTest,
        ) => Promise<void>,
        ...useContentForm(initialContent),
        isEditMode,
      }}
    >
      {children}
    </GridContentFormContext.Provider>
  )
}
