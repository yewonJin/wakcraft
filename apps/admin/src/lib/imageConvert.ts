import sharp from 'sharp'

export const convertImageToWebp = async (
  fileBuffer: Buffer,
  height: number,
) => {
  return await sharp(fileBuffer)
    .resize(height)
    .toFormat('webp')
    .webp({ quality: 90 })
    .toBuffer()
}
