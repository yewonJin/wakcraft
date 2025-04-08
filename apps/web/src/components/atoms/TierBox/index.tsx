import { TIER_IMAGES } from '@repo/constants'
import { AllTier } from '@repo/types'

type Props = {
  tier: AllTier
}

export default function TierBox({ tier }: Props) {
  return (
    <div
      className="relative flex h-[95px] w-[85px] items-center justify-center bg-cover bg-no-repeat text-center text-lg text-[white]"
      style={{
        textShadow: '1px 1px 1px black',
        backgroundImage: TIER_IMAGES[tier],
      }}
    >
      {tier}
    </div>
  )
}
