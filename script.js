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


    // Function to save the task to local storage
    function saveTaskToLocalStorage(task) {
        // Retrieve tasks from local storage if any have been made
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        // Pushes new task to the retrieved array
        tasks.push(task);

        // Places the updated tasks array back in to local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));
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
        const newTask = {
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
        saveTaskToLocalStorage(newTask);

      
        alert("Task created successfully!");

        // Close the form
        closeTaskForm();

        // Clear the form
        taskForm.reset();
    });
});


// Use this code to console log the stored objects in the local storage array
// const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// tasks.forEach(function(task, index) {
//     console.log(`Task ${index + 1}:`, task);
// });