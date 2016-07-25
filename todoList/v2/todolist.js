

function loadTask() {
    tasks = localStorage.getItem("tasks");
    
    if (tasks == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(tasks);
    }
    
    return tasks;
}

function printTask() {
    localStorage.setItem("tasks",JSON.stringify(tasks));
    
    var tableDOM = document.querySelector("#todoTable");
    var tbodyDOM = tableDOM.querySelector("tbody");
    
    tbodyDOM.innerHTML = "";
    
    for(var k in tasks) {
        var task = tasks[k];
        
        var tr = document.createElement("tr");
        tr.innerHTML = "<td><input type=\"checkbox\"></td>" +
                "<td>" + task.text + "</td>";
        tbodyDOM.appendChild(tr);
    }
}

function addNewTask() {
    var newTask = document.querySelector("#newTask").value;
    tasks.push({text: newTask, status: ""});
    printTask();
}