import path from 'path'
import pug from 'pug'
import { Request, Response } from 'express'
import { TodoList } from '../models/todo-list.model'
import { Filter, Command, formatCommand } from '../routes/router.utils'
import { prefix, Component } from './components.utils'

const todoList = new TodoList()

function compile(component: Component, data: Record<string, any> = {}) {
	const compileFile = pug.compileFile(path.join(prefix, component))
	return compileFile({ ...data, Command, Filter, formatCommand })
}

function compileCountDependableComponents(
	filter: string = todoList.appliedFilter
) {
	const count = todoList.count()

	const filterMarkup = compile(Component.Filter, { filter, count })
	const listActionsMarkup = compile(Component.ListActions, { count })

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
		compile(Component.TodoList, { todos }) +
		compileCountDependableComponents(filter as string)

	res.send(markup)
}

export function addTodo(req: Request, res: Response) {
	todoList.add(req.body.todoName)

	const listMarkup = compile(Component.TodoList, {
		todos: todoList.filteredTodos,
	})
	const addFormMarkup = compile(Component.AddForm)

	const markup =
		listMarkup + addFormMarkup + compileCountDependableComponents()

	res.send(markup)
}

export function editTodo(req: Request, res: Response) {
	const todo = todoList.todos.find(todo => todo.id === req.params.id)

	const markup = compile(Component.EditForm, { todo })
	res.send(markup)
}

export function cancelEditingTodo(req: Request, res: Response) {
	const todo = todoList.todos.find(todo => todo.id === req.params.id)

	const markup = compile(Component.TodoItem, { todo })
	res.send(markup)
}

export function updateTodo(req: Request, res: Response) {
	const todo = todoList.rename(req.params.id, req.body.todoName)

	const markup = compile(Component.TodoItem, { todo })
	res.send(markup)
}

export function markAllAsCompleted(_req: Request, res: Response) {
	const todos = todoList.markAllAsCompleted()

	const markup =
		compile(Component.TodoList, { todos }) +
		compileCountDependableComponents()
	res.send(markup)
}

export function clearCompleted(_req: Request, res: Response) {
	const todos = todoList.clearCompleted()

	const markup =
		compile(Component.TodoList, { todos }) +
		compileCountDependableComponents()
	res.send(markup)
}

export function clearAll(_req: Request, res: Response) {
	const todos = todoList.clear()

	const markup =
		compile(Component.TodoList, { todos }) +
		compileCountDependableComponents()
	res.send(markup)
}

export function markTodoAsCompleted(req: Request, res: Response) {
	const todos = todoList.markAsCompleted(req.params.id)

	const markup =
		compile(Component.TodoList, { todos }) +
		compileCountDependableComponents()
	res.send(markup)
}

export function markTodoAsActive(req: Request, res: Response) {
	const todos = todoList.markAsActive(req.params.id)

	const markup =
		compile(Component.TodoList, { todos }) +
		compileCountDependableComponents()
	res.send(markup)
}

export function deleteTodo(req: Request, res: Response) {
	todoList.delete(req.params.id)
	const markup = compileCountDependableComponents()
	res.status(200).send(markup)
}
