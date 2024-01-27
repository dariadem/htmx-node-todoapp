import pug from 'pug'
import { Request, Response } from 'express'
import { TodoList } from '../models/todo-list.model'
import { Filter, Command, formatCommand } from '../routes/router.utils'
import { components } from './components.utils'

const todoList = new TodoList()

function compile(component: string, data: Record<string, any> = {}) {
	const compileFile = pug.compileFile(component)
	return compileFile({ ...data, Command, Filter, formatCommand })
}

function compileCountDependableComponents(
	filter: string = todoList.appliedFilter
) {
	const count = todoList.count()

	const filterMarkup = compile(components.filter, { filter, count })
	const listActionsMarkup = compile(components.listActions, { count })

	return filterMarkup + listActionsMarkup
}

export function getIndex(_req: Request, res: Response) {
	res.render('index', {
		todos: todoList.todos,
		count: todoList.count(),
		Command,
		Filter,
		formatCommand,
	})
}

export function getTodoList(req: Request, res: Response) {
	const filter = req.query.filter
	const todos = todoList.filter(filter as string)

	const markup =
		compile(components.todoList, { todos }) +
		compileCountDependableComponents(filter as string)

	res.send(markup)
}

export function addTodo(req: Request, res: Response) {
	todoList.add(req.body.todoName)

	const listMarkup = compile(components.todoList, {
		todos: todoList.filteredTodos,
	})
	const addFormMarkup = compile(components.addForm)

	const markup =
		listMarkup + addFormMarkup + compileCountDependableComponents()

	res.send(markup)
}

export function editTodo(req: Request, res: Response) {
	const todo = todoList.todos.find(todo => todo.id === req.params.id)

	const markup = compile(components.editForm, { todo })
	res.send(markup)
}

export function cancelEditingTodo(req: Request, res: Response) {
	const todo = todoList.todos.find(todo => todo.id === req.params.id)

	const markup = compile(components.todoItem, { todo })
	res.send(markup)
}

export function updateTodo(req: Request, res: Response) {
	const todo = todoList.rename(req.params.id, req.body.todoName)

	const markup = compile(components.todoItem, { todo })
	res.send(markup)
}

export function markAllAsCompleted(_req: Request, res: Response) {
	const todos = todoList.markAllAsCompleted()

	const markup =
		compile(components.todoList, { todos }) +
		compileCountDependableComponents()
	res.send(markup)
}

export function clearCompleted(_req: Request, res: Response) {
	const todos = todoList.clearCompleted()

	const markup =
		compile(components.todoList, { todos }) +
		compileCountDependableComponents()
	res.send(markup)
}

export function clearAll(_req: Request, res: Response) {
	const todos = todoList.clear()

	const markup =
		compile(components.todoList, { todos }) +
		compileCountDependableComponents()
	res.send(markup)
}

export function markTodoAsCompleted(req: Request, res: Response) {
	const todos = todoList.markAsCompleted(req.params.id)

	const markup =
		compile(components.todoList, { todos }) +
		compileCountDependableComponents()
	res.send(markup)
}

export function markTodoAsActive(req: Request, res: Response) {
	const todos = todoList.markAsActive(req.params.id)

	const markup =
		compile(components.todoList, { todos }) +
		compileCountDependableComponents()
	res.send(markup)
}

export function deleteTodo(req: Request, res: Response) {
	todoList.delete(req.params.id)
	const markup = compileCountDependableComponents()
	res.status(200).send(markup)
}
