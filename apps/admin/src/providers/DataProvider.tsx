'use client'

import { Fragment, useEffect } from 'react'

import { useArchitectsStore, ArchitectInfo } from '@/store/architectStore'
import { useModalStore } from '@/store/modalStore'
import { AWS_BASE_URL, AWSDirectory } from '@/lib/aws'
import { fetchS3Images } from '@/lib/actions/aws'

type Props = {
  architects: ArchitectInfo[]
  category: AWSDirectory
  episode: number
  children: React.ReactNode
}

export default function DataProvider({
  architects,
  category,
  episode,
  children,
}: Props) {
  const { setArchitects } = useArchitectsStore()
  const { setImageUrls } = useModalStore()

  useEffect(() => {
    setArchitects(architects)
    fetchS3Images(category, episode).then((res) =>
      setImageUrls(
        res.Contents?.filter(
          (content) => content.Key?.split('.').at(-1) === 'png',
        )?.map((content) => AWS_BASE_URL + content.Key) as string[],
      ),
    )
  }, [])

  return <Fragment>{children}</Fragment>
}
