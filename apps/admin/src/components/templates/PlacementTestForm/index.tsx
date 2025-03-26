'use client'

import GridContentForm from '@/components/organisms/GridContentForm'

import { postPlacementTest } from '@/lib/actions/placementTest'
import {
  getMinecraftIdByImageUrl,
  makeInitialPlacmentTestContent,
} from '@/services/content'
import { useArchitectsStore } from '@/store/architectStore'
import { useContentStore } from '@/store/contentStore'

type Props = {
  nextEpisode: number
}

export default function PlacementTestForm({ nextEpisode }: Props) {
  const { imageUrls } = useContentStore()
  const { architects } = useArchitectsStore()

  if (!imageUrls)
    return (
      <h1 className="text-2xl text-center pt-8 font-bold">
        이미지를 업로드 해 주세요
      </h1>
    )

  const minecraftIds = imageUrls.map(getMinecraftIdByImageUrl)

  if (!minecraftIds.every((x) => typeof x === 'string')) {
    return (
      <div className="flex flex-col gap-4 pt-8">
        <h1>잘못된 사진 명이 있습니다.</h1>
      </div>
    )
  }

  if (
    !minecraftIds.every((x) =>
      architects.map((architect) => architect.minecraftId).includes(x),
    )
  ) {
    return (
      <div className="flex flex-col gap-4 pt-8">
        <h1>해당 건축가가 등록되어있지 않습니다.</h1>
        <div>
          {minecraftIds
            .filter(
              (minecraftId) =>
                !architects
                  .map((architect) => architect.minecraftId)
                  .includes(minecraftId),
            )
            .map((minecraftId) => (
              <div key={minecraftId}>{minecraftId}</div>
            ))}
        </div>
      </div>
    )
  }

  return (
    <GridContentForm
      action={postPlacementTest}
      initialContent={makeInitialPlacmentTestContent(nextEpisode, imageUrls)}
    />
  )
}
