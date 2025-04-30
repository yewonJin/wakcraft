import type { Meta, StoryObj } from '@storybook/react'
import ContentGrid from './ContentGrid'
import { mockGridEventNoobProHacker } from '@/__mock__/eventNoobProHacker'

const meta = {
  component: ContentGrid,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ContentGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    content: mockGridEventNoobProHacker,
  },
}
