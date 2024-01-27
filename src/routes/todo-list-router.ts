import express from 'express'
import { Route } from './router.utils'
import * as controller from '../controllers/todo-list.controller'

const router = express.Router()

router.get(Route.Index, controller.getIndex)
router.get(Route.All, controller.getTodoList)

router.get(Route.Edit, controller.editTodo)
router.post(Route.CancelEditing, controller.cancelEditingTodo)

router.post(Route.MarkAllAsCompleted, controller.markAllAsCompleted)
router.post(Route.ClearCompleted, controller.clearCompleted)
router.post(Route.ClearAll, controller.clearAll)

router.post(Route.Add, controller.addTodo)
router.post(Route.Update, controller.updateTodo)
router.post(Route.MarkAsCompleted, controller.markTodoAsCompleted)
router.post(Route.MarkAsActive, controller.markTodoAsActive)
router.delete(Route.Delete, controller.deleteTodo)

router.get('/*', (_req, res) => {
	res.status(404).type('txt').send('404 not found')
})

export { router }
