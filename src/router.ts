import express from 'express'
import path from 'path'
import pug from 'pug'
import { TodoList } from './models/todo-list.model'

const router = express.Router()

const componentPath = path.join(__dirname, 'client', 'views', 'components')

const todoList = new TodoList()

function compileFilterComponent(filter?: string) {
	const compile = pug.compileFile(path.join(componentPath, 'filter.pug'))

	return compile({ filter, count: todoList.count() })
}

router.get('/', (request, response) => {
	response.render('index', { todos: todoList.todos, count: todoList.count() })
})
router.get('/todos', (request, response) => {
	const filter = request.query.filter
	const todos = todoList.filter(filter as string)

	const compile = pug.compileFile(path.join(componentPath, 'todo-list.pug'))
	const markup = compile({ todos }) + compileFilterComponent(filter as string)

	response.send(markup)
})

router.post('/todos/add', (request, response) => {
	const todo = todoList.add(request.body.todoName)
	const compile = pug.compileFile(path.join(componentPath, 'todo-item.pug'))

	let markup = compile({ todo })

	const compileForm = pug.compileFile(
		path.join(componentPath, 'add-form.pug')
	)
	markup += compileForm() + compileFilterComponent()

	response.send(markup)
})

router.post('/todos/clear-completed', (request, response) => {
	const todos = todoList.clearCompleted()
	const compile = pug.compileFile(path.join(componentPath, 'todo-list.pug'))

	const markup = compile({ todos }) + compileFilterComponent()
	response.send(markup)
})

router.post('/todos/clear', (request, response) => {
	const todos = todoList.clear()
	const compile = pug.compileFile(path.join(componentPath, 'todo-list.pug'))

	const markup = compile({ todos }) + compileFilterComponent()
	response.send(markup)
})

router.patch('/todos/mark-as-completed/:id', (request, response) => {
	const todo = todoList.markAsCompleted(request.params.id)
	const compile = pug.compileFile(path.join(componentPath, 'todo-item.pug'))
	const markup = compile({ todo }) + compileFilterComponent()
	response.send(markup)
})
router.patch('/todos/mark-as-uncompleted/:id', (request, response) => {
	const todo = todoList.markAsUncompleted(request.params.id)
	const compile = pug.compileFile(path.join(componentPath, 'todo-item.pug'))
	const markup = compile({ todo }) + compileFilterComponent()
	response.send(markup)
})

router.delete('/todos/:id', (request, response) => {
	todoList.delete(request.params.id)
	const markup = compileFilterComponent()
	response.status(200).send(markup)
})

router.get('/*', (request, response) => {
	response.status(404).type('txt').send('404 not found')
})

export { router }