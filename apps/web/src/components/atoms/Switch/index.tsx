'use client'

import { cn } from '@repo/utils'

type Props = {
  isOn: boolean
  onClick: () => void
  label: string
}

export default function Switch({ isOn, onClick, label }: Props) {
  return (
    <div className="flex items-center justify-center gap-2">
      <label className="text-base">{label}</label>
      <button
        onClick={onClick}
        className={cn(
          'group bg-fill-default relative flex h-6 w-[53px] items-center gap-2 rounded-2xl text-sm outline-none hover:cursor-pointer',
          isOn && 'bg-sky-300 dark:bg-sky-800',
        )}
      >
        <span
          className={cn(
            'bg-fill-subtle flex h-7 w-7 items-center justify-center rounded-full duration-300',
            isOn && 'translate-x-11/12 bg-sky-400 dark:bg-sky-600',
          )}
        >
          <span className="group-hover:bg-fill-default/20 absolute h-10 w-10 rounded-full"></span>
        </span>
      </button>
    </div>
  )
}
