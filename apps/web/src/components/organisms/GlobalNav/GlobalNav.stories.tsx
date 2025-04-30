import type { Meta, StoryObj } from '@storybook/react'
import GlobalNav from './GlobalNav'

const meta = {
  component: GlobalNav,

  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof GlobalNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
