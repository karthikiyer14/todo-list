document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
});

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();

    if (todoText === '') return;

    const todoList = document.getElementById('todo-list');
    const todoItem = document.createElement('li');

    todoItem.innerHTML = `
        <span>${todoText}</span>
        <button onclick="removeTodo(this)">Remove</button>
    `;
    todoItem.addEventListener('click', () => {
        todoItem.classList.toggle('completed');
        saveTodos();
    });

    todoList.appendChild(todoItem);
    todoInput.value = '';
    saveTodos();
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
            text: todoItem.querySelector('span').textContent,
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
            <span>${todo.text}</span>
            <button onclick="removeTodo(this)">Remove</button>
        `;
        todoItem.addEventListener('click', () => {
            todoItem.classList.toggle('completed');
            saveTodos();
        });
        todoList.appendChild(todoItem);
    });
}
