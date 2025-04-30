import type { Meta, StoryObj } from '@storybook/react'

import { ALL_TIER } from '@repo/constants'
import TierBox from './index'

const meta = {
  component: TierBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tier: {
      description: '건축가의 티어',
      options: ALL_TIER,
    },
  },
} satisfies Meta<typeof TierBox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tier: '마카게',
  },
}
