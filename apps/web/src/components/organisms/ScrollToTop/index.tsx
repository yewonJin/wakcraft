'use client'

import { ArrowUpToLine } from 'lucide-react'

export default function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`bg-fill-default hover:bg-fill-subtle fixed right-8 bottom-8 z-20 hidden rounded-full p-3 text-white shadow-lg transition-opacity hover:cursor-pointer md:block`}
    >
      <ArrowUpToLine width={24} height={24} />
    </button>
  )
}
