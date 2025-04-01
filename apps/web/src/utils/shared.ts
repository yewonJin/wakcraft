export const isMobile = (str: string) => {
  const mobileRegex = [
    /Android/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ]

  return mobileRegex.some((regex) => str.match(regex))
}
