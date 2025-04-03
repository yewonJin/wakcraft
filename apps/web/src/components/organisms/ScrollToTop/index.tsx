'use client'

import { ArrowUpToLine } from 'lucide-react'

import Button from '@/components/atoms/Button'

export default function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Button
      onClick={scrollToTop}
      className={`hover:bg-fill-subtle fixed right-8 bottom-8 z-20 hidden rounded-full p-3 text-white shadow-lg transition-opacity hover:cursor-pointer md:block`}
    >
      <ArrowUpToLine width={24} height={24} />
    </Button>
  )
}
