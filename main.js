// 유저가 값을 입력하고 +버튼을 누르면 할 일을 추가할 수 있다
// 각 할 일에 삭제와 체크버튼이 있다
// 삭제버튼을 클릭하면 할 일이 리스트에서 삭제된다
// 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다
// 탭을 이용해 아이템들 싱테별로 나누어서 볼 수 있다
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];

addButton.addEventListener("click",addTask);

function addTask(){ 
    let task = {
        id:randomIDGenerate(),
        taskContent:taskInput.value,
        isComplete:false,

    }
    taskList.push(task);
    // console.log(task);
    render();
}

function render(){
    let resultHtml = ``;
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].isComplete == true){
            resultHtml += `<div class="task task-done"><span>${taskList[i].taskContent}</span>
                <div  class="button-area">
                    <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-arrow-rotate-left"></i></button>
                    <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                </div>
                </div>`;
        }else{resultHtml += `<div class="task"><span>${taskList[i].taskContent}</span>
            <div class="button-area">
                <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check"></i></button>
                <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
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

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}
// console.log(addButton);