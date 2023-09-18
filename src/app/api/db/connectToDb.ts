import mongoose from 'mongoose'
import 'dotenv/config'

const { DB_USER, DB_PASS, DB_NAME} = process.env

const connect = async () => {
  return await mongoose.connect("mongodb://localhost:27017/", {
    user: DB_USER,
    pass: DB_PASS,
    dbName: DB_NAME
  })
}

export default async function connectToDb() {
  return await connect()
}