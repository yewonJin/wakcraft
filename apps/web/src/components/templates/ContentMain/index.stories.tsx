import type { Meta, StoryObj } from '@storybook/react'
import ContentMain from '.'
import { mockNoobprohackers } from '@/__mock__/noobprohacker'

const meta = {
  component: ContentMain,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
      router: {
        basePath: '/',
      },
    },
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof ContentMain>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    category: '눕프로해커',
    description: '눕프로해커 페이지 입니다.',
    contents: mockNoobprohackers,
  },
}
