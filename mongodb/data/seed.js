import mongoose from 'mongoose'
import mockData from './mock.js'
import Task from './models/task.js'
import { DATABASE_URL } from './env.js'

await mongoose
  .connect(DATABASE_URL)
  .then(() => console.log('Connected to DB'))

await Task.deleteMany({})
await Task.insertMany(mockData.map((data) => {
	delete data.id
	return data
}))

await mongoose.connection.close()