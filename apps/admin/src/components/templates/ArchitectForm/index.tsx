'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@repo/utils'

import { Button, Input } from '@/components/atoms'
import { SearchArchitectPanel } from '@/components/molecules'

import { addArchitect } from '@/lib/actions/architect'
import { ArchitectIdInfo } from '@/store/architectStore'

type Props = {
  architects: ArchitectIdInfo[]
}

export default function ArchitectForm({ architects }: Props) {
  const [input, setInput] = useState('')

  const handleArchitect = (value: string[]) => {
    setInput(value[0])
  }

  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      <h1 className="text-2xl font-semibold mb-8">건축가 수정</h1>
      <div className="mb-8 w-80 flex gap-4">
        <SearchArchitectPanel
          architects={architects}
          onArchitectIdChange={handleArchitect}
        />
        <Link
          href={`/admin/architect/${input}`}
          className={cn(
            'min-w-max bg-fill-default px-4 py-2 rounded-md border-2 border-border-default hover:bg-fill-subtle',
            input === '' && 'cursor-not-allowed',
          )}
        >
          이동
        </Link>
      </div>
      <h1 className="text-2xl font-semibold mb-8">건축가 추가</h1>
      <form action={addArchitect} className="flex flex-col gap-6 w-80">
        <div className="flex flex-col gap-2">
          <label className="text-lg">마크 아이디</label>
          <Input name="minecraftId" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">왁물원 아이디</label>
          <Input name="wakzooId" />
        </div>
        <Button>추가</Button>
      </form>
    </div>
  )
}
