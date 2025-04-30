import { Clapperboard } from 'lucide-react'
import { cn } from '@repo/utils'

type Props = {
  isHovered: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  type: 'grid' | 'single'
  youtubeUrl: string | null
}

export default function ArchitectYoutubeLink({
  type,
  youtubeUrl,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  if (!youtubeUrl) return
  return (
    <div
      className={cn(
        'absolute z-10 w-8 rounded-lg fill-[#fff] p-[3px] text-left opacity-80 hover:cursor-pointer hover:rounded-l-none hover:opacity-100',
        type === 'grid' ? 'top-2 right-2' : 'top-10 right-10',
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={(e) => {
        e.stopPropagation()
        window.open(youtubeUrl)
      }}
    >
      <Clapperboard
        className="absolute text-neutral-800/50"
        width={type === 'grid' ? 25 : 32}
        height={type === 'grid' ? 25 : 32}
      />
      <Clapperboard
        className="absolute text-white"
        width={type === 'grid' ? 24 : 34}
        height={type === 'grid' ? 24 : 34}
      />
      <p
        className={cn(
          'invisible absolute top-0 flex w-max items-center pr-[6px] pb-[1px] pl-[10px] text-sm text-[white] [text-shadow:_1px_1px_0_#000] group-hover/youtube:rounded-l-lg',
          type === 'grid' ? 'right-8 h-8' : 'right-9 h-10',
          isHovered && 'visible',
        )}
      >
        유튜브로 이동
      </p>
    </div>
  )
}
