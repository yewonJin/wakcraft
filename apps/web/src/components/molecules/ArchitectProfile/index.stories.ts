import type { Meta, StoryObj } from '@storybook/react'

import { ArchitectProfile } from '@/components/molecules'

const meta = {
  component: ArchitectProfile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ArchitectProfile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    curTier: '마카게',
    minecraftId: 'canindaeyo',
    wakzooId: '캔인데요',
  },
}

export const HighlightMinecraftId: Story = {
  args: {
    curTier: '마카게',
    minecraftId: 'canindaeyo',
    wakzooId: '캔인데요',
    minecraftIdMatchingIndex: [0, 1, 2, 3],
  },
}

export const HighlightKORId: Story = {
  args: {
    curTier: '마카게',
    minecraftId: 'canindaeyo',
    wakzooId: '캔인데요',
    wakzooIdMatchingIndex: [0, 1],
  },
}
