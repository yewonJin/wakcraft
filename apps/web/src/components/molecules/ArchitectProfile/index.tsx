import { Tier } from '@repo/types'

import { TierBox } from '@/components/atoms'

type Props = {
  curTier: Tier
  minecraftId: string
  wakzooId: string
  minecraftIdMatchingIndex?: number[] | null
  wakzooIdMatchingIndex?: number[] | null
}

export default function ArchitectProfile({
  curTier,
  minecraftId,
  wakzooId,
  minecraftIdMatchingIndex,
  wakzooIdMatchingIndex,
}: Props) {
  return (
    <div className="flex items-center gap-6">
      <TierBox tier={curTier} />
      <div className="flex flex-col gap-1">
        {minecraftIdMatchingIndex && minecraftIdMatchingIndex.length ? (
          <p className="text-xl font-medium">
            {minecraftId.split('').map((char, index) => {
              if (minecraftIdMatchingIndex.includes(index))
                return (
                  <span className="text-yellow-600" key={char + index}>
                    {char}
                  </span>
                )

              return <span key={char + index}>{char}</span>
            })}
          </p>
        ) : (
          <p className="text-xl font-medium">{minecraftId}</p>
        )}
        {wakzooIdMatchingIndex && wakzooIdMatchingIndex.length ? (
          <p className="text-text-subtle">
            {wakzooId.split('').map((char, index) => {
              if (wakzooIdMatchingIndex.includes(index))
                return (
                  <span className="text-yellow-600" key={char + index}>
                    {char}
                  </span>
                )

              return <span key={char + index}>{char}</span>
            })}
          </p>
        ) : (
          <p className="text-text-subtle">{wakzooId}</p>
        )}
      </div>
    </div>
  )
}
