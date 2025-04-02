import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto mt-10 max-w-[1200px] px-4 text-lg xl:px-0">
      <p className="mb-3">해당 페이지를 찾을 수 없습니다.</p>
      <p>
        문제가 있다면
        <Link
          className="mx-1 text-sky-600"
          target="_blank"
          href={'https://cafe.naver.com/steamindiegame/11638777'}
        >
          왁물원
        </Link>
        을 통해 개발자에게 연락주세요.
      </p>
    </div>
  )
}
