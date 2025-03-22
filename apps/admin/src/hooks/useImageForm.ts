import { fetchS3Images, uploadImages } from '@/lib/actions/aws'
import { AWS_BASE_URL } from '@/lib/aws'
import { useModalStore } from '@/store/modalStore'
import { renamePngToWebp } from '@/utils/image'

export const useImageForm = (
  handleImageSelect: (imageUrl: string | null) => void,
) => {
  const { toggleModal, setImageUrls, setHandleImageSelect } = useModalStore()

  const onImageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toggleModal()
    setHandleImageSelect((imageUrl: string | null) =>
      handleImageSelect(imageUrl),
    )
  }

  const onFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    handleFileUpload(e.target.files[0])
  }

  const handleFileUpload = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    // 파일 업로드
    const imageUrl = await uploadImages(formData, 'test', 1).then(
      renamePngToWebp,
    )
    const webpUrl = renamePngToWebp(imageUrl)
    handleImageSelect(webpUrl)

    // 파일 업로드 후, 해당 객체 이미지들 url 형태로 받아오기
    const images = await fetchS3Images('test', 1)
    setImageUrls(
      images.Contents?.filter(
        (content) => content.Key?.split('.').at(-1) === 'png',
      )?.map((content) => AWS_BASE_URL + content.Key) as string[],
    )
  }

  return { onImageClick, onFileDrop, onFileChange }
}
