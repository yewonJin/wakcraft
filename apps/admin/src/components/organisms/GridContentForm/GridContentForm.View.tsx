import Image from 'next/image'
import { useParams } from 'next/navigation'

import { Divider, Input, SelectBox } from '@/components/atoms'
import {
  ContentInfo,
  ImagePickerModal,
  ImageManager,
  SearchArchitectPanel,
} from '@/components/molecules'

import { useGridContentFormContext } from '@/hooks/useContentFormContext'
import { convertGridContentArchitectId } from '@/services/content'
import { useArchitectsStore } from '@/store/architectStore'
import { useModalStore } from '@/store/modalStore'
import { TIER } from '@repo/constants'
import { renamePngToWebp } from '@repo/utils'

export function GridContentFormView() {
  const { content } = useGridContentFormContext()

  return (
    <GridContentFormView.FormWrapper>
      <GridContentFormView.Title />
      <ContentInfo />
      <Divider />
      {'type' in content ? (
        <GridContentFormView.GridInfo />
      ) : (
        <GridContentFormView.PlacementTestInfo />
      )}
    </GridContentFormView.FormWrapper>
  )
}

GridContentFormView.FormWrapper = function FormWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { action, content, isEditMode } = useGridContentFormContext()
  const { architects } = useArchitectsStore()

  return (
    <form
      action={() =>
        action(
          !isEditMode
            ? convertGridContentArchitectId(architects, content)
            : content,
        )
      }
      className="flex flex-col gap-8 p-8 max-w-[1920px] mx-auto"
    >
      {children}
    </form>
  )
}

GridContentFormView.Title = function Title() {
  const { content } = useGridContentFormContext()

  return (
    <h1 className="text-2xl font-bold">
      {'type' in content ? '그리드 이벤트 눕프핵' : '배치고사'}
    </h1>
  )
}

GridContentFormView.GridInfo = function GridInfo() {
  const {
    content,
    isEditMode,
    onGridInfoChange,
    onGridImageUrlChange,
    onGridArchitectIdChange,
  } = useGridContentFormContext()
  const { architects } = useArchitectsStore()
  const { show } = useModalStore()

  return (
    <div className="gap-12 w-full grid 2xl:grid-cols-6 xl:grid-cols-4 md:grid-cols-3 gap-y-32">
      {show && <ImagePickerModal />}
      {content.workInfo.map((entry, entryIdx) => (
        <div key={entryIdx} className="">
          <div key={entryIdx} className="flex flex-col gap-4">
            <Input
              name="order"
              type="number"
              className="w-20"
              value={entry.order}
              onChange={(e) => onGridInfoChange(entryIdx, e)}
              placeholder="순서"
            />
            <ImageManager
              imageUrl={entry.imageUrl}
              handleImageSelect={(imageUrl) =>
                onGridImageUrlChange(entryIdx, imageUrl)
              }
            />
            <div className="flex gap-2">
              {!isEditMode ? (
                <SearchArchitectPanel
                  disabled={isEditMode}
                  architects={architects}
                  onArchitectIdChange={(architectIds) =>
                    onGridArchitectIdChange(entryIdx, architectIds)
                  }
                />
              ) : (
                <Input value={entry.architectId[0]} disabled={isEditMode} />
              )}

              <Input
                name="ranking"
                className="w-12"
                type="number"
                value={entry.ranking}
                onChange={(e) => onGridInfoChange(entryIdx, e)}
                placeholder="순위"
                disabled={!isEditMode}
                tabIndex={2}
              />
            </div>
            <Input
              name="title"
              value={entry.title || ''}
              onChange={(e) => onGridInfoChange(entryIdx, e)}
              placeholder="작품명"
            />
            <Input
              name="description"
              value={entry.description || ''}
              onChange={(e) => onGridInfoChange(entryIdx, e)}
              placeholder="추가 설명"
            />
            <Input
              name="youtubeUrl"
              value={entry.youtubeUrl || ''}
              onChange={(e) => onGridInfoChange(entryIdx, e)}
              placeholder="유튜브 링크"
              disabled={!isEditMode}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

GridContentFormView.PlacementTestInfo = function PlacementTestGridInfo() {
  const { content, onGridInfoChange } = useGridContentFormContext()
  const { show } = useModalStore()
  const params = useParams()

  return (
    <div className="gap-12 w-full grid 2xl:grid-cols-6 xl:grid-cols-4 md:grid-cols-3 gap-y-32">
      {show && <ImagePickerModal />}

      {content.workInfo.map((entry, entryIdx) => (
        <div key={entryIdx} className="">
          <div key={entryIdx} className="flex flex-col gap-4">
            <Input
              name="order"
              type="number"
              className="w-20"
              onChange={(e) => onGridInfoChange(entryIdx, e)}
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
                onChange={(e) => onGridInfoChange(entryIdx, e)}
                placeholder="순위"
                tabIndex={2}
                defaultValue={0}
              />
            </div>
            <SelectBox
              name="title"
              options={TIER}
              className={entry.title !== null ? 'bg-fill-subtler' : ''}
              handleSelectChange={(e) => onGridInfoChange(entryIdx, e)}
            />
            <Input
              name="description"
              onChange={(e) => onGridInfoChange(entryIdx, e)}
              placeholder="추가 정보"
            />
            <Input
              name="youtubeUrl"
              onChange={(e) => onGridInfoChange(entryIdx, e)}
              placeholder="유튜브 링크"
              disabled={Boolean(params)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
