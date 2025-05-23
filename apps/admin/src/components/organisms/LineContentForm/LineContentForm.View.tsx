import { Divider, Input } from '@/components/atoms'
import {
  ContentInfo,
  ImagePickerModal,
  ImageManager,
  SearchArchitectPanel,
} from '@/components/molecules'

import { useLineContentFormContext } from '@/hooks/useContentFormContext'
import { convertLineContentArchitectId } from '@/services/content'
import { useArchitectsStore } from '@/store/architectStore'
import { useModalStore } from '@/store/modalStore'

export function LineContentFormView() {
  return (
    <LineContentFormView.FormWrapper>
      <LineContentFormView.Title />
      <ContentInfo />
      <Divider />
      <LineContentFormView.LineInfo />
    </LineContentFormView.FormWrapper>
  )
}

LineContentFormView.FormWrapper = function FormWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { action, content, isEditMode } = useLineContentFormContext()
  const { architects } = useArchitectsStore()

  return (
    <form
      action={() =>
        action(
          !isEditMode
            ? convertLineContentArchitectId(architects, content)
            : content,
        )
      }
      className="flex flex-col gap-8 p-8 max-w-[1920px] mx-auto"
    >
      {children}
    </form>
  )
}

LineContentFormView.Title = function Title() {
  const { content } = useLineContentFormContext()

  return (
    <h1 className="text-2xl font-bold">
      {'type' in content ? '라인 이벤트 눕프핵' : '눕프로해커'}
    </h1>
  )
}

LineContentFormView.LineInfo = function LineInfo() {
  const {
    content,
    onLineInfoChange,
    onEntryChange,
    onLineArchitectIdChange,
    onLineImageUrlChange,
    isEditMode,
  } = useLineContentFormContext()
  const { architects } = useArchitectsStore()
  const { show } = useModalStore()

  return (
    <div className="gap-12 w-full grid 2xl:grid-cols-6 xl:grid-cols-4 md:grid-cols-3 gap-y-32">
      {show && <ImagePickerModal />}
      {content.workInfo.map((line, lineIdx) => (
        <div key={lineIdx} className="">
          <div className="flex flex-col mb-6 gap-2">
            <div className="flex justify-between items-center">
              <h2 className="text-xl">{lineIdx + 1 + '라인'}</h2>
              <div className="flex items-center gap-1">
                <label>라인 랭킹</label>
                <Input
                  className="w-12"
                  name="ranking"
                  value={line.ranking || 0}
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
                  {!isEditMode ? (
                    <SearchArchitectPanel
                      disabled={isEditMode}
                      architects={architects}
                      onArchitectIdChange={(value: string[]) =>
                        onLineArchitectIdChange(lineIdx, entryIdx, value)
                      }
                    />
                  ) : (
                    <Input value={entry.architectId[0]} disabled={isEditMode} />
                  )}
                  <Input
                    type="number"
                    name="ranking"
                    className="w-12"
                    onChange={(e) => onEntryChange(lineIdx, entryIdx, e)}
                    placeholder="순위"
                    value={entry.ranking}
                    disabled={isEditMode}
                  />
                </div>
                <Input
                  name="title"
                  onChange={(e) => onEntryChange(lineIdx, entryIdx, e)}
                  placeholder="세부 작품명"
                  value={entry.title || ''}
                />
                <Input
                  name="description"
                  onChange={(e) => onEntryChange(lineIdx, entryIdx, e)}
                  placeholder="추가 설명"
                  value={entry.description || ''}
                />
                <Input
                  name="youtubeUrl"
                  onChange={(e) => onEntryChange(lineIdx, entryIdx, e)}
                  placeholder="유튜브 링크"
                  value={entry.youtubeUrl || ''}
                  disabled={!isEditMode}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
