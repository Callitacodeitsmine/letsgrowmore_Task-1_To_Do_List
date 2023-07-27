// Get DOM elements
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');

// Retrieve tasks from local storage or initialize empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to update the task count
function updateTaskCount() {
    const remaining = tasks.filter(task => !task.completed).length;
    taskCount.textContent = `Tasks Remaining: ${remaining}`;
}

// Function to render the task list
function renderTasks() {
    // Clear existing tasks
    taskList.innerHTML = '';

    // Render each task
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');

        // Create checkbox for task completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            task.completed = !task.completed;
            updateLocalStorage();
            renderTasks();
        });
        taskItem.appendChild(checkbox);

        // Create task text
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.classList.add('task-text');
        if (task.completed) {
            taskText.classList.add('completed');
        }
        taskItem.appendChild(taskText);

        // Create edit button
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

        // Create delete button
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


    // Update task count
    updateTaskCount();
}

// Function to add a new task
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

// Function to update local storage with tasks
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add event listener for add button
addButton.addEventListener('click', addTask);

// Render initial tasks
renderTasks();
