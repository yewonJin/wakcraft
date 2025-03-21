import mongoose from 'mongoose'

const connectMongo = async () =>
  mongoose.connect(process.env.DATABASE_URL as string, {
    dbName:
      process.env.NODE_ENV === 'production'
        ? 'wakcraft-test2'
        : 'wakcraft-test2',
  })

export default connectMongo
