const addNoteBtn = document.getElementById("addNoteBtn");
const toDoInput = document.getElementById("toDoInput");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("toSearch");

let tasks = [];
let counter = 0;
let searchTerm = "";

addNoteBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const taskName = toDoInput.value.trim();
  if (!taskName) return;
  const task = { id: counter++, name: taskName, done: false, completedAt: null };
  tasks.push(task);
  toDoInput.value = "";
  updateUi();
});

window.addEventListener("DOMContentLoaded", addToLocalStorage);
function addToLocalStorage() {
  const saveTasks = localStorage.getItem("tasks");
  if (saveTasks) {
    tasks = JSON.parse(saveTasks);
    if (tasks.length > 0) {
      const allIds = tasks.map((task) => task.id);
      const highestId = Math.max(...allIds);
      counter = highestId + 1;
    } else {
      counter = 0;
    }
    updateUi();
  }
}

function updateUi() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  taskList.innerHTML = filteredTasks
    .map(
      (task) => `
      <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${
        task.id
      }">
        <span style="text-decoration: ${task.done ? "line-through" : "none"};">
          ${task.name}
        </span>
        <div>
          <button class="btn btn-sm btn-outline-success me-2 toggle-btn">Toggle</button>
          <button class="btn btn-sm btn-outline-danger delete-btn">Delete</button>
        </div>
      </li>`
    )
    .join("");

  deletNote();
  toggleTask();
}

function deletNote() {
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const li = e.target.closest("li");
      const taskId = Number(li.getAttribute("data-id"));
      tasks = tasks.filter((task) => task.id !== taskId);
      updateUi();
    });
  });
}

function toggleTask() {
  document.querySelectorAll(".toggle-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const li = e.target.closest("li");
      const taskId = Number(li.getAttribute("data-id"));
      const task = tasks.find((task) => task.id === taskId);
      if (task) {
        task.done = !task.done;
        updateUi();
      }
    });
  });
}

// search input
searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value;
  updateUi();
});