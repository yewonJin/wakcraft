import type { Meta, StoryObj } from '@storybook/react'
import ArchitectMain from './ArchitectMain'
import { mockArchitects } from '@/__mock__/architect'

const meta = {
  component: ArchitectMain,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ArchitectMain>

export default meta
type Story = StoryObj<typeof meta>

// TODO: 티어 버튼 적용
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
    architects: mockArchitects,
  },
}
