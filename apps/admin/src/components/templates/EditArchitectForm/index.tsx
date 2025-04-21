'use client'

import { useState } from 'react'
import Image from 'next/image'
import { TIER } from '@repo/constants'
import { Tier, type Architect } from '@repo/types'
import { renamePngToWebp } from '@repo/utils'

import { Button, Input, SelectBox } from '@/components/atoms'

type Props = {
  action: (payload: Architect & { _id: string }) => Promise<void>
  architect: Architect & { _id: string }
}

export default function EditArchitectForm({ action, architect }: Props) {
  const [content, setContent] = useState(architect)

  const handleCurTierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setContent((prev) => ({ ...prev, curTier: e.target.value as Tier }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = e.target

    setContent((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }))
  }

  const handleDescriptionChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setContent((prev) => ({
      ...prev,
      portfolio: prev.portfolio.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            description: e.target.value,
          }
        }
        return item
      }),
    }))
  }

  return (
    <form action={() => action(content)} className="p-8 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <label>마크 ID</label>
            <Input
              name="minecraftId"
              value={content.minecraftId}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>왁물원 or 한글ID</label>
            <Input
              name="wakzooId"
              value={content.wakzooId}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <Button className="py-2.5 px-4.5">수정</Button>
      </div>
      <div className="flex flex-col gap-2 mb-6">
        <p className="">현재 티어: </p>
        <SelectBox
          className="w-34"
          options={TIER}
          value={content.curTier}
          name="curTier"
          handleSelectChange={handleCurTierChange}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {content.portfolio
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .map((item, index) => (
            <div key={item.imageUrl} className="flex flex-col gap-2 relative">
              <div className="z-20 absolute top-0 left-0 text-sm px-2 py-1 bg-[rgba(0,0,0,0.6)] flex flex-col gap-2">
                <p>{` ${item.category} - ${item.episode}회`}</p>
                <p>{`${item.title}`}</p>
                {item.ranking && <p>{`순위 : ${item.ranking}위`}</p>}
                {item.type && <p>{`라인 : ${item.type}`}</p>}
              </div>
              <div className="relative aspect-video">
                <Image
                  fill
                  src={renamePngToWebp(item.imageUrl)}
                  alt="작품 이미지"
                />
              </div>
              <Input
                name="description"
                value={item.description || ''}
                onChange={(e) => handleDescriptionChange(index, e)}
                placeholder="추가 설명"
              />
            </div>
          ))}
      </div>
    </form>
  )
}
