import mongoose from 'mongoose'

export const connectMongo = async () =>
  mongoose.connect(process.env.DATABASE_URL as string, {
    dbName: process.env.NODE_ENV === 'production' ? 'wakcraft' : 'wakcraft',
  })
