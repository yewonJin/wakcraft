import { useParams } from 'next/navigation'
import { type LineInfo } from '@repo/types'

import Input from '@/components/atoms/Input'
import ImageManager from '../ImageManager'
import ImagePickerModal from '../ImagePickerModal'
import SearchArchitectPanel from '../SearchArchitectPanel'

import { useArchitectsStore } from '@/store/architectStore'
import { useModalStore } from '@/store/modalStore'

type Props = {
  lines: LineInfo[]
  onLineInfoChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void
  onEntryChange: (
    lineIdx: number,
    entryIdx: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void
  onLineArchitectIdChange: (
    lineIdx: number,
    entryIdx: number,
    minecraftIds: string[],
  ) => void
  onLineImageUrlChange: (
    lineIdx: number,
    entryIdx: number,
    imageUrl: string | null,
  ) => void
}

export default function LineInfo({
  lines,
  onLineInfoChange,
  onEntryChange,
  onLineArchitectIdChange,
  onLineImageUrlChange,
}: Props) {
  const { architects } = useArchitectsStore()
  const { show } = useModalStore()
  const params = useParams()

  return (
    <div className="gap-12 w-full grid 2xl:grid-cols-6 xl:grid-cols-4 md:grid-cols-3 gap-y-32">
      {show && <ImagePickerModal />}
      {lines.map((line, lineIdx) => (
        <div key={lineIdx} className="">
          <div className="flex flex-col mb-6 gap-2">
            <div className="flex justify-between items-center">
              <h2 className="text-xl">{lineIdx + 1 + '라인'}</h2>
              <div className="flex items-center gap-1">
                <label>라인 랭킹</label>
                <Input
                  className="w-12"
                  name="ranking"
                  value={line.ranking}
                  onChange={(e) => onLineInfoChange(lineIdx, e)}
                  type="number"
                />
              </div>
            </div>
            <Input
              name="title"
              onChange={(e) => onLineInfoChange(lineIdx, e)}
              tabIndex={1}
              value={line.title}
              placeholder="작품명"
            />
          </div>
          <div className="flex flex-col gap-12">
            {line.entries.map((entry, entryIdx) => (
              <div key={entryIdx} className="flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                  <h3 className="text-lg min-w-max">{entry.tier}</h3>
                </div>
                <ImageManager
                  imageUrl={entry.imageUrl}
                  handleImageSelect={(imageUrl) =>
                    onLineImageUrlChange(lineIdx, entryIdx, imageUrl)
                  }
                />
                <div className="flex gap-2">
                  {!Boolean(params.episode) ? (
                    <SearchArchitectPanel
                      disabled={Boolean(params.episode)}
                      architects={architects}
                      onArchitectIdChange={(value: string[]) =>
                        onLineArchitectIdChange(lineIdx, entryIdx, value)
                      }
                    />
                  ) : (
                    <Input
                      value={entry.architectId[0]}
                      disabled={Boolean(params.episode)}
                    />
                  )}
                  <Input
                    type="number"
                    name="ranking"
                    className="w-12"
                    onChange={(e) => onEntryChange(lineIdx, entryIdx, e)}
                    placeholder="순위"
                    value={entry.ranking}
                    disabled={entry.tier === '눕' ? true : false}
                  />
                </div>
                <Input
                  name="description"
                  onChange={(e) => onEntryChange(lineIdx, entryIdx, e)}
                  placeholder="추가 설명"
                  value={entry.description}
                />
                <Input
                  name="youtubeUrl"
                  onChange={(e) => onEntryChange(lineIdx, entryIdx, e)}
                  placeholder="유튜브 링크"
                  value={entry.youtubeUrl || ''}
                  disabled={!Boolean(params.episode)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
