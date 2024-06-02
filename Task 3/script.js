document.addEventListener("DOMContentLoaded", function() {
    const inputbox = document.getElementById("inputbox");
    const listcontainer = document.getElementById("task-container");

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(task => addTaskToDOM(task.text, task.completed));
    }

    function saveTasks() {
        const tasks = [];
        listcontainer.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTaskToDOM(task, completed = false) {
        const li = document.createElement("li");
        li.innerHTML = `
            <label>
                <input type="checkbox" class="check" ${completed ? 'checked' : ''}>
                <span>${task}</span>
            </label>
            <span class="edit-btn">Edit</span>
            <span class="delete-btn">Delete</span>
        `;
        if (completed) {
            li.classList.add("completed");
        }
        listcontainer.appendChild(li);
        attachEventListeners(li);
    }

    function attachEventListeners(li) {
        const checkbox = li.querySelector("input");
        const editbtn = li.querySelector(".edit-btn");
        const deletebtn = li.querySelector(".delete-btn");
        const taskspan = li.querySelector("span");

        checkbox.addEventListener("click", function() {
            li.classList.toggle("completed", checkbox.checked);
            saveTasks();
        });

        editbtn.addEventListener("click", function() {
            const update = prompt("Edit Task: ", taskspan.textContent);
            if (update !== null) {
                taskspan.textContent = update;
                li.classList.remove("completed");
                checkbox.checked = false;
                saveTasks();
            }
        });

        deletebtn.addEventListener("click", function() {
            if (confirm("Are you sure you want to delete this task?")) {
                li.remove();
                saveTasks();
            }
        });
    }

    function addtask() {
        const task = inputbox.value.trim();
        if (!task) {
            alert("Please write down a task.");
            return;
        }
        addTaskToDOM(task);
        inputbox.value = "";
        saveTasks();
    }

    window.addtask = addtask;
    loadTasks();
});
