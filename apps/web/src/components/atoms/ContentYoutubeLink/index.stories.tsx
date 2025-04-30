import type { Meta, StoryObj } from '@storybook/react'
import ContentYoutubeLink from './index'

const meta = {
  component: ContentYoutubeLink,
  tags: ['autodocs'],

  args: {},
} satisfies Meta<typeof ContentYoutubeLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    youtubeUrl: 'https://www.youtube.com',
  },
}
