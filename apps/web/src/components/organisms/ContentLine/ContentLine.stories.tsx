import type { Meta, StoryObj } from '@storybook/react'
import ContentLine from './ContentLine'
import { mockNoobprohacker } from '@/__mock__/noobprohacker'

const meta = {
  component: ContentLine,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-[1300px] pt-6 md:pt-12">
        <Story />
      </div>
    ),
  ],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ContentLine>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isMobile: false,
    content: mockNoobprohacker,
  },
}

export const Mobile: Story = {
  args: {
    isMobile: true,
    content: Default.args.content,
  },
}
