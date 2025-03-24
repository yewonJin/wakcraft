import Link from 'next/link'

export default function TopNav() {
  return (
    <div className="flex gap-16 h-[60px] px-8 items-center border-b-2 border-border-default">
      <Link href={'/'}>홈</Link>
      <Link href={'/admin/architect'}>건축가</Link>
      <Link href={'/admin/noobprohacker'}>눕프로해커</Link>
      <Link href={'/admin/event_noobprohacker'}>이벤트 눕프핵</Link>
      <Link href={'/admin/placement_test'}>배치고사</Link>
    </div>
  )
}
