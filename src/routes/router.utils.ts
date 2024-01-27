export enum Filter {
	Active = 'active',
	Completed = 'completed',
}

export enum Route {
	Index = '/',
	All = '/todos',
	Active = `/todos?filter=${Filter.Active}`,
	Completed = `/todos?filter=${Filter.Completed}`,
	Add = '/todos/add',
	Edit = '/todos/edit/:id',
	CancelEditing = '/todos/cancel-edit/:id',
	Update = '/todos/update/:id',
	MarkAllAsCompleted = '/todos/mark-all-as-completed',
	ClearCompleted = '/todos/clear-completed',
	ClearAll = '/todos/clear-all',
	MarkAsCompleted = '/todos/mark-as-completed/:id',
	MarkAsActive = '/todos/mark-as-uncompleted/:id',
	Delete = '/todos/:id',
}

export enum Command {
	All = '/todos',
	Active = `/todos?filter=${Filter.Active}`,
	Completed = `/todos?filter=${Filter.Completed}`,
	Add = '/todos/add',
	Edit = '/todos/edit/',
	CancelEditing = '/todos/cancel-edit/',
	Update = '/todos/update/',
	MarkAllAsCompleted = '/todos/mark-all-as-completed',
	ClearCompleted = '/todos/clear-completed',
	ClearAll = '/todos/clear-all',
	MarkAsCompleted = '/todos/mark-as-completed/',
	MarkAsActive = '/todos/mark-as-uncompleted/',
	Delete = '/todos/',
}
