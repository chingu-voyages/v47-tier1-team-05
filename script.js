// Global variables
const weekday = ["Su", "M", "Tu", "W", "Th", "F", "Sa"];
const arrayOfMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Main application initialization
document.addEventListener("DOMContentLoaded", function () {
  setupEventListeners();
  loadInitialTasks();
  displayCalendar(); 
});

// Sets up event listeners in the application
function setupEventListeners() {
  document
    .getElementById("createTaskButton")
    .addEventListener("click", openTaskForm);
  document
    .getElementById("taskForm")
    .addEventListener("submit", handleFormSubmit);
}

// Opens the task creation modal
function openTaskForm() {
  document.getElementById("taskModal").style.display = "block";
}

// Closes the task creation modal
function closeTaskForm() {
  document.getElementById("taskModal").style.display = "none";
}

// Handles the task form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  const task = createTaskFromForm();

  // Save the new task to local storage and update the display
  saveTaskToLocalStorage(task);
  displayTasks();

  alert("Task created successfully!");

  // Reset and close the form
  document.getElementById("taskForm").reset();
  closeTaskForm();
}

// Creates a task object based on form inputs
function createTaskFromForm() {
  const categoryName = document.getElementById("categoryName").value;
  const activityName = document.getElementById("activityName").value;
  const taskName = document.getElementById("taskName").value;
  const taskDescription = document.getElementById("taskDescription").value;
  const selectedDays = Array.from(
    document.querySelectorAll('input[name="days[]"]:checked')
  ).map((day) => day.value);

  return {
    categoryName,
    activityTypes: [
      {
        activityName,
        Tasks: [
          {
            taskName,
            taskDescription,
            days: selectedDays,
          },
        ],
      },
    ],
  };
}

// Saves a task to local storage
function saveTaskToLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load initial tasks from JSON and display them
function loadInitialTasks() {
  if (!localStorage.getItem("tasks")) {
    fetch("./assets/tasks-example.json")
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("tasks", JSON.stringify(data));
        displayTasks();
      })
      .catch((error) =>
        console.error("Failed to load tasks from JSON:", error)
      );
  } else {
    displayTasks();
  }
}

// Function to display tasks on the page
function displayTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let tasksHtml = "";

  tasks.forEach((task) => {
    tasksHtml += `<div class="task-category">
                        <h3 class="categoryName">${task.categoryName}<button class="delete" onclick="eraseData()"><i class="fa-solid fa-trash-can"></i></button></h3>
                        `;
    task.activityTypes.forEach((activity) => {
      tasksHtml += `<div class="activity-type">
                            <h4 class="activityName">${activity.activityName}<button class="delete" onclick="eraseData()"><i class="fa-solid fa-trash-can"></i></button></h4>
                            `;
      activity.Tasks.forEach((taskDetail) => {
        tasksHtml += `
                                <p class="taskName">${taskDetail.taskName} </p>
                                <div class="task-details" >
                                <p class="task-days">${taskDetail.days.join(
                                  ", "
                                )}</p>
                                <p class="task-description">${
                                  taskDetail.taskDescription
                                } <i class="fa-solid fa-trash-can"></i></p>
                                </div>
                              `;
      });
      tasksHtml += `</div>`;
    });
    tasksHtml += `</div>`;
  });

  document.getElementById("initial-matrix").innerHTML = tasksHtml;
}

// Function to display the calendar
function displayCalendar() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  let totalNumDays = numDaysInMonth(currentYear, currentMonth + 1);
  let calendarMonthHtml = "";

  for (let day = 1; day <= totalNumDays; day++) {
    let date = new Date(currentYear, currentMonth, day);
    let weekdayShortName = weekday[date.getDay()];

    calendarMonthHtml += `<div class="day">
        <div class="week">${weekdayShortName}</div>
                                <div class="numDays">${day}</div>
                              </div>`;
  }

  document.getElementById("days-of-month").innerHTML = calendarMonthHtml;
}

// Function to calculate the number of days in a month
function numDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}
