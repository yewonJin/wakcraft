import Architect from '@/models/architect'
import connectMongo from '../db'

export const getArchitectIds = async () => {
  'use server'
  await connectMongo()
  const architectIds = await Architect.find(
    {},
    'minecraftId wakzooId _id',
  ).lean()

  return architectIds
}
