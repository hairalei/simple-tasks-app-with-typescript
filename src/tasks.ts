const taskForm = document.querySelector<HTMLFormElement>('.form');
const formInput = document.querySelector<HTMLInputElement>('.form-input');
const taskListElement = document.querySelector<HTMLUListElement>('.list');
const btn = document.querySelector<HTMLButtonElement>('.btn');

type Task = {
  description: string;
  isCompleted: boolean;
};

const tasks: Task[] = [];

taskForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskDescription = formInput?.value;

  if (taskDescription) {
    const task: Task = {
      description: taskDescription,
      isCompleted: false,
    };
    addTask(task);
    formInput.value = '';

    renderTask(task);
    saveToLocalStorage();

    return;
  }

  alert('Please enter a task description');
});

function addTask(task: Task): void {
  tasks.push(task);
}

function renderTask(task: Task): void {
  const taskElement = document.createElement('li');
  taskElement.textContent = task.description;

  const taskCheckbox = document.createElement('input');
  taskCheckbox.type = 'checkbox';
  taskCheckbox.checked = task.isCompleted;

  taskCheckbox.addEventListener('change', () => {
    task.isCompleted = !task.isCompleted;
    saveToLocalStorage();
  });

  taskElement.appendChild(taskCheckbox);
  taskListElement?.appendChild(taskElement);
}

function saveToLocalStorage(): void {
  const data = JSON.stringify(tasks);
  localStorage.setItem('tasks', data);
}

function initialRender(): void {
  const rawData: string | null = localStorage.getItem('tasks');

  if (rawData) {
    const data: Task[] = JSON.parse(rawData);

    data.forEach((task: Task) => {
      addTask(task);
      renderTask(task);
    });
  }
}

initialRender();
