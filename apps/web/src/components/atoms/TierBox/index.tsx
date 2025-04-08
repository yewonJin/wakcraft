import { AllTier } from '@repo/types'

type Props = {
  tier: AllTier
}

export const TIER_IMAGES: { [key in AllTier]: string } = {
  마카게: "url('/images/makage.webp')",
  오마카세: "url('/images/omakase.webp')",
  해커: "url('/images/hacker.webp')",
  해장국: "url('/images/haejangguk.webp')",
  국밥: "url('/images/gukbap.webp')",
  '미지근한 국밥': "url('/images/miguk.webp')",
  '식은 국밥': "url('/images/miguk.webp')",
  프로: "url('/images/pro.webp')",
  계추: "url('/images/gyechu.webp')",
  계륵: "url('/images/gyeruik.webp')",
  '가짜 눕': "url('/images/noob.webp')",
  '착한 눕': "url('/images/noob.webp')",
  '안 나쁜 눕': "url('/images/noob.webp')",
  '그냥 눕': "url('/images/purenoob.webp')",
  '진짜 눕': "url('/images/purenoob.webp')",
  '퓨어 눕': "url('/images/purenoob.webp')",
  언랭: "url('/images/purenoob.webp')",
} as const

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
