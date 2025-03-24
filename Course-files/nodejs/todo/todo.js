const fs = require("fs"); // reqires file system modules
const filePath = "./tasks.json"; // file path

const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    console.log(JSON.parse(dataJSON));
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const saveTasks = (tasks) => {
  const dataJSON = JSON.stringify(tasks);
  fs.writeFileSync(filePath, dataJSON);
};

const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push({ task });
  saveTasks(tasks);
};

const listTasks = () => {
  const tasks = loadTasks();
  tasks.forEach((task, index) => console.log(`${index + 1} - ${task.task}`));
};

const removeTask = (taskId)=> {
  const tasks = loadTasks()
  const index = taskId - 1

  if (index < 0 || index >= tasks.length) {
    console.log("Invalid task number.");
    return;
  }

  const removedTask = tasks.splice(index, 1)
  saveTasks(tasks);
}

 // command line parameters 
 // "proceess" process the comand with "argv" property return an array after processing the command
const command = process.argv[2]; // process the command
const argument = process.argv[3]; // processes the argument

if (command === "add") {  // Commands or actions 
  addTask(argument);
} else if (command === "list") {
  listTasks();
} else if (command === "remove") {
  removeTask(parseInt(argument));
} else {
  console.log("Command not found !"); 
}
