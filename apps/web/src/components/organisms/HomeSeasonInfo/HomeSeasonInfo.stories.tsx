import type { Meta, StoryObj } from '@storybook/react'

import { HomeSeasonInfoView } from './HomeSeasonInfo.View'
import { MockProvider } from './HomeSeasonInfo.MockProvider'

const meta = {
  component: HomeSeasonInfoView,
  decorators: [
    (Story) => (
      <MockProvider>
        <Story />
      </MockProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof HomeSeasonInfoView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
