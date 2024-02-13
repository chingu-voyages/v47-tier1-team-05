// Close task creation form, this code was moved to allow the modal to be closed with the 'X'
function closeTaskForm() {
  const modal = document.getElementById("taskModal");
  modal.style.display = "none"; // Hide modal
}
document.addEventListener("DOMContentLoaded", function () {
  
  const createTaskButton = document.getElementById("createTaskButton");
  createTaskButton.addEventListener("click", openTaskForm);

  // Open task creation form as a modal
  function openTaskForm() {
      const modal = document.getElementById("taskModal");
      modal.style.display = "block"; // Show modal
  }


  // New Function to save the task to local storage
function saveTaskToLocalStorage(task) {
  // Retrieve tasks from local storage if any have been made
  let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

  // Check if the category already exists
  let categoryIndex = tasks.findIndex(t => t.categoryName === task.categoryName);
  if (categoryIndex !== -1) {
      // Check if the activity type already exists within the category
      let activityIndex = tasks[categoryIndex].activityTypes.findIndex(a => a.activityName === task.activityTypes[0].activityName);
      if (activityIndex !== -1) {
          // Activity type exists, push the new task
          tasks[categoryIndex].activityTypes[activityIndex].Tasks.push(task.activityTypes[0].Tasks[0]);
      } else {
          // Activity type doesn't exist, add the new activity type with the task
          tasks[categoryIndex].activityTypes.push(task.activityTypes[0]);
      }
  } else {
      // Category doesn't exist, push the whole new task structure
      tasks.push(task);
  }

  // Places the updated tasks array back into local storage
  localStorage.setItem("myTasks", JSON.stringify(tasks));
}

 // Refresh and display tasks
 function refreshTasksDisplay() {
  let myDailyCheckList = JSON.parse(localStorage.getItem("myTasks")) || [];
  let checkList = "";

  myDailyCheckList.forEach(element => {
      checkList += `<div id="category">
                      <div class="categoryName">
                          <div>${element.categoryName}</div>
                          <button class="delete" onclick="eraseData()"><i class="fa-solid fa-trash-can"></i></button>
                      </div>
                  </div>`;
      element.activityTypes.forEach(activityType => {
          checkList += `<div class="activityName">
                          <div>${activityType.activityName}</div>
                          <button class="delete" onclick="eraseData()"><i class="fa-solid fa-trash-can"></i></button>
                      </div>`;
          activityType.Tasks.forEach(task => {
              checkList += `<div class="tasks">
                              <div class="days">${task.days.join(", ")}</div>
                              <div class="taskName">${task.taskName}</div>  
                              <button class="delete" onclick="eraseData()"><i class="fa-solid fa-trash-can"></i></button>
                          </div>`;
          });
      });
  });

  document.getElementById("initial-matrix").innerHTML = checkList;
}

  const taskForm = document.getElementById("taskForm");
  taskForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get form input values
      const categoryName = document.getElementById("categoryName").value;
      const activityName = document.getElementById("activityName").value;
      const taskName = document.getElementById("taskName").value;
      const taskDescription = document.getElementById("taskDescription").value;
      const selectedDays = Array.from(document.querySelectorAll('input[name="days[]"]:checked')).map(day => day.value);

      // Create a new task object based on our chosen JSON structure
      const myTasks = {
          "categoryName": categoryName,
          "activityTypes": [
              {
                  "activityName": activityName,
                  "Tasks": [
                      {
                          "taskName": taskName,
                          "taskDescription": taskDescription,
                          "days": selectedDays
                      }
                  ]
              }
          ]
      };

      // Save the new task to local storage
      saveTaskToLocalStorage(myTasks);

    
      alert("Task created successfully!");

      // Close the form
      closeTaskForm();

      // Clear the form
      taskForm.reset();

      refreshTasksDisplay()
  });
});

  // Search functionality
  const searchInput = document.querySelector('.search-container input[type="text"]');
  searchInput.addEventListener("input", function() {
    const query = this.value.toLowerCase();
    const tasks = JSON.parse(localStorage.getItem("myTasks")) || [];
    const filteredTasks = tasks.reduce((acc, task) => {
        const categoryMatches = task.categoryName.toLowerCase().includes(query);
        const activityTypesMatches = task.activityTypes.filter(activityType => {
            return activityType.activityName.toLowerCase().includes(query) ||
                   activityType.Tasks.some(t => t.taskName.toLowerCase().includes(query));
        });

        if (categoryMatches || activityTypesMatches.length > 0) {
            acc.push({
                ...task,
                activityTypes: activityTypesMatches
            });
        }

        return acc;
    }, []);

    displayFilteredTasks(filteredTasks);
  });

  function displayFilteredTasks(tasks) {
    // Similar logic to refreshTasksDisplay but for filtered tasks
    let checkList = "";

    tasks.forEach(element => {
        checkList += `<div id="category">
                        <div class="categoryName">
                            <div>${element.categoryName}</div>
                            <button class="delete" onclick="eraseData()"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>`;
        element.activityTypes.forEach(activityType => {
            checkList += `<div class="activityName">
                            <div>${activityType.activityName}</div>
                            <button class="delete" onclick="eraseData()"><i class="fa-solid fa-trash-can"></i></button>
                        </div>`;
            activityType.Tasks.forEach(task => {
                checkList += `<div class="tasks">
                                <div class="days">${task.days.join(", ")}</div>
                                <div class="taskName">${task.taskName}</div>  
                                <button class="delete" onclick="eraseData()"><i class="fa-solid fa-trash-can"></i></button>
                            </div>`;
            });
        });
    });

    document.getElementById("initial-matrix").innerHTML = checkList;
  }


// Use this code to console log the stored objects in the local storage array
// const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// tasks.forEach(function(task, index) {
//     console.log(`Task ${index + 1}:`, task);
// });
fetch("./assets/tasks-example.json")
.then(response => response.json())
.then(data => {console.log(data)
localStorage.setItem("myTasks", JSON.stringify(data)) 

})
let myDailyCheckList = JSON.parse(localStorage.getItem("myTasks"))

console.log(myDailyCheckList)
console.log("extra", myDailyCheckList[2].categoryName)
console.log("activities", myDailyCheckList[0].activityTypes.Tasks)

let checkList = "";
myDailyCheckList.forEach((element, index) => {
   checkList += `<div id="category">
                   <div class="categoryName">
                      <div>${element.categoryName}</div>
                      <button class="delete" onclick="eraseData(${index})"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                    </div>`
   console.log(element.activityTypes, "length", element.activityTypes.length )
          for (let j = 0; j < element.activityTypes.length; j++){
             checkList += 
                         `<div class="activityName">
                         <div>${element.activityTypes[j].activityName}</div>
                         <button class="delete" onclick="eraseData(${index}, ${j})"><i class="fa-solid fa-trash-can"></i></button>
                         </div>`
           for(let i = 0; i < element.activityTypes[j].Tasks.length; i++ ){
             checkList += 
                        `<div class="tasks">
                          <div class="day-tasks">
                           <div class="days">${element.activityTypes[j].Tasks[i].days}</div>
                           <div class="taskName">${element.activityTypes[j].Tasks[i].taskName}</div> 
                          </div> 
                           <button class="delete" onclick="eraseData(${index}, ${j}, ${i})"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
           `
       }  
   }
});

document.getElementById("initial-matrix").innerHTML = checkList

// function to delete the selected items
function eraseData(categoryIndex, activityIndex, taskIndex) {
    
    if (taskIndex !== undefined) {
        myDailyCheckList[categoryIndex].activityTypes[activityIndex].Tasks.splice(taskIndex, 1);
    } else if (activityIndex !== undefined) {
        myDailyCheckList[categoryIndex].activityTypes.splice(activityIndex, 1);
    } else {
        myDailyCheckList.splice(categoryIndex, 1);
    }
    localStorage.setItem('myDailyCheckList', JSON.stringify(myDailyCheckList));
    renderChecklist();
}

function renderChecklist(){
    let checkListHTML = "";
    myDailyCheckList.forEach((element, index) => {
        checkListHTML += `<div id="category">
                        <div class="categoryName">
                           <div>${element.categoryName}</div>
                           <button class="delete" onclick="eraseData(${index})"><i class="fa-solid fa-trash-can"></i></button>
                         </div>
                         </div>`
        console.log(element.activityTypes, "length", element.activityTypes.length )
               for (let j = 0; j < element.activityTypes.length; j++){
                checkListHTML += 
                              `<div class="activityName">
                              <div>${element.activityTypes[j].activityName}</div>
                              <button class="delete" onclick="eraseData(${index}, ${j})"><i class="fa-solid fa-trash-can"></i></button>
                              </div>`
                for(let i = 0; i < element.activityTypes[j].Tasks.length; i++ ){
                    checkListHTML += 
                             `<div class="tasks">
                                <div class="days">${element.activityTypes[j].Tasks[i].days}</div>
                                <div class="taskName">${element.activityTypes[j].Tasks[i].taskName}</div>  
                                <button class="delete" onclick="eraseData(${index}, ${j}, ${i})"><i class="fa-solid fa-trash-can"></i></button>
                             </div>`
            }  
        }
     });
     document.getElementById("initial-matrix").innerHTML = checkListHTML;
}



// Calendar Days
const d = new Date();
const year = d.getFullYear();
const month = d.getMonth();
const day = d.getDay();
console.log("d", d)
// const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const weekday = ["Su","M","Tu","W","Th","F","Sa"]
const arrayOfMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let monthName =arrayOfMonths[month]
let dayName = weekday[day]
console.log(dayName,monthName)
const numDaysInMonth = (y,m) => new Date(y, m, 0).getDate();
console.log("numofdays", numDaysInMonth(year, month+1))
let totalNumDays = numDaysInMonth(year, month+1);


let displayDay = []
let calendarDays = "";
let firstDayOfMonth = "";
const dd = new Date(`${monthName} 1, ${year}`)
console.log("pls", dd)
let displayMonth = []
let calendarMonth = '';
for(i = 1; i < (totalNumDays+1); i++){
 displayMonth.push(i);
}
let currentWeek = 0;
displayMonth.forEach(element => {
 let dd = new Date(`${monthName} ${element}, ${year}`)
 let week = `${dd.toString().split('')[0]}${dd.toString().split('')[1]}`;
 
 calendarMonth += 
            `<div class="days-month">
             <div class="numDays">${element}</div>
             <div class="weeks">${week}</div> 
             </div>`
    if(week === 'Su' && i != totalNumDays){
        currentWeek++;
        calendarMonth += `<div class="empty-column">
                        <div class="numDays">Wk</div>    
                        <div class="weeks">${currentWeek}</div>
                          </div>`
                        }
    
})

document.getElementById("days-of-month").innerHTML = calendarMonth;