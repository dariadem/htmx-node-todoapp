import express from 'express'
import { formatRoute, Command } from './router.utils'
import * as controller from '../controllers/todo-list.controller'

const router = express.Router()

router.get(Command.Index, controller.getIndex)
router.get(Command.All, controller.getTodoList)

router.post(Command.MarkAllAsCompleted, controller.markAllAsCompleted)
router.post(Command.ClearCompleted, controller.clearCompleted)
router.post(Command.ClearAll, controller.clearAll)

router.post(Command.Add, controller.addTodo)
router.post(formatRoute(Command.Update, 'id'), controller.updateTodo)
router.post(
	formatRoute(Command.MarkAsCompleted, 'id'),
	controller.markTodoAsCompleted
)
router.post(
	formatRoute(Command.MarkAsActive, 'id'),
	controller.markTodoAsActive
)
router.delete(formatRoute(Command.Delete, 'id'), controller.deleteTodo)

router.get('/*', (_req, res) => {
	res.status(404).type('txt').send('404 not found')
})

export { router }
