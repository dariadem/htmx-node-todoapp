import path from 'path'

export const prefix = path.join(
	__dirname,
	'..',
	'client',
	'views',
	'components'
)

export enum Component {
	TodoList = 'todo-list.pug',
	TodoItem = 'todo-item/todo-item.pug',
	EditForm = 'todo-item/edit-form.pug',
	Filter = 'filter.pug',
	ListActions = 'list-actions.pug',
	AddForm = 'add-form.pug',
}
