tasks = [];

printList();

function printList() {
    var listArea = document.querySelector("#todo-list-area");
    listArea.innerHTML = '';
    
    for(var i=0; i < tasks.length; i++) {
        var task = tasks[i];
        
        var tr = document.createElement("tr");
        tr.innerHTML = `<td><input type="checkbox" onChange="btnClicked(this, ${i})"></td>   
                        <td>${task.text}</td>
                        `;
        if (task.done) {
            tr.className = "checked";
            tr.querySelector("input").checked = true;
        }
        
        listArea.appendChild(tr);
    }
}

function addTask() {
    var txt = document.querySelector("#newTask").value;
    document.querySelector("#newTask").value = '';

    var task = { text: txt, done: false };
    tasks.push(task);
    
    printList();
}

function resetTask() {
    tasks = [];
    printList();
}

function btnClicked(event, taskID) {
    tasks[taskID].done = !tasks[taskID].done;
    
    //option 1
    //printList();
    
    //option2
    event.parentNode.parentNode.className = (tasks[taskID].done) ? "checked" : "";
}

function save() {
    
}