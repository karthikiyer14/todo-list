document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
});

function addTodo() {
    const todoInput = document.getElementById('todo-input').value.trim();
    const assignedTo = document.getElementById('assigned-to').value.trim();
    const dueDate = document.getElementById('due-date').value;
    const status = document.getElementById('status').value;

    if (todoInput === '' || assignedTo === '' || dueDate === '') return;

    const todoList = document.getElementById('todo-list');
    const todoItem = document.createElement('li');

    todoItem.innerHTML = `
        <span><strong>Task:</strong> ${todoInput}</span>
        <span><strong>Assigned to:</strong> ${assignedTo}</span>
        <span><strong>Due Date:</strong> ${dueDate}</span>
        <span><strong>Status:</strong> ${status}</span>
        <button onclick="removeTodo(this)">Remove</button>
    `;

    todoItem.querySelector('span:last-child').addEventListener('click', () => {
        todoItem.classList.toggle('completed');
        saveTodos();
    });

    todoList.appendChild(todoItem);
    clearInputs();
    saveTodos();
}

function clearInputs() {
    document.getElementById('todo-input').value = '';
    document.getElementById('assigned-to').value = '';
    document.getElementById('due-date').value = '';
    document.getElementById('status').value = 'Pending';
}

function removeTodo(button) {
    const todoItem = button.parentElement;
    todoItem.remove();
    saveTodos();
}

function saveTodos() {
    const todoList = document.getElementById('todo-list');
    const todos = [];
    todoList.querySelectorAll('li').forEach(todoItem => {
        todos.push({
            task: todoItem.children[0].textContent.replace('Task: ', ''),
            assignedTo: todoItem.children[1].textContent.replace('Assigned to: ', ''),
            dueDate: todoItem.children[2].textContent.replace('Due Date: ', ''),
            status: todoItem.children[3].textContent.replace('Status: ', ''),
            completed: todoItem.classList.contains('completed')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoList = document.getElementById('todo-list');
    todos.forEach(todo => {
        const todoItem = document.createElement('li');
        if (todo.completed) todoItem.classList.add('completed');

        todoItem.innerHTML = `
            <span><strong>Task:</strong> ${todo.task}</span>
            <span><strong>Assigned to:</strong> ${todo.assignedTo}</span>
            <span><strong>Due Date:</strong> ${todo.dueDate}</span>
            <span><strong>Status:</strong> ${todo.status}</span>
            <button onclick="removeTodo(this)">Remove</button>
        `;

        todoItem.querySelector('span:last-child').addEventListener('click', () => {
            todoItem.classList.toggle('completed');
            saveTodos();
        });

        todoList.appendChild(todoItem);
    });
}
