import Image from 'next/image'

export default function Home() {
  return (
    <div className="h-[2000px]">
      <div
        className="absolute top-0 left-0 z-[-1] h-full w-full bg-[rgba(0,0,0,0.5)] bg-cover bg-center bg-no-repeat bg-blend-darken"
        style={{
          backgroundImage:
            'url("https://wakcraft.s3.ap-northeast-2.amazonaws.com/noobProHacker/episode 55/BenTen-hacker.1080p.webp")',
        }}
      ></div>
      <div className="flex w-full flex-col items-center justify-center gap-10 md:h-[80vh]">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-5xl font-bold text-neutral-100">
            눕프로해커 : 자유 편
          </h1>
          <h2 className="text-4xl font-semibold text-neutral-400">55회</h2>
        </div>
        <div className="flex justify-center gap-4 text-neutral-200">
          <button className="rounded-lg bg-neutral-900 px-4 py-2 text-lg">
            벤10
          </button>
          <button className="rounded-lg bg-neutral-800/80 px-4 py-2 text-lg opacity-50">
            카오리
          </button>
          <button className="rounded-lg bg-neutral-800/80 px-4 py-2 text-lg opacity-50">
            백제금향대향로
          </button>
          <button className="rounded-lg bg-neutral-800/80 px-4 py-2 text-lg opacity-50">
            성진우
          </button>
          <button className="rounded-lg bg-neutral-800/80 px-4 py-2 text-lg opacity-50">
            인터랩터
          </button>
          <button className="rounded-lg bg-neutral-800/80 px-4 py-2 text-lg opacity-50">
            가논돌프
          </button>
        </div>
        <div className="relative grid w-full grid-cols-3 gap-8">
          <div className="relative aspect-[4/5] bg-cover">
            <Image
              fill
              style={{ objectFit: 'cover' }}
              src={
                'https://wakcraft.s3.ap-northeast-2.amazonaws.com/noobProHacker/episode 55/BenTen-noob.webp'
              }
              alt="작품 이미지"
            />
          </div>
          <div className="relative aspect-[4/5] bg-cover">
            <Image
              fill
              style={{ objectFit: 'cover' }}
              src={
                'https://wakcraft.s3.ap-northeast-2.amazonaws.com/noobProHacker/episode 55/BenTen-pro.webp'
              }
              alt="작품 이미지"
            />
          </div>
          <div className="relative aspect-[4/5] bg-cover">
            <Image
              fill
              style={{ objectFit: 'cover' }}
              src={
                'https://wakcraft.s3.ap-northeast-2.amazonaws.com/noobProHacker/episode 55/BenTen-hacker.webp'
              }
              alt="작품 이미지"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
