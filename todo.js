const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';
let toDos = [];

function saveToDos(){     
  localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

// function filterFn(toDo){
//   return toDo.id === 1;
// }

function deleteToDo(event){
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function paintToDo(text){
  const toDoLi = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "x";
  delBtn.addEventListener("click",deleteToDo);
  span.innerText = text;
  toDoLi.appendChild(span);
  toDoLi.appendChild(delBtn);
  toDoLi.id = newId;
  toDoList.appendChild(toDoLi);
  const toDoObj = {
    text : text,
    id : newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handlesubmit(event){
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

// function someThing(toDo){
//   toDos.push(toDo.text);
// }

function loadToDos(){
  const loadToDos = localStorage.getItem(TODOS_LS);
  if(loadToDos !== null){
    const parsedToDos = JSON.parse(loadToDos);
    parsedToDos.forEach(function(toDo){
      paintToDo(toDo.text);
    });
  } 
}

function init(){
  loadToDos();
  toDoForm.addEventListener("submit",handlesubmit);
}

init();
