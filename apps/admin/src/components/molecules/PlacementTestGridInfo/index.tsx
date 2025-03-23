import { useParams } from 'next/navigation'
import Image from 'next/image'

import Input from '@/components/atoms/Input'
import SelectBox from '@/components/atoms/SelectBox'
import ImagePickerModal from '../ImagePickerModal'

import { type GridInfo } from '@/types/content'
import { useModalStore } from '@/store/modalStore'
import { renamePngToWebp } from '@/utils/image'
import { TIER } from '@/services/tier'

type Props = {
  entries: GridInfo[]
  onGridChange: (
    index: number,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void
}

export default function PlacementTestGridInfo({
  entries,
  onGridChange,
}: Props) {
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
            <div className="relative w-full aspect-video">
              <Image
                src={renamePngToWebp(entry.imageUrl)}
                alt="작품 이미지"
                fill
                className="rounded-md"
              />
            </div>
            <div className="flex gap-2">
              <Input
                onChange={() => {}}
                name="architectId"
                value={entry.architectId}
                disabled
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
            <SelectBox
              name="title"
              options={TIER}
              className={entry.title !== null ? 'bg-fill-subtler' : ''}
              handleSelectChange={(e) => onGridChange(entryIdx, e)}
            />
            <Input
              name="description"
              onChange={(e) => onGridChange(entryIdx, e)}
              placeholder="추가 정보"
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
