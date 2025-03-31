'use client'

import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'

export default function GlobalNav() {
  const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme')

    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', currentTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <nav className="bg-fill-strong/95 fixed z-20 mx-auto h-16 w-full px-4 xl:px-0">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between">
        <div className="flex items-center gap-32">
          <Link className="text-xl font-semibold" href={'/'}>
            WAKCRAFT
          </Link>
          <div className="text-text-subtle flex gap-16 text-sm">
            <Link className="hover:text-text-strong" href={'/architect'}>
              건축가
            </Link>
            <Link className="hover:text-text-strong" href={'/noobprohacker'}>
              눕프로해커
            </Link>
            <Link
              className="hover:text-text-strong"
              href={'/event_noobprohacker'}
            >
              예능 눕프핵
            </Link>
            <Link className="hover:text-text-strong" href={'/placement_test'}>
              배치고사
            </Link>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className="hover:text-text-strong text-text-subtle cursor-pointer"
        >
          <Moon className="hidden dark:block" width={20} height={20} />
          <Sun className="block dark:hidden" width={20} height={20} />
        </button>
      </div>
    </nav>
  )
}
