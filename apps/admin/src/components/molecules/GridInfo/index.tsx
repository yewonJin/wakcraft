import { useParams } from 'next/navigation'

import Input from '@/components/atoms/Input'
import SearchArchitectPanel from '../SearchArchitectPanel'
import ImageManager from '../ImageManager'
import ImagePickerModal from '../ImagePickerModal'

import { type GridInfo } from '@/types/content'
import { useArchitectsStore } from '@/store/architectStore'
import { useModalStore } from '@/store/modalStore'

type Props = {
  entries: GridInfo[]
  onGridChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void
  onGridImageUrlChange: (index: number, imageUrl: string | null) => void
  onGridArchitectIdChange: (index: number, architectIds: string[]) => void
}

export default function GridInfo({
  entries,
  onGridChange,
  onGridImageUrlChange,
  onGridArchitectIdChange,
}: Props) {
  const { architects } = useArchitectsStore()
  const { show } = useModalStore()
  const params = useParams()

  return (
    <div className="gap-12 w-full grid 2xl:grid-cols-6 xl:grid-cols-4 md:grid-cols-3 gap-y-32">
      {show && <ImagePickerModal />}
      {entries.map((entry, entryIdx) => (
        <div key={entryIdx} className="">
          <div key={entryIdx} className="flex flex-col gap-4">
            <Input
              name="order"
              type="number"
              className="w-20"
              onChange={(e) => onGridChange(entryIdx, e)}
              placeholder="순서"
            />
            <ImageManager
              imageUrl={entry.imageUrl}
              handleImageSelect={(imageUrl) =>
                onGridImageUrlChange(entryIdx, imageUrl)
              }
            />
            <div className="flex gap-2">
              <SearchArchitectPanel
                architects={architects}
                onArchitectIdChange={(architectIds) =>
                  onGridArchitectIdChange(entryIdx, architectIds)
                }
              />
              <Input
                name="ranking"
                className="w-12"
                type="number"
                onChange={(e) => onGridChange(entryIdx, e)}
                placeholder="순위"
                tabIndex={2}
                defaultValue={0}
              />
            </div>
            <Input
              name="title"
              onChange={(e) => onGridChange(entryIdx, e)}
              placeholder="작품명"
            />
            <Input
              name="description"
              onChange={(e) => onGridChange(entryIdx, e)}
              placeholder="추가 설명"
            />
            <Input
              name="youtubeUrl"
              onChange={(e) => onGridChange(entryIdx, e)}
              placeholder="유튜브 링크"
              disabled={Boolean(params)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
