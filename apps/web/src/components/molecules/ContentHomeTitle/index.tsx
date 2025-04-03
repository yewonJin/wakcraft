import { Fragment } from 'react'

type Props = {
  title: string
  description: string
}

export default function ContentHomeTitle({ title, description }: Props) {
  return (
    <Fragment>
      <h1 className="mb-4 text-3xl font-semibold">{title}</h1>
      <h2 className="text-text-subtler mb-6">{description}</h2>
    </Fragment>
  )
}
