import { TodoItem } from './todo-item.model'

export class TodoList {
	todos: TodoItem[] = [
		new TodoItem('test todo 1'),
		new TodoItem('and salmon'),
	]

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
		if (!filter) return this.todos

		return this.todos.filter(todo =>
			filter === 'active' ? !todo.completed : todo.completed
		)
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

	delete(id: string) {
		this.todos = this.todos.filter(todo => todo.id !== id)
	}
}
