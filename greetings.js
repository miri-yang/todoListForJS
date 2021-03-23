const form = document.querySelector(".js-form"),
      input = form.querySelector("input")
      greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";//로컬스토리지에 저장되어있는 currentUser 값
const SHOWING_CN = "showing";
 
function saveName(text){
  localStorage.setItem(USER_LS,text);
}
      
function handlesubmit(event){
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}
      
function askForName(){
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit",handlesubmit);
}      

function paintGreeting(text){
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hi! Nice to meet you ${text}`;
}      
  
function loadName(){
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null){
    askForName();
  } else{
    paintGreeting(currentUser);
  }
}
      
function init(){
  //localStorage.setItem("currentUser","Miri");
  loadName();
}

init();