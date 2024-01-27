export enum Filter {
	Active = 'active',
	Completed = 'completed',
}

export enum Command {
	Index = '/',
	All = '/todos',
	Active = `/todos?filter=${Filter.Active}`,
	Completed = `/todos?filter=${Filter.Completed}`,
	Add = '/todos/add',
	Edit = '/todos/edit',
	CancelEditing = '/todos/cancel-edit',
	Update = '/todos/update',
	MarkAllAsCompleted = '/todos/mark-all-as-completed',
	ClearCompleted = '/todos/clear-completed',
	ClearAll = '/todos/clear-all',
	MarkAsCompleted = '/todos/mark-as-completed',
	MarkAsActive = '/todos/mark-as-uncompleted',
	Delete = '/todos',
}

export function formatRoute(command: Command, param?: string) {
	return `${command}${param ? `/:${param}` : ''}`
}

export function formatCommand(command: Command, paramValue: string) {
	return `${command}${paramValue ? `/${paramValue}` : ''}`
}
