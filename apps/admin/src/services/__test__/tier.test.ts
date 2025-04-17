import { sortImagesByTierName } from '../tier'

describe('sortImagesByTierName 함수', () => {
  it('눕 > 프로 > 해커 순으로 정렬', () => {
    const unsorted = [
      'https://wakcraft.s3.ap-northeast-2.amazonaws.com/noobprohacker/59/Wendigo-noob.png',
      'https://wakcraft.s3.ap-northeast-2.amazonaws.com/noobprohacker/59/Wendigo-pro.png',
      'https://wakcraft.s3.ap-northeast-2.amazonaws.com/noobprohacker/59/Wendigo-hacker.png',
    ]

    const expected = [
      'https://wakcraft.s3.ap-northeast-2.amazonaws.com/noobprohacker/59/Wendigo-noob.png',
      'https://wakcraft.s3.ap-northeast-2.amazonaws.com/noobprohacker/59/Wendigo-pro.png',
      'https://wakcraft.s3.ap-northeast-2.amazonaws.com/noobprohacker/59/Wendigo-hacker.png',
    ]

    const sorted = [...unsorted].sort(sortImagesByTierName)

    expect(sorted).toEqual(expected)
  })

  it('눕 > 계륵 > 프로 > 국밥 > 해커 순으로 정렬', () => {
    const unsorted = [
      'https://wakcraft.s3.ap-northeast-2.amazonaws.com/event_noobprohacker/12/Hamburger-gyeruik.png',
      'https://wakcraft.s3.ap-northeast-2.amazonaws.com/event_noobprohacker/12/Hamburger-noob.png',
      'https://wakcraft.s3.ap-northeast-2.amazonaws.com/event_noobprohacker/12/Hamburger-gukbap.png',
      'https://wakcraft.s3.ap-northeast-2.amazonaws.com/event_noobprohacker/12/Hamburger-pro.png',
      'https://wakcraft.s3.ap-northeast-2.amazonaws.com/event_noobprohacker/12/Hamburger-hacker.png',
    ]

    const expected = [
      'https://wakcraft.s3.ap-northeast-2.amazonaws.com/event_noobprohacker/12/Hamburger-noob.png',
      'https://wakcraft.s3.ap-northeast-2.amazonaws.com/event_noobprohacker/12/Hamburger-gyeruik.png',
      'https://wakcraft.s3.ap-northeast-2.amazonaws.com/event_noobprohacker/12/Hamburger-pro.png',
      'https://wakcraft.s3.ap-northeast-2.amazonaws.com/event_noobprohacker/12/Hamburger-gukbap.png',
      'https://wakcraft.s3.ap-northeast-2.amazonaws.com/event_noobprohacker/12/Hamburger-hacker.png',
    ]

    const sorted = [...unsorted].sort(sortImagesByTierName)

    expect(sorted).toEqual(expected)
  })
})
