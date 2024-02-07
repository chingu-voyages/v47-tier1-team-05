
fetch("./assets/tasks-example.json")
.then(response => response.json())
.then(data => {console.log(data)
localStorage.setItem("myTasks", JSON.stringify(data)) 

})
let myDailyCheckList = JSON.parse(localStorage.getItem("myTasks"))

console.log(myDailyCheckList)
console.log("extra", myDailyCheckList[2].categoryName)
console.log("activities", myDailyCheckList[0].activityTypes.Tasks)
// adding id
let checklistWithId = myDailyCheckList.map((item, index) => {
   return{
      id: index + 1,
      ...item
   }
});
console.log("id", checklistWithId)
// adding id
let checkList = "";
myDailyCheckList.forEach(element => {
    checkList += `<div id="category">
                    <div class="categoryName">
                       <div>${element.categoryName}</div>
                       <button class="delete" onclick="eraseData()"><i class="fa-solid fa-trash-can"></i></button>
                     </div>
                     </div>`
    console.log(element.activityTypes, "length", element.activityTypes.length )
           for (let j = 0; j < element.activityTypes.length; j++){
              checkList += 
                          `<div class="activityName">
                          <div>${element.activityTypes[j].activityName}</div>
                          <button class="delete" onclick="eraseData()"><i class="fa-solid fa-trash-can"></i></button>
                          </div>`
            for(let i = 0; i < element.activityTypes[j].Tasks.length; i++ ){
              checkList += 
                         `<div class="tasks">
                            <div class="days">${element.activityTypes[j].Tasks[i].days}</div>
                            <div class="taskName">${element.activityTypes[j].Tasks[i].taskName}</div>  
                            <button class="delete" onclick="eraseData()"><i class="fa-solid fa-trash-can"></i></button>
                         </div>
            `
        }
        
    }
});




document.getElementById("initial-matrix").innerHTML = checkList
// const deleteBtn = document.getElementsByClassName("delete");
// for(let i = 0;  i < deleteBtn.length; i++){
//     deleteBtn[i].addEventListener("onclick", eraseData)
// }

function eraseData() {
   console.log("removed") 
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
displayMonth.forEach(element => {
  let dd = new Date(`${monthName} ${element}, ${year}`)
  let week = `${dd.toString().split('')[0]}${dd.toString().split('')[1]}`;
  calendarMonth += 
             `<div class="days-month">
              <div class="numDays">${element}</div>
              <div class="weeks">${week}</div> 
              </div>`
})
console.log(displayMonth)
document.getElementById("days-of-month").innerHTML = calendarMonth;

