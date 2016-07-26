function loadTasks() {
    tasks = localStorage.getItem("tasks");
    
    if (tasks == null || tasks.length == 0) {
        tasks = [];
    } else {
        tasks = JSON.parse(tasks);
    }
    
    return tasks;
}


function printList() {
    var tableDOM = document.querySelector("#todoTable");
    var tbodyDOM = tableDOM.querySelector("tbody");
    
    tbodyDOM.innerHTML = "";
    
    for(var k in tasks) {
        var task = tasks[k];
        
        var tr = document.createElement("tr");
        tr.innerHTML = `<td><input type="checkbox" onClick="handleCheck(this)"></td>   
                        <td>${task.text}</td>
                        `;
        tbodyDOM.appendChild(tr);
    }
}

function addNewTask() {
    var newTask = document.querySelector("#newTask").value;
    document.querySelector("#newTask").value = "";
    tasks.push({text: newTask, status: ""});
    printList();
}

function reset() {
    tasks = [];
    printList();
}

function setColor(color) {
    document.querySelector("#todotable th").style.backgroundColor = color;
    localStorage.color = color;
}

function save() {
    var txt = JSON.stringify(tasks);
    localStorage.tasks = txt;
}

function handleCheck(event) {
    event.parentNode.parentNode.className = "checked";
}