import { useState } from 'react'
import { EventNoobProHacker, NoobProHacker, PlacementTest } from '@repo/types'

export const useContentForm = <
  T extends NoobProHacker | EventNoobProHacker | PlacementTest,
>(
  initialContent: T,
) => {
  const [content, setContent] = useState<T>(initialContent)

  const onContentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target

    setContent((prev) => ({
      ...prev,
      contentInfo: {
        ...prev.contentInfo,
        [name]:
          type === 'number'
            ? Number(value)
            : type === 'checkbox'
              ? checked
              : value,
      },
    }))
  }

  const onLineInfoChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value, type } = e.target

    setContent((prev) => ({
      ...prev,
      workInfo: prev.workInfo.map((item, i) =>
        i === index && 'entries' in item
          ? { ...item, [name]: type === 'number' ? Number(value) : value }
          : item,
      ),
    }))
  }

  const onEntryChange = (
    lineIdx: number,
    entryIdx: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value, type } = e.target

    setContent((prev) => ({
      ...prev,
      workInfo: prev.workInfo.map((line, i) => {
        if (i === lineIdx && 'entries' in line) {
          return {
            ...line,
            entries: line.entries.map((entry, j) => {
              if (j === entryIdx) {
                if (name === 'minecraftId') {
                  return {
                    ...entry,
                    [name]: [value],
                  }
                }

                return {
                  ...entry,
                  [name]: type === 'number' ? Number(value) : value,
                }
              }
              return entry
            }),
          }
        }
        return line
      }),
    }))
  }

  const onLineArchitectIdChange = (
    lineIdx: number,
    entryIdx: number,
    architectIds: string[],
  ) => {
    setContent((prev) => ({
      ...prev,
      workInfo: prev.workInfo.map((line, i) => {
        if (i === lineIdx && 'entries' in line) {
          return {
            ...line,
            entries: line.entries.map((entry, j) => {
              if (j === entryIdx) {
                return {
                  ...entry,
                  ['architectId']: architectIds,
                }
              }
              return entry
            }),
          }
        }
        return line
      }),
    }))
  }

  const onLineImageUrlChange = (
    lineIdx: number,
    entryIdx: number,
    imageUrl: string | null,
  ) => {
    setContent((prev) => ({
      ...prev,
      workInfo: prev.workInfo.map((line, i) => {
        if (i === lineIdx && 'entries' in line) {
          return {
            ...line,
            entries: line.entries.map((entry, j) => {
              if (j === entryIdx) {
                return {
                  ...entry,
                  ['imageUrl']: imageUrl,
                }
              }
              return entry
            }),
          }
        }
        return line
      }),
    }))
  }

  const onGridInfoChange = (
    index: number,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target

    setContent((prev) => ({
      ...prev,
      workInfo: prev.workInfo.map((item, i) => {
        if (i === index) {
          return { ...item, [name]: type === 'number' ? Number(value) : value }
        }
        return item
      }),
    }))
  }

  const onGridArchitectIdChange = (index: number, architectIds: string[]) => {
    setContent((prev) => ({
      ...prev,
      workInfo: prev.workInfo.map((item, i) => {
        if (i === index) {
          return { ...item, ['architectId']: architectIds }
        }
        return item
      }),
    }))
  }

  const onGridImageUrlChange = (index: number, imageUrl: string | null) => {
    setContent((prev) => ({
      ...prev,
      workInfo: prev.workInfo.map((item, i) => {
        if (i === index) {
          return { ...item, ['imageUrl']: imageUrl }
        }
        return item
      }),
    }))
  }

  return {
    content,
    onContentInfoChange,
    onLineInfoChange,
    onEntryChange,
    onLineArchitectIdChange,
    onLineImageUrlChange,
    onGridInfoChange,
    onGridImageUrlChange,
    onGridArchitectIdChange,
  }
}
