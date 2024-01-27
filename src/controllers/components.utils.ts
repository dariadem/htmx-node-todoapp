import path from 'path'

const prefix = path.join(__dirname, '..', 'client', 'views', 'components')

export const components = {
	todoList: path.join(prefix, 'todo-list.pug'),
	todoItem: path.join(prefix, 'todo-item.pug'),
	filter: path.join(prefix, 'filter.pug'),
	listActions: path.join(prefix, 'list-actions.pug'),
	addForm: path.join(prefix, 'add-form.pug'),
	editForm: path.join(prefix, 'edit-form.pug'),
}
