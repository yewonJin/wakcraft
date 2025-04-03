import { Fragment } from 'react'
import { Category } from '@repo/types'

import {
  getContentDetailSubTitle,
  getContentDetailTitle,
} from '@/services/content'

type Props = {
  category: Category
  title: string
  episode: number
}

export default function ContentDetailTitle({
  category,
  title,
  episode,
}: Props) {
  return (
    <Fragment>
      <h2 className="text-text-subtler mb-2 px-4 text-xl xl:px-0">
        {getContentDetailSubTitle(category, episode)}
      </h2>
      <h1 className="mb-6 px-4 text-3xl font-semibold sm:text-4xl xl:px-0">
        {getContentDetailTitle(category, title)}
      </h1>
    </Fragment>
  )
}
