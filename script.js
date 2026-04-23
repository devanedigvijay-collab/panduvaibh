document.addEventListener('DOMContentLoaded', () => {
    const lists = document.querySelectorAll('.task-list');
    const addBtn = document.getElementById('add-btn');
    const input = document.getElementById('new-task-input');

    // 1. Initial drag setup for existing tasks
    document.querySelectorAll('.task').forEach(attachDragEvents);

    // 2. Column Drag Over logic
    lists.forEach(list => {
        list.addEventListener('dragover', e => {
            e.preventDefault();
            const draggingTask = document.querySelector('.is-dragging');
            list.appendChild(draggingTask);
        });
    });

    // 3. Add Task Functionality
    function createNewTask() {
        const text = input.value.trim();
        if (!text) return;

        const task = document.createElement('div');
        task.className = 'task';
        task.draggable = true;
        task.textContent = text;
        
        attachDragEvents(task);
        document.getElementById('todo-list').appendChild(task);
        input.value = '';
    }

    function attachDragEvents(element) {
        element.addEventListener('dragstart', () => element.classList.add('is-dragging'));
        element.addEventListener('dragend', () => element.classList.remove('is-dragging'));
    }

    addBtn.addEventListener('click', createNewTask);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') createNewTask();
    });
});
