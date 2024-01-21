import express from 'express'
import path from 'path'
import pug from 'pug'
import { TodoList } from './models/todo-list.model'

const router = express.Router()

const componentPath = path.join(__dirname, 'client', 'views', 'components')

const todoList = new TodoList()

function compileCountDependableComponents(
	filter: string = todoList.lastAppliedFilter
) {
	const compileFilter = pug.compileFile(
		path.join(componentPath, 'filter.pug')
	)
	const compileActions = pug.compileFile(
		path.join(componentPath, 'list-actions.pug')
	)

	const count = todoList.count()

	return compileFilter({ filter, count }) + compileActions({ count })
}

router.get('/', (request, response) => {
	response.render('index', { todos: todoList.todos, count: todoList.count() })
})
router.get('/todos', (request, response) => {
	const filter = request.query.filter
	const todos = todoList.filter(filter as string)

	const compile = pug.compileFile(path.join(componentPath, 'todo-list.pug'))
	const markup =
		compile({ todos }) + compileCountDependableComponents(filter as string)

	response.send(markup)
})

router.post('/todos/add', (request, response) => {
	const todo = todoList.add(request.body.todoName)
	const compile = pug.compileFile(path.join(componentPath, 'todo-item.pug'))

	let markup = compile({ todo })

	const compileForm = pug.compileFile(
		path.join(componentPath, 'add-form.pug')
	)
	markup += compileForm() + compileCountDependableComponents()

	response.send(markup)
})

router.get('/todos/edit/:id', (request, response) => {
	const todo = todoList.todos.find(todo => todo.id === request.params.id)

	const compile = pug.compileFile(path.join(componentPath, 'edit-form.pug'))
	const markup = compile({ todo })

	response.send(markup)
})

router.post('/todos/update/:id', (request, response) => {
	const todo = todoList.rename(request.params.id, request.body.todoName)

	const compile = pug.compileFile(path.join(componentPath, 'todo-item.pug'))
	const markup = compile({ todo })

	response.send(markup)
})

router.post('/todos/mark-all-as-completed', (request, response) => {
	const todos = todoList.markAllAsCompleted()
	const compile = pug.compileFile(path.join(componentPath, 'todo-list.pug'))

	const markup = compile({ todos }) + compileCountDependableComponents()
	response.send(markup)
})

router.post('/todos/clear-completed', (request, response) => {
	const todos = todoList.clearCompleted()
	const compile = pug.compileFile(path.join(componentPath, 'todo-list.pug'))

	const markup = compile({ todos }) + compileCountDependableComponents()
	response.send(markup)
})

router.post('/todos/clear', (request, response) => {
	const todos = todoList.clear()
	const compile = pug.compileFile(path.join(componentPath, 'todo-list.pug'))

	const markup = compile({ todos }) + compileCountDependableComponents()
	response.send(markup)
})

router.post('/todos/mark-as-completed/:id', (request, response) => {
	todoList.markAsCompleted(request.params.id)
	const compile = pug.compileFile(path.join(componentPath, 'todo-list.pug'))
	const markup =
		compile({ todos: todoList.filter(todoList.lastAppliedFilter) }) +
		compileCountDependableComponents()
	response.send(markup)
})
router.post('/todos/mark-as-uncompleted/:id', (request, response) => {
	todoList.markAsUncompleted(request.params.id)
	const compile = pug.compileFile(path.join(componentPath, 'todo-list.pug'))
	const markup =
		compile({ todos: todoList.filter(todoList.lastAppliedFilter) }) +
		compileCountDependableComponents()
	response.send(markup)
})

router.delete('/todos/:id', (request, response) => {
	todoList.delete(request.params.id)
	const markup = compileCountDependableComponents()
	response.status(200).send(markup)
})

router.get('/*', (request, response) => {
	response.status(404).type('txt').send('404 not found')
})

export { router }
