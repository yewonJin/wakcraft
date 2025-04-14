import { Architect } from '@repo/types'

export type ArchitectWithMatchingIndices = Omit<Architect, 'portfolio'> & {
  minecraftIdMatchingIndex: number[] | null
  wakzooIdMatchingIndex: number[] | null
}
