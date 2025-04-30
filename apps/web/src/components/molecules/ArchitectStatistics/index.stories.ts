import type { Meta, StoryObj } from '@storybook/react'

import { ArchitectStatistics } from '@/components/molecules'

const meta = {
  component: ArchitectStatistics,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ArchitectStatistics>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    statistics: {
      participation: 5,
      proWin: 2,
      hackerWin: 3,
      win: 5,
    },
  },
}
