'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

import { ErrorFallback } from '@/components/organisms'

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return <ErrorFallback />
}
