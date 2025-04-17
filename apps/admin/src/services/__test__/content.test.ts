import { ArchitectIdInfo } from '@/store/architectStore'
import {
  convertGridContentArchitectId,
  convertLineContentArchitectId,
} from '../content'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('convertLineContentArchitectId 함수', () => {
  const architects: ArchitectIdInfo[] = [
    { _id: 'a1', minecraftId: 'architect1', wakzooId: '건축가1' },
    { _id: 'a2', minecraftId: 'architect2', wakzooId: '건축가2' },
    { _id: 'a3', minecraftId: 'architect3', wakzooId: '건축가3' },
  ]

  const payload = {
    workInfo: [
      {
        entries: [
          { architectId: ['architect1'] },
          { architectId: ['건축가3', 'architect2'] },
        ],
      },
    ],
  }

  it('마인크래프트 아이디와 왁물원 아이디를 _id로 변환한다.', () => {
    const result = convertLineContentArchitectId(architects, payload as any)

    expect(result.workInfo[0].entries[0].architectId).toEqual(['a1'])
    expect(result.workInfo[0].entries[1].architectId).toEqual(['a3', 'a2'])
  })

  it('없는 마인크래프트 아이디가 존재하면, 빈 문자열을 추가한다.', () => {
    const payloadWithUnknown = {
      workInfo: [
        {
          entries: [
            { architectId: ['architect1', 'unknownGuy'], otherData: 'test1' },
          ],
        },
      ],
    }

    const result = convertLineContentArchitectId(
      architects,
      payloadWithUnknown as any,
    )
    expect(result.workInfo[0].entries[0].architectId).toEqual(['a1', ''])
  })
})

describe('convertGridContentArchitectId 함수', () => {
  const architects: ArchitectIdInfo[] = [
    { _id: 'a1', minecraftId: 'architect1', wakzooId: '건축가1' },
    { _id: 'a2', minecraftId: 'architect2', wakzooId: '건축가2' },
    { _id: 'a3', minecraftId: 'architect3', wakzooId: '건축가3' },
  ]

  const payload = {
    workInfo: [
      { architectId: ['architect1'] },
      { architectId: ['건축가3', 'architect2'] },
    ],
  }

  it('마인크래프트 아이디와 왁물원 아이디를 _id로 변환한다.', () => {
    const result = convertGridContentArchitectId(architects, payload as any)

    expect(result.workInfo[0].architectId).toEqual(['a1'])
    expect(result.workInfo[1].architectId).toEqual(['a3', 'a2'])
  })

  it('없는 마인크래프트 아이디가 존재하면, 빈 문자열을 추가한다.', () => {
    const payloadWithUnknown = {
      workInfo: [{ architectId: ['architect1', 'unknownGuy'] }],
    }

    const result = convertGridContentArchitectId(
      architects,
      payloadWithUnknown as any,
    )
    expect(result.workInfo[0].architectId).toEqual(['a1', ''])
  })
})
