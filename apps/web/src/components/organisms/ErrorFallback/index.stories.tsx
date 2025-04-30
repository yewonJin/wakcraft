import type { Meta, StoryObj } from '@storybook/react'
import ErrorFallback from './index'

const meta = {
  component: ErrorFallback,

  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ErrorFallback>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
