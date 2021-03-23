const weather = document.querySelector('.js-weather');

const API_KEY = "f9ad37e760830570edfb9f244a99d5c7";//openWeather API KEY
const COORDS = 'coords';

function getWeather(lat,lng){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function(response){
     return response.json();
  }).then(function(json){
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature} @ ${place}`;
  });
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,//latitude : latitude,
    longitude//longtitude : longtitude
  };
  saveCoords(coordsObj);
  getWeather(latitude,longitude);
}

function handleGeoError(){
  console.log('Can not access Geo location');  
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  }else{
    const parseCoords = JSON.parse(loadedCoords);
    // console.log(parseCoords);
    getWeather(parseCoords.latitude,parseCoords.longitude);
  }
}

function init(){
  loadCoords();  
}
init();