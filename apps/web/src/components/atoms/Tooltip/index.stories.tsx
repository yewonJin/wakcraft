import type { Meta, StoryObj } from '@storybook/react'
import Tooltip from './index'

const meta = {
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    visible: true,
    position: 'top',
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '안녕하세요',
  },
}
