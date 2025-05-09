const addNoteBtn = document.getElementById("addNoteBtn");
const toDoInput = document.getElementById("toDoInput");
const taskList = document.getElementById("taskList");

let tasks = [];
let counter = 0;

addNoteBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const taskName = toDoInput.value.trim();
  if (!taskName) return;
  const task = { id: counter++, name: taskName, done: false };
  tasks.push(task);
  toDoInput.value = "";
  updateUi();
});

function updateUi() {
  console.log("Updating UI with tasks:", tasks); // Add this

  taskList.innerHTML = tasks
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
      const taskId = Number(li.getAttribute("data-_id"));
      tasks = tasks.filter((task) => task.id !== taskId);
      updateUi();
    });
  });
}

function toggleTask() {
  document.querySelectorAll(".toggle-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const li = e.target.closest("li");
      const taskId = Number(li.getAttribute("data-_id"));
      const task = tasks.find((task) => task.id === taskId);
      if (task) {
        task.done = !task.done;
        updateUi();
      }
    });
  });
}
