import express from 'express'
import mongoose from "mongoose"
import mockTasks from './data/mock.js'
import { DATABASE_URL } from "./env.js"
import Task from './models/task.js'

const app = express()
app.use(express.json())

await mongoose.connect(DATABASE_URL).then(() => console.log('Connected to DB'))

const asyncHandler = (handle) => {
  return async (req, res) => {
    try {
      await handle(req, res)
    } catch (error) {
      console.log(error.message)
      res.status(400).send({message: error.message})
    }
  }
}

// 2번
app.get('/tasks', asyncHandler(async (req, res) => {
	const sort = req.query.sort
  const count = Number(req.query.count) || 0;

  // 2-1. 목록 조회
  // const tasks = await Task.find() // 전체 목록 조회
  
  // 2-2. 목록 조회 + 쿼리 스트링
  const sortOption = {
	  createdAt: sort === 'oldest' ? 'asc' : 'desc'
  }
  
  const tasks = await Task.find().sort(sortOption).limit(count);
  res.send(tasks)
}));

// 1번
app.get('/tasks/:id', asyncHandler(async (req, res) => {
	const id = req.params.id // MongoDB의 id는 문자열
  const task = await Task.findById(id);
  if (task) {
    res.send(task);
  } else {
    res.status(404).send({ message: '해당 id를 찾을 수 없습니다.' });
  }
}));

app.post('/tasks', asyncHandler(async (req, res) => {
  const task = await Task.create(req.body);
  res.send(task);
}));

app.delete('/tasks/:id', asyncHandler((req, res) => {
	const taskId = Number(req.params.id)
	const taskIndex = mockTasks.findIndex((task) => task.id === taskId)
	
	if (taskIndex >= 0) {
		mockTasks.splice(taskIndex, 1)
		res.sendStatus(204)
	} else {
		res.status(404).send(`Cann't find task by given id`)
	}
}));

app.patch('/tasks/:id', asyncHandler(async (req, res) => {
	const taskId = req.params.id
	const task = await Task.findById(taskId)
	
	if (task) {
		Object.keys(req.body).forEach((keyName) => {
			task[keyName] = req.body[keyName]
		})
		await task.save()
		res.send(task)
	} else {
		res.status(404).send(`Cann't find task by given id`)
	}
}));

app.listen(3000, () => console.log(`Server Started!`))