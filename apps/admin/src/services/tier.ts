export const sortImagesByTierName = (a: string, b: string) => {
  const ORDER = ['noob', 'gyeruik', 'pro', 'gukbap', 'hacker']

  const aImageName = a.split('/')[5].split('.')[0]
  const bImageName = b.split('/')[5].split('.')[0]
  const [aEntryName, aTierName] = aImageName.split('-')
  const [bEntryName, bTierName] = bImageName.split('-')

  if (aEntryName === bEntryName) {
    return ORDER.indexOf(aTierName) - ORDER.indexOf(bTierName)
  }

  return 1
}
