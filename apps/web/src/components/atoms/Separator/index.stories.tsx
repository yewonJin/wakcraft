import type { Meta, StoryObj } from '@storybook/react'
import Separator from './index'

const meta = {
  component: Separator,
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
