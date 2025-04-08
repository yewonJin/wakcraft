import { Position } from '@/types/position'

export const positions: { [key in Position]: string } = {
  top: 'top-[2.5%] left-[50%] translate-x-[-50%]',
  'top-right': 'top-[2.5%] right-[1.5%]',
  'top-left': 'top-[2.5%] left-[1.5%]',
  bottom: 'bottom-2 left-[50%] translate-x-[-50%]',
  'bottom-right': 'bottom-[2.5%] right-[1.5%]',
  'bottom-left': 'bottom-[2.5%] left-[1.5%]',
}
