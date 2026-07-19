const input = document.getElementById("taskInput");

const addBtn = document.getElementById("addBtn");

const list = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){

localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);

}

function render(){

list.innerHTML = "";

tasks.forEach((task,index)=>{

const li=document.createElement("li");

const span=document.createElement("span");

span.innerText=task.text;

span.className="task";

if(task.completed){

span.classList.add("completed");

}

span.onclick=()=>{

tasks[index].completed=!tasks[index].completed;

saveTasks();

render();

};

const del=document.createElement("button");

del.className="delete";

del.innerHTML='<i class="fas fa-trash"></i>';

del.onclick=()=>{

tasks.splice(index,1);

saveTasks();

render();

};

li.appendChild(span);

li.appendChild(del);

list.appendChild(li);

});

}

addBtn.onclick=()=>{

const text=input.value.trim();

if(text==="") return;

tasks.push({

text:text,

completed:false

});

saveTasks();

render();

input.value="";

};

input.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){

addBtn.click();

}

});

render();
