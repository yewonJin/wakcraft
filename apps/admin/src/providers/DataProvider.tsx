'use client'

import { Fragment, useEffect } from 'react'

import { useArchitectsStore, ArchitectInfo } from '@/store/architectStore'
import { AWS_BASE_URL, AWSDirectory } from '@/lib/aws'
import { fetchS3Images } from '@/lib/actions/aws'
import { useContentStore } from '@/store/contentStore'

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
  const { setCategory, setEpisode, setImageUrls } = useContentStore()

  useEffect(() => {
    setArchitects(architects)

    setCategory(category)
    setEpisode(episode)
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
