import type { Meta, StoryObj } from '@storybook/react'
import ContentDetail from './index'
import { mockNoobprohacker } from '@/__mock__/noobprohacker'

const meta = {
  component: ContentDetail,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ContentDetail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    category: '눕프로해커',
    isMobile: false,
    content: mockNoobprohacker,
  },
}
