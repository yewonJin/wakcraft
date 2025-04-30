import type { Meta, StoryObj } from '@storybook/react'

import MainPageTitle from './index'

const meta = {
  component: MainPageTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MainPageTitle>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { title: '눕프로해커', description: '눕프로해커 페이지입니다.' },
}
