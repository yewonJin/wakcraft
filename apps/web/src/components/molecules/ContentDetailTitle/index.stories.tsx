import type { Meta, StoryObj } from '@storybook/react'

import ContentDetailTitle from './index'

const meta = {
  component: ContentDetailTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    category: {
      control: 'select',
      options: ['눕프로해커', '예능 눕프핵', '배치고사'],
    },
  },
} satisfies Meta<typeof ContentDetailTitle>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { category: '눕프로해커', episode: 60, title: '자유' },
}

export const Eventnoobprohacker: Story = {
  args: { category: '예능 눕프핵', episode: 60, title: '포켓몬 진화' },
}

export const Placementtest: Story = {
  args: { category: '배치고사', episode: 7, title: '' },
}
