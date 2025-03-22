export const renamePngToWebp = (imageUrl: string) => {
  const splitName = imageUrl.split('.')

  return `${splitName.slice(0, splitName.length - 1).join('.')}.webp`
}

export const renamePngTo1080Webp = (imageUrl: string) => {
  const splitName = imageUrl.split('.')

  return `${splitName.slice(0, splitName.length - 1).join('.')}.1080p.webp`
}
