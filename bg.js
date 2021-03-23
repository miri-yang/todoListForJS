//배경사진은 unsplash api에서 불러오도록 변경할 수 있음
const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(imgNumber){
  const image = new Image();
  image.src = `/images/backImg${imgNumber+1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function genRandom(){
  const number = Math.floor(Math.random() * IMG_NUMBER); 
  return number;
}

function init(){
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();