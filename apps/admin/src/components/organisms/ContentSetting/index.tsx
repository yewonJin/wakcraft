import { Button, Input, SelectBox } from '@/components/atoms'

import { InitialState } from '@/hooks/useEventNoobProHacker'

type Props = {
  state: InitialState
  onStateChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onButtonClick: () => void
}

export default function ContentSetting({
  state,
  onStateChange,
  onSelectChange,
  onButtonClick,
}: Props) {
  return (
    <div className="w-84 flex flex-col gap-4 p-8 py-16 mx-auto">
      <h1 className="text-2xl font-bold">이벤트 눕프핵 설정</h1>
      <div className="flex flex-col gap-2">
        <h2>이벤트 눕프핵 타입</h2>
        <SelectBox
          options={['line', 'grid']}
          name="type"
          handleSelectChange={onSelectChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2>{state.type === 'line' ? '라인 수' : '작품 수'}</h2>
        <Input
          name="workInfoLength"
          value={state.workInfoLength}
          type="number"
          onChange={onStateChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2>라인 별 작품 개수</h2>
        <Input
          disabled={state.type === 'grid'}
          name="entryLength"
          value={state.entryLength}
          type="number"
          onChange={onStateChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2>라인 티어</h2>
        <Input
          disabled={state.type === 'grid'}
          name="lineTiers"
          placeholder="눕-프로-해커 형태로 입력"
          value={state.lineTiers.join('-')}
          onChange={onStateChange}
        />
      </div>
      <Button
        disabled={state.lineTiers.length !== state.entryLength}
        onClick={onButtonClick}
      >
        다음
      </Button>
    </div>
  )
}
