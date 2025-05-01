import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'
import { cn, renamePngToWebp } from '@repo/utils'

import { Button, Input } from '@/components/atoms'

import { useImageManager } from './ImageManager.hooks'

type Props = {
  imageUrl: string
  handleImageSelect: (value: string | null) => void
}

export default function ImageManager({ imageUrl, handleImageSelect }: Props) {
  const { onImageClick, onFileDrop, onFileChange } =
    useImageManager(handleImageSelect)
  const [inputId] = useState(uuidv4())

  return (
    <div
      className={cn(
        'w-full aspect-video border-2 rounded-lg relative flex flex-col justify-center gap-4 p-4  border-border-default',
        imageUrl && ' border-0',
      )}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onFileDrop}
    >
      <Button
        className={
          imageUrl
            ? 'absolute z-10 opacity-80 top-1 right-1 px-2.5 py-1.5 text-sm'
            : ''
        }
        onClick={onImageClick}
      >
        {imageUrl ? '이미지 변경' : '이미지 선택'}
      </Button>
      {imageUrl ? (
        <Image
          src={renamePngToWebp(imageUrl)}
          alt="작품 이미지"
          fill
          className="rounded-md"
        />
      ) : (
        <div className="w-full">
          <label
            suppressHydrationWarning={true}
            htmlFor={inputId}
            className="text-center block border-border-default hover:bg-fill-subtle bg-fill-default rounded-md px-4 py-2 border-2 hover:cursor-pointer"
          >
            파일 업로드
          </label>
          <Input
            hidden
            suppressHydrationWarning={true}
            id={inputId}
            type="file"
            className="cursor-pointer w-full rounded-md"
            onChange={onFileChange}
          />
        </div>
      )}
    </div>
  )
}
