import type { Meta, StoryObj } from '@storybook/react'
import { HomeCarouselView } from './HomeCarousel.View'
import { HomeCarouselProvider } from './HomeCarousel.MockProvider'

const meta = {
  component: HomeCarouselView,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <HomeCarouselProvider>
        <Story />
      </HomeCarouselProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof HomeCarouselView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
