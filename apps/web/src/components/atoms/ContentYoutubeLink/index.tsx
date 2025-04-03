import { cn } from '@repo/utils'
import { Link2 } from 'lucide-react'

type Props = {
  youtubeUrl: string | null
  className?: string
}

export default function ContentYoutubeLink({ youtubeUrl, className }: Props) {
  if (!youtubeUrl) return

  return (
    <div
      onClick={(e) => {
        e.preventDefault()
        window.open(youtubeUrl)
      }}
      className={cn(
        'text-text-subtle bg-fill-default hover:bg-fill-subtle flex w-fit items-center gap-2 rounded-md px-4 py-2 text-sm hover:cursor-pointer',
        className,
      )}
    >
      <Link2 width={20} height={20} />
      유튜브로 이동
    </div>
  )
}
