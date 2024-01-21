import { TodoItem } from './todo-item.model'

export class TodoList {
	todos: TodoItem[] = [
		new TodoItem('test todo 1'),
		new TodoItem('and salmon'),
	]

	lastAppliedFilter: string

	count() {
		const all = this.todos.length
		const active = this.todos.filter(todo => !todo.completed).length
		const completed = all - active

		return {
			all,
			active,
			completed,
		}
	}

	filter(filter?: string) {
		this.lastAppliedFilter = filter

		if (!filter) return this.todos

		return this.todos.filter(todo =>
			filter === 'active' ? !todo.completed : todo.completed
		)
	}

	markAllAsCompleted() {
		this.todos.forEach(todo => todo.markAsCompleted())
		return this.todos
	}

	clearCompleted() {
		this.todos = this.todos.filter(todo => !todo.completed)
		return this.todos
	}

	clear() {
		this.todos = []
		return this.todos
	}

	add(name: string) {
		const todo = new TodoItem(name)
		this.todos = [todo, ...this.todos]
		return todo
	}

	markAsCompleted(id: string) {
		const todo = this.todos.find(todo => todo.id === id)
		todo?.markAsCompleted()
		return todo
	}

	markAsUncompleted(id: string) {
		const todo = this.todos.find(todo => todo.id === id)
		todo?.markAsUncompleted()
		return todo
	}

	rename(id: string, name: string) {
		const todo = this.todos.find(todo => todo.id === id)
		todo?.rename(name)
		return todo
	}

	delete(id: string) {
		this.todos = this.todos.filter(todo => todo.id !== id)
	}
}
