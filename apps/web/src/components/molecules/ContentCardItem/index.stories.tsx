import type { Meta, StoryObj } from '@storybook/react'

import ContentCardItem from './index'
import { getContentUrl } from '@/services/content'
import { mockNoobprohacker } from '@/__mock__/noobprohacker'

const meta = {
  component: ContentCardItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContentCardItem>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      router: {
        basePath: '/',
      },
    },
  },
  args: {
    category: '눕프로해커',
    contentUrl: getContentUrl('눕프로해커', 60),
    lines: mockNoobprohacker.workInfo.map((line) => line.title),
    contentInfo: mockNoobprohacker.contentInfo,
  },
}
