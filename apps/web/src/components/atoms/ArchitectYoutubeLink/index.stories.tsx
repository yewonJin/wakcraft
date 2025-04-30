import type { Meta, StoryObj } from '@storybook/react'
import ArchitectYoutubeLink from './index'

const meta = {
  component: ArchitectYoutubeLink,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="relative aspect-video w-60 bg-neutral-800">{Story()}</div>
    ),
  ],
  args: {},
} satisfies Meta<typeof ArchitectYoutubeLink>

export default meta
type Story = StoryObj<typeof meta>

export const Hovered: Story = {
  args: {
    isHovered: true,
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    type: 'single',
    youtubeUrl: 'https://www.youtube.com',
  },
}

export const NotHovered: Story = {
  args: {
    isHovered: false,
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    type: 'single',
    youtubeUrl: 'https://www.youtube.com',
  },
}
