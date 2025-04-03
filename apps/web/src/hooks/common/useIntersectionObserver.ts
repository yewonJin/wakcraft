import { useEffect, useRef, useState } from 'react'

export const useIntersectionObserver = <T extends HTMLElement>(
  initialView: boolean,
) => {
  const [isIntersecting, setIsIntersecting] = useState(initialView)
  const observerRef = useRef<T | null>(null)

  useEffect(() => {
    const element = observerRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsIntersecting(true)
        }
      },
      { threshold: 0.01 },
    )

    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return { observerRef, isIntersecting }
}
