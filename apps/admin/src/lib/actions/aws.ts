'use server'

import {
  AWS_BASE_URL,
  AWSDirectory,
  listS3Objects,
  uploadS3Image,
} from '../aws'
import { convertImageToWebp } from '../image'

// TODO: 에러처리
/** PNG 파일 -> 400p WEBP, 1080p WEBP, PNG 변환 후 3개 이미지 업로드 */
export const uploadImages = async (
  formData: FormData,
  content: AWSDirectory,
  episode: number,
) => {
  const files = formData.getAll('file') as File[]
  const file = files[0]

  const fileName = file.name.split('.')[0]

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const webpBuffer = await convertImageToWebp(buffer, 1066)
  const webp1080Buffer = await convertImageToWebp(buffer, 1920)

  await uploadS3Image(buffer, fileName + '.png', 'image/png', content, episode)
  await uploadS3Image(
    webpBuffer,
    fileName + '.webp',
    'image/webp',
    content,
    episode,
  )
  await uploadS3Image(
    webp1080Buffer,
    fileName + '.1080p.webp',
    'image/webp',
    content,
    episode,
  )

  return AWS_BASE_URL + `${content}/${episode}/${file.name}`
}

export const fetchS3Images = async (content: AWSDirectory, episode: number) => {
  const images = await listS3Objects(content, episode)
  return images
}
