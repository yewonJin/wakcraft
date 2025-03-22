'use client'

import Image from 'next/image'
import { createPortal } from 'react-dom'

import Button from '@/components/atoms/Button'

import { sortImagesByTierName } from '@/services/tier'
import { useModalStore } from '@/store/modalStore'
import { renamePngToWebp } from '@/utils/image'

export default function ImagePickerModal() {
  const { imageUrls, toggleModal, handleImageSelect } = useModalStore()

  const handleImageDelete = () => {
    if (handleImageSelect !== null) {
      handleImageSelect(null)
    }
    toggleModal()
  }

  const onCloseClick = (imageUrl: string) => {
    if (handleImageSelect !== null) {
      handleImageSelect(imageUrl)
    }
    toggleModal()
  }

  return createPortal(
    <div
      onClick={toggleModal}
      className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.8)] z-50"
    >
      <div
        className="fixed top-[10%] h-[70vh] bg-background-default p-8 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">작품 이미지 선택</h2>
          <div className="flex gap-4">
            <Button onClick={handleImageDelete}>이미지 제거</Button>
            <Button onClick={toggleModal}>닫기</Button>
          </div>
        </div>
        {imageUrls && (
          <div className="grid grid-cols-3 gap-4 overflow-y-scroll h-[calc(70vh-120px)]">
            {imageUrls.sort(sortImagesByTierName).map((imageUrl) => (
              <div
                key={imageUrl}
                className="relative w-80 aspect-video cursor-pointer"
                onClick={() => onCloseClick(imageUrl)}
              >
                <Image src={renamePngToWebp(imageUrl)} fill alt="작품 이미지" />
                <p className="z-10 absolute bg-background-default opacity-80 p-1 px-2">
                  {imageUrl.split('/').at(-1)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
