const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function updateTaskCount() {
    const remaining = tasks.filter(task => !task.completed).length;
    taskCount.textContent = `Tasks Remaining: ${remaining}`;
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            task.completed = !task.completed;
            updateLocalStorage();
            renderTasks();
        });
        taskItem.appendChild(checkbox);

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.classList.add('task-text');
        if (task.completed) {
            taskText.classList.add('completed');
        }
        taskItem.appendChild(taskText);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => {
            const editText = prompt('Enter new task text:');
            if (editText !== null) {
                task.text = editText;
                updateLocalStorage();
                renderTasks();
            }
        });

        taskItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            updateLocalStorage();
            renderTasks();
        });
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });

    updateTaskCount();
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const newTask = {
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        updateLocalStorage();
        renderTasks();
        taskInput.value = '';
    }
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addButton.addEventListener('click', addTask);

renderTasks();
