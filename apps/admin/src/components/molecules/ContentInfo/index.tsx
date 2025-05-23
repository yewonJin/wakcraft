import { type ContentInfo } from '@repo/types'

import { Button, Input } from '@/components/atoms'

import { useContentFormContext } from '@/hooks/useContentFormContext'

export default function ContentInfo() {
  const { content, onContentInfoChange, isEditMode } = useContentFormContext()
  const { contentInfo } = content

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-8">
        <div className="w-24 flex flex-col gap-2">
          <label className="text-xl font-medium">회차</label>
          <Input
            name="episode"
            type="number"
            onChange={onContentInfoChange}
            placeholder="회차"
            tabIndex={1}
            defaultValue={contentInfo.episode}
          />
        </div>
        <div className="w-48 flex flex-col gap-2">
          <label className="text-xl font-medium">주제</label>
          <Input
            name="title"
            onChange={onContentInfoChange}
            placeholder="자유"
            tabIndex={1}
            defaultValue={contentInfo.title || ''}
          />
        </div>
        <div className="w-36 flex flex-col gap-2">
          <label className="text-xl font-medium">날짜</label>
          <Input
            name="date"
            onChange={onContentInfoChange}
            type="date"
            value={
              contentInfo.date.split('T')[0] ||
              new Date().toISOString().split('T')[0]
            }
            tabIndex={1}
          />
        </div>
        <div className="w-36 flex flex-col gap-2 ">
          <label className="text-xl font-medium">조공 컨텐츠?</label>
          <Input
            className="w-[40px]"
            name="isTribute"
            onChange={onContentInfoChange}
            type="checkbox"
            checked={contentInfo.isTribute}
            tabIndex={1}
          />
        </div>
        <div className="w-84 flex flex-col gap-2">
          <label className="text-xl font-medium">유튜브 링크</label>
          <Input
            name="youtubeUrl"
            onChange={onContentInfoChange}
            tabIndex={1}
            value={contentInfo.youtubeUrl || ''}
            disabled={!isEditMode}
          />
        </div>
      </div>
      <Button className="py-3 px-5" type="submit" tabIndex={3}>
        추가
      </Button>
    </div>
  )
}
