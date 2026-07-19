const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const filters = document.querySelectorAll(".filter");
const totalTask = document.getElementById("totalTask");
const completedTask = document.getElementById("completedTask");
const emptyState = document.getElementById("emptyState");

let tasks = [];
let currentFilter = "all";

/* ==========================
   Load Tasks
========================== */

window.addEventListener("DOMContentLoaded", () => {
    const storedTasks = localStorage.getItem("leafTasks");

    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }

    renderTasks();
});

/* ==========================
   Add Task
========================== */

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        id: Date.now(),
        text,
        completed: false
    });

    taskInput.value = "";

    saveTasks();
    renderTasks();
}

/* ==========================
   Save
========================== */

function saveTasks() {
    localStorage.setItem("leafTasks", JSON.stringify(tasks));
}

/* ==========================
   Render
========================== */

function renderTasks() {

    taskList.innerHTML = "";

    const searchValue = searchInput.value.toLowerCase();

    let filteredTasks = tasks.filter(task =>
        task.text.toLowerCase().includes(searchValue)
    );

    if (currentFilter === "active") {
        filteredTasks = filteredTasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filteredTasks = filteredTasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.className = task.completed ? "task completed" : "task";

        li.innerHTML = `
            <div class="left">

                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                >

                <span class="task-text">
                    ${task.text}
                </span>

            </div>

            <button class="delete-btn">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        const checkbox = li.querySelector("input");

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        const deleteBtn = li.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", () => {

            tasks = tasks.filter(t => t.id !== task.id);

            saveTasks();

            renderTasks();

        });

        taskList.appendChild(li);

    });

    updateCounter();

    if (filteredTasks.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }
}

/* ==========================
   Search
========================== */

searchInput.addEventListener("input", renderTasks);

/* ==========================
   Filters
========================== */

filters.forEach(button => {

    button.addEventListener("click", () => {

        filters.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();

    });

});

/* ==========================
   Counter
========================== */

function updateCounter() {

    totalTask.textContent = tasks.length;

    completedTask.textContent = tasks.filter(task => task.completed).length;

}
