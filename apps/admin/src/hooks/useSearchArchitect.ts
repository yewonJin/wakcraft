import { ArchitectIdInfo } from '@/store/architectStore'
import { fuzzyMatcher } from '@repo/utils'

type Props = {
  architects: ArchitectIdInfo[]
  input: string
}

export const useSearchArchitect = ({ architects, input }: Props) => {
  const filteredArchitect = architects.filter(
    ({ minecraftId, wakzooId }) =>
      wakzooId.toLowerCase().match(fuzzyMatcher(input.toLowerCase())) ||
      minecraftId.toLowerCase().match(fuzzyMatcher(input.toLowerCase())),
  )

  const isSelected = filteredArchitect.length
    ? input === filteredArchitect[0].minecraftId ||
      input === filteredArchitect[0].wakzooId
    : false

  return {
    filteredArchitect,
    isSelected,
  }
}
