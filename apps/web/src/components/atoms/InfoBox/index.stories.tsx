import type { Meta, StoryObj } from '@storybook/react'

import Info from './index'

const meta = {
  component: Info,
  tags: ['autodocs'],
} satisfies Meta<typeof Info>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    position: 'bottom',
    children: '안녕',
  },
}

export const Type1: Story = {
  args: {
    className: 'rounded-md bg-green-700/80 px-2 py-1 text-sm text-neutral-200',
    position: 'bottom',
    children: '조공 컨텐츠',
  },
}
