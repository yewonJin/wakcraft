'use client'

import Link from 'next/link'
import { Menu, Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@repo/utils'

export default function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme')

    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', currentTheme === 'dark' ? 'light' : 'dark')
  }

  const handleMenuClick = () => {
    if (isOpen) {
      allowScroll()
    } else {
      preventScroll()
    }
    setIsOpen((prev) => !prev)
  }

  const preventScroll = () => {
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.overflowY = 'scroll'
  }

  const allowScroll = () => {
    document.body.style.position = ''
    document.body.style.width = ''
    document.body.style.top = ''
    document.body.style.overflowY = ''
  }

  return (
    <nav className="bg-fill-strong/95 fixed z-20 mx-auto h-14 w-full px-4 md:h-16 xl:px-0">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between">
        <div className="flex items-center gap-32">
          <Link className="text-xl font-semibold" href={'/'}>
            WAKCRAFT
          </Link>
          <div
            onClick={() => {
              if (window.screenX >= 768) return

              setIsOpen(false)
              allowScroll()
            }}
            className={cn(
              isOpen &&
                'fixed top-14 right-0 h-[100vh] w-full bg-[rgba(0,0,0,0.8)]',
            )}
          >
            <div
              className={cn(
                'text-text-subtle hidden flex-col text-sm md:flex md:flex-row md:gap-16',
                isOpen &&
                  'bg-background-default text-text-default absolute top-0 left-0 z-20 flex w-full gap-4 rounded-b-3xl p-8 text-lg',
              )}
            >
              <Link
                className="hover:text-text-strong w-full py-2 text-center md:w-auto md:py-0 md:text-start"
                href={'/architect'}
              >
                건축가
              </Link>
              <Link
                className="hover:text-text-strong w-full py-2 text-center md:w-auto md:py-0 md:text-start"
                href={'/noobprohacker'}
              >
                눕프로해커
              </Link>
              <Link
                className="hover:text-text-strong w-full py-2 text-center md:w-auto md:py-0 md:text-start"
                href={'/event_noobprohacker'}
              >
                예능 눕프핵
              </Link>
              <Link
                className="hover:text-text-strong w-full py-2 text-center md:w-auto md:py-0 md:text-start"
                href={'/placement_test'}
              >
                배치고사
              </Link>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={toggleTheme}
            className="hover:text-text-strong text-text-subtle cursor-pointer"
          >
            <Moon className="hidden dark:block" width={20} height={20} />
            <Sun className="block dark:hidden" width={20} height={20} />
          </button>
          <Menu className="block md:hidden" onClick={handleMenuClick} />
        </div>
      </div>
    </nav>
  )
}
