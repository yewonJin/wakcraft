import HomeCarousel from '@/components/organisms/HomeCarousel/HomeCarousel'
import HomeNoobProHacker from '@/components/organisms/HomeNoobProHacker/HomeNoobProHacker'
import HomeSeasonInfo from '@/components/organisms/HomeSeasonInfo/HomeSeasonInfo'

// TODO: organisms 컴포넌트들을 배럴 파일로 export하고자 함.
// 이 컴포넌트들에서는 prefetchQuery를 사용하여 데이터를 미리 가져오고,
// useQuery를 사용하는 방식으로 props drilling 문제를 해결함.
// 다만, useQuery의 queryFn에서 Server Actions을 사용하고 있어,
// Storybook 등에서 클라이언트 환경에서 실행 시 문제가 발생함

export default function Home() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <HomeCarousel />
      <HomeSeasonInfo />
      <HomeNoobProHacker />
    </div>
  )
}
