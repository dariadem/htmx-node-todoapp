import { v4 as uuid } from 'uuid'

export class TodoItem {
	id!: string
	completed: boolean = false

	constructor(public name: string) {
		this.id = uuid()
	}

	toggle() {
		this.completed = !this.completed
	}

	markAsCompleted() {
		this.completed = true
	}

	markAsUncompleted() {
		this.completed = false
	}

	rename(name: string) {
		this.name = name
	}
}
