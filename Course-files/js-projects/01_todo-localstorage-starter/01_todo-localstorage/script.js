document.addEventListener("DOMContentLoaded", () => {
  const inputFeild = document.getElementById("todo-input");
  const addbtn = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  function refresh() {
    todoList.innerHTML = "";
    tasks.forEach((task) => renderTask(task));
  }
  refresh();

  console.log(tasks);
  addbtn.addEventListener("click", () => {
    const newTaskText = inputFeild.value.trim();
    if (newTaskText === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    };

    tasks.push(newTask);
    saveTasks();

    inputFeild.value = "";
    refresh();
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) {
      li.classList.add("completed");
    }
    li.innerHTML = `
          <span>${task.text}</span>
          <button>Delete</button>
        `;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
      refresh();
    });
    todoList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
