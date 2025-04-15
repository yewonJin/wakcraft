import {
  HomeCarousel,
  HomeSeasonInfo,
  HomeNoobProHacker,
} from '@/components/organisms'

export default function Home() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <HomeCarousel />
      <HomeSeasonInfo />
      <HomeNoobProHacker />
    </div>
  )
}
