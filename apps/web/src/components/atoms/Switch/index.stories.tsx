import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Switch from './index'

const meta = {
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isOn: false,
    label: '토글입니다.',
  },
}
