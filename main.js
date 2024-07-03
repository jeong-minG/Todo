// 유저가 값을 입력하고 +버튼을 누르면 할 일을 추가할 수 있다
// 각 할 일에 삭제와 체크버튼이 있다
// 삭제버튼을 클릭하면 할 일이 리스트에서 삭제된다
// 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다
// 탭을 이용해 아이템들 싱테별로 나누어서 볼 수 있다
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let filterList = [];
let mode = 'all';

addButton.addEventListener("click",addTask);
taskInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        addTask();
    }
});
taskInput.addEventListener("focus", function() {
    taskInput.value = "";
});

for(let i=1; i<tabs.length;i++){
    tabs[i].addEventListener("click", function(event) {
        filter(event);
    });
}

function addTask(){ 
    let taskValue = taskInput.value;
    let task = {
        id:randomIDGenerate(),
        taskContent:taskInput.value,
        isComplete:false,
    }

    if (taskValue === "") {
        alert("당신의 TO DO를 입력해주세요!"); 
        return;
    }

    taskList.push(task);
    taskInput.value = "";
    render();
}


function render(){
    // 내가 선택한 탭에 따라서 리스트를 달리보여준다
    //all taskList
    //ongoing, done filterList
    let list=[];
    if(mode === "all"){
        list = taskList;
    } else if (mode === "ongoing"){
        list=filterList;
    }else if (mode === "done"){
        list=filterList;
    }
    let resultHtml = ``;
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete == true){
            resultHtml += `<div class="task task-done"><span>${list[i].taskContent}</span>
                <div  class="button-area">
                    <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-left" style="color:#00ffbb;"></i></button>
                    <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                </div>
                </div>`;
        }else{resultHtml += `<div class="task"><span>${list[i].taskContent}</span>
            <div class="button-area">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check" style="color:#0055FF;"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
            </div>`;}
        
    }
    document.getElementById("task-board").innerHTML = resultHtml;
}

function toggleComplete(id){
    console.log("id:",id);
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete= !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function deleteTask(id){
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
          taskList.splice(i, 1);
          break;
        }
}render();
}


function filter(event){
    // console.log("filter",event.target.id);
    mode = event.target.id;
    filterList = [];
    if(mode === "all"){
        //전체 리스트를 보여준다
        render();
    } else if (mode === "ongoing"){
        //진행중인 아이템을 보여준다
        //task.isComplete=false
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete===false){
                filterList.push(taskList[i]);
            }
        }
        render();
    }else if (mode === "done"){
        //완료된 아이템을 보여준다
        //task.isComplete=true
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete===true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}
// console.log(addButton);