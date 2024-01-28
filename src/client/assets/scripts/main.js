function handleTodoItemEditing(isEdited, element) {
	if (!isEdited) {
		htmx?.process(element.querySelector('.todo-item-body'))
		return
	}

	htmx?.process(element.querySelector('.edit-todo-form'))

	const input = element.querySelector('.edit-todo-form-input')
	const cursorPosition = input.value.length

	input.focus()
	input.setSelectionRange(cursorPosition, cursorPosition)
}
