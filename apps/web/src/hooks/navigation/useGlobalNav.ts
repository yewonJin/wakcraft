import { useState } from 'react'

export const useGlobalNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme')

    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', currentTheme === 'dark' ? 'light' : 'dark')
  }

  const handleBackdropClick = () => {
    if (window.innerWidth >= 768) return

    setIsOpen(false)
    allowScroll()
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

  return {
    isOpen,
    handleBackdropClick,
    toggleTheme,
    handleMenuClick,
  }
}
