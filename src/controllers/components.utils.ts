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
	TodoItem = 'todo-item.pug',
	Filter = 'filter.pug',
	ListActions = 'list-actions.pug',
	AddForm = 'add-form.pug',
	EditForm = 'edit-form.pug',
}
