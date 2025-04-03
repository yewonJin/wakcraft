import { LineInfo } from '@repo/types'

export function ContentLineInfo({
  line,
  lineIndex,
}: {
  line: LineInfo
  lineIndex: number
}) {
  return (
    <div className="mb-4 flex items-center gap-2 px-4 xl:px-0">
      <span className="text-text-subtle">{`${lineIndex + 1}라인`}</span>
      <h3
        className="scroll-mt-[15vh] text-lg font-medium md:text-2xl"
        id={line.title}
      >
        {line.title}
      </h3>
      {line.ranking !== null && line.ranking !== 0 && (
        <div className="bg-fill-subtle mx-2 h-6 w-[2px]"></div>
      )}
      {line.ranking !== null && line.ranking !== 0 && (
        <span className="text-lg">{`${line.ranking}위`}</span>
      )}
    </div>
  )
}
