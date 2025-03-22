'use client'

import { uploadImages } from '@/lib/actions/aws'

export default function Home() {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const formData = new FormData()
    formData.append('file', e.target.files[0])

    uploadImages(formData, 'test', 1).then(console.log)
  }

  return <input type="file" onChange={onChange} />
}
