import type { Meta, StoryObj } from '@storybook/react'

import { HomeNoobProHackerView } from './HomeNoobProHacker.View'
import { HomeNoobProHackerProvider } from './HomeNoobProHacker.MockProvider'

const meta = {
  component: HomeNoobProHackerView,
  decorators: [
    (Story) => (
      <HomeNoobProHackerProvider>
        <Story />
      </HomeNoobProHackerProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof HomeNoobProHackerView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
