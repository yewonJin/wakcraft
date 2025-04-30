import { useState } from 'react'

export const useVisibilityOnHover = <T extends string>(keys: T[]) => {
  const [isHovered, setIsHovered] = useState<Record<T, boolean>>(() =>
    keys.reduce(
      (acc, key) => {
        acc[key] = false
        return acc
      },
      {} as Record<T, boolean>,
    ),
  )

  const setHoverTrue = (key: T) => {
    setIsHovered((prev) => ({
      ...prev,
      [key]: true,
    }))
  }

  const setHoverFalse = (key: T) => {
    setIsHovered((prev) => ({
      ...prev,
      [key]: false,
    }))
  }

  return { isHovered, setHoverTrue, setHoverFalse }
}
