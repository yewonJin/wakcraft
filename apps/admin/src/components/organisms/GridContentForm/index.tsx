'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import { TIER } from '@repo/constants'
import { GridEventNoobProHacker, PlacementTest } from '@repo/types'
import { renamePngToWebp } from '@repo/utils'

import Divider from '@/components/atoms/Divider'
import Input from '@/components/atoms/Input'
import SelectBox from '@/components/atoms/SelectBox'
import ContentInfo from '@/components/molecules/ContentInfo'
import ImagePickerModal from '@/components/molecules/ImagePickerModal'
import ImageManager from '@/components/molecules/ImageManager'
import SearchArchitectPanel from '@/components/molecules/SearchArchitectPanel'

import { useContentForm } from '@/hooks/useContentForm'
import {
  GridContentFormContext,
  useGridContentFormContext,
} from '@/hooks/useContentFormContext'
import { convertGridContentArchitectId } from '@/services/content'
import { useArchitectsStore } from '@/store/architectStore'
import { useModalStore } from '@/store/modalStore'

type Props<T extends GridEventNoobProHacker | PlacementTest> = {
  action: (payload: T) => Promise<void>
  initialContent: T
}

function GridContentForm<T extends GridEventNoobProHacker | PlacementTest>({
  action,
  initialContent,
}: Props<T>) {
  return (
    <GridContentForm.Provider initialContent={initialContent}>
      <GridContentForm.FormWrapper action={action}>
        <GridContentForm.Title />
        <ContentInfo />
        <Divider />
        {'type' in initialContent ? (
          <GridContentForm.GridInfo />
        ) : (
          <GridContentForm.PlacementTestInfo />
        )}
      </GridContentForm.FormWrapper>
    </GridContentForm.Provider>
  )
}

GridContentForm.Provider = function Provider<
  T extends PlacementTest | GridEventNoobProHacker,
>({
  initialContent,
  children,
}: {
  initialContent: T
  children: React.ReactNode
}) {
  const params = useParams()
  const isEditMode = Boolean(params?.episode)

  return (
    <GridContentFormContext.Provider
      value={{ ...useContentForm(initialContent), isEditMode }}
    >
      {children}
    </GridContentFormContext.Provider>
  )
}

GridContentForm.FormWrapper = function FormWrapper<
  T extends PlacementTest | GridEventNoobProHacker,
>({
  action,
  children,
}: {
  action: (payload: T) => Promise<void>
  children: React.ReactNode
}) {
  const { content, isEditMode } = useGridContentFormContext()
  const { architects } = useArchitectsStore()

  return (
    <form
      action={() =>
        action(
          !isEditMode
            ? convertGridContentArchitectId(architects, content as T)
            : (content as T),
        )
      }
      className="flex flex-col gap-8 p-8 max-w-[1920px] mx-auto"
    >
      {children}
    </form>
  )
}

GridContentForm.Title = function Title() {
  const { content } = useGridContentFormContext()

  return (
    <h1 className="text-2xl font-bold">
      {'type' in content ? '그리드 이벤트 눕프핵' : '배치고사'}
    </h1>
  )
}

GridContentForm.GridInfo = function GridInfo() {
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

GridContentForm.PlacementTestInfo = function PlacementTestGridInfo() {
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

export default GridContentForm
