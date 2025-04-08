// 한글의 유니코드는 "가"~"힣"까지 할당되어있다.
// 한글의 시작 유니코드인 "가"의 유니코드는 44032이다.
// 각 초성에 대한 유니코드는 중성의 길이(21) * 종성의 길이(28)인 588개가 있다.
// ex) "ㄱ"에 대한 유니코드는 "가"~"기", "각"~"긱", ..., "긱"~"깋"이다.

const CHOSEONG = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
]
const START_HANGUL_UNICODE = 44032 // "가".charCodeAt(0);
const JUNGSEONG_LENGTH = 21 // 중성(ㅏ, ㅐ, ..., ㅣ)의 길이
const JONGSEONG_LENGTH = 28 // 종성(ㄱ, ㄲ, ㄴ, ..., ㅎ)의 길이

export const fuzzyMatcher = (input: string) => {
  const pattern = input.split('').map(createFuzzyPattern).join('.*?')
  return new RegExp(pattern)
}

const createFuzzyPattern = (char: string) => {
  // 초성만 입력 받았을 때
  // ex) ㄱ를 입력 받으면, 가~깋 모두 허용
  if (/[ㄱ-ㅎ]/.test(char)) {
    const beginCode =
      START_HANGUL_UNICODE +
      CHOSEONG.indexOf(char) * JUNGSEONG_LENGTH * JONGSEONG_LENGTH
    const endCode = beginCode + JUNGSEONG_LENGTH * JONGSEONG_LENGTH - 1

    return `[${char}\\u${beginCode.toString(16)}-\\u${endCode.toString(16)}]`
  }

  // 중성 or 중성 + 종성을 입력 받았을 때
  if (/[가-힣]/.test(char)) {
    const hangulIndex = char.charCodeAt(0) - START_HANGUL_UNICODE
    // 종성이 있으면 문자 그대로를 찾는다.
    if (hangulIndex % JONGSEONG_LENGTH > 0) {
      return char
    }

    // 종성이 없으면 종성이 없는 경우와 종성이 ㄱ ~ ㅎ인 범위를 허용한다.
    const beginCode =
      Math.floor(hangulIndex / JONGSEONG_LENGTH) * JONGSEONG_LENGTH +
      START_HANGUL_UNICODE // 종성이 없는 코드
    const endCode = beginCode + JONGSEONG_LENGTH - 1 // 종성이 ㅎ인 코드 번호

    // 코드를 16진법으로 변환하여 유니코드로 정규표현식 패턴 반환
    return `[\\u${beginCode.toString(16)}-\\u${endCode.toString(16)}]`
  }

  // 그 외엔 그대로 내보냄
  return escapeRegExp(char)
}

const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const generateMatchingIndex = (id: string, input: string) => {
  const inputCharArr = input.toLowerCase().split('')
  const matchingIndexes: number[] = []

  let lastIndex = 0

  inputCharArr.forEach((char) => {
    if (char.match(/[ㄱ-힣]/g)) {
      const match = id.slice(lastIndex).match(fuzzyMatcher(char))
      if (!match) return

      const matchIndex = id.indexOf(match[0], lastIndex)
      matchingIndexes.push(matchIndex)
      lastIndex = matchIndex + 1
    } else {
      lastIndex = id.toLowerCase().indexOf(char, lastIndex)
      if (lastIndex !== -1) {
        matchingIndexes.push(lastIndex)
        lastIndex++
      }
    }
  })

  return matchingIndexes
}
