import { useModalStore } from '@/store/modalStore'
import { useContentStore } from '@/store/contentStore'

export const useImagePickerModal = () => {
  const { toggleModal, handleImageSelect } = useModalStore()
  const { imageUrls } = useContentStore()

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

  return {
    imageUrls,
    toggleModal,
    handleImageDelete,
    onCloseClick,
  }
}
