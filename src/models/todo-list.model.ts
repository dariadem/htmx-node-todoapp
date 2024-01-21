import { TodoItem } from './todo-item.model'

export class TodoList {
	todos: TodoItem[] = [
		new TodoItem('test todo 1'),
		new TodoItem('and salmon'),
	]

	appliedFilter: string

	get filteredTodos() {
		if (!this.appliedFilter) return this.todos

		return this.todos.filter(todo =>
			this.appliedFilter === 'active' ? !todo.completed : todo.completed
		)
	}

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
		this.appliedFilter = filter
		return this.filteredTodos
	}

	markAllAsCompleted() {
		this.todos.forEach(todo => todo.markAsCompleted())
		return this.filteredTodos
	}

	clearCompleted() {
		this.todos = this.todos.filter(todo => !todo.completed)
		return this.filteredTodos
	}

	clear() {
		this.todos = []
		return this.filteredTodos
	}

	add(name: string) {
		const todo = new TodoItem(name)
		this.todos = [todo, ...this.todos]
		return todo
	}

	markAsCompleted(id: string) {
		this.todos.find(todo => todo.id === id)?.markAsCompleted()
		return this.filteredTodos
	}

	markAsUncompleted(id: string) {
		this.todos.find(todo => todo.id === id)?.markAsUncompleted()
		return this.filteredTodos
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
