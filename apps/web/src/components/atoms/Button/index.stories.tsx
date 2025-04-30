import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import Button from './index'

const meta = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      type: 'string',
      control: 'text',
    },
    border: {
      options: [undefined, 'default', 'strong'],
    },
  },
  args: { onClick: fn(), children: '버튼' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDefaultBorder: Story = {
  args: {
    border: 'default',
  },
}

export const WithStrongBorder: Story = {
  args: {
    border: 'strong',
  },
}
